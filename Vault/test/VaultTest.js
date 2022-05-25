const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const utils = require("../scripts/lib/utils");

const provider = waffle.provider;

describe("Ethernaut Vault", function () {		  
	let contract;				//contracts
	let owner;					//accounts
	const password = "0xwololololololololololo32"; 
	
	beforeEach(async function () {
		[owner, ...addrs] = await ethers.getSigners();
        
        //deploy contract
		contract = await utils.deployContractSilent(
			"Vault", 
			ethers.utils.formatBytes32String(password)
		);
	});
	      
	describe("Initial State", function () {
		it("slot 0", async function () {
			//should be locked initially
			expect(await contract.locked()).to.equal(true);
		});
    });   
	      
	describe("Values in Storage Slots", function () {
		it("slot 0", async function () {
			//slot 0 contains boolean 
			expect(parseInt(await provider.getStorageAt(contract.address, 0))).to.equal(1);
		});
		
		it("slot 1", async function () {
			//slot 1 contains the password 
			expect(ethers.utils.parseBytes32String(await provider.getStorageAt(contract.address, 1))).to.equal(password);
		});
    });    
	      
	describe("Can Unlock", function () {
		it("slot 0", async function () {
			//get password 
			const passwd = await provider.getStorageAt(contract.address, 1); 
			
			//unlock
			await contract.unlock(passwd);
			
			//should be unlocked 
			expect(await contract.locked()).to.equal(false);
		});
    });   
});