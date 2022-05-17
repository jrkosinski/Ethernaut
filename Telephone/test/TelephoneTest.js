const { expect } = require("chai");
const { ethers } = require("hardhat");
const testUtils = require("./utils");

describe("Telephone contract", function () {		  
	let telephone, attacker;	//contracts
	let owner, addr1;			//accounts
	
	beforeEach(async function () {
		[owner, addr1, ...addrs] = await ethers.getSigners();
        
        //contract
		telephone = await testUtils.deployContract("Telephone");
		attacker = await testUtils.deployContract("Attacker");
	});
	
	describe("Initial State", function () {
		it("initial owner", async function () {
            expect(await (telephone.owner())).to.equal(owner.address);
		});
    }); 
	
	describe("ChangeOwner method is protected", function () {
		it("can't change owner with direct call", async function () {
			await telephone.connect(addr1).changeOwner(addr1.address); 
			
			//expect that owner is not changed 
           	expect(await (telephone.owner())).to.equal(owner.address);
		});
		
		it("can change owner with one indirect call", async function () {
			await attacker.connect(addr1).changeOwner(telephone.address, addr1.address); 
			
			//expect that owner is changed 
            expect(await (telephone.owner())).to.equal(addr1.address);
		});
    }); 
});