const { expect } = require("chai");
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;
const testUtils = require("./utils");

describe("Privacy contract", function () {		  
	let contract;
	const value0 = "value0";
	const value1 = "value1";
	const value2 = "value2";
	
	beforeEach(async function () {
        //contracts
		contract = await testUtils.deployContract("Privacy", [
			ethers.utils.formatBytes32String(value0), 
			ethers.utils.formatBytes32String(value1), 
			ethers.utils.formatBytes32String(value2), 
		]);
	});
	      
	describe("Test storage values", function () {
		it("boolean value", async function () {
			//this is the very first storage slot, and it is not packed 
			expect(parseInt(await provider.getStorageAt(contract.address, 0))).to.be.equal(1);
		});
		
		it("packed values", async function () {
			//these are the literal uint8 values 10 and 255 in 3rd memory slot 
			expect((await provider.getStorageAt(contract.address, 2)).toString().substring(62)).to.be.equal("ff0a");
		});
		
		it("string array", async function () {
			//array elements 0, 1, 2
			expect(ethers.utils.parseBytes32String(await provider.getStorageAt(contract.address, 3))).to.be.equal(value0);
			expect(ethers.utils.parseBytes32String(await provider.getStorageAt(contract.address, 4))).to.be.equal(value1);
			expect(ethers.utils.parseBytes32String(await provider.getStorageAt(contract.address, 5))).to.be.equal(value2);
		});
    });    
	      
	describe("Unlock", function () {
		it("find and use password", async function () {
			//contract should be locked 
			expect(await contract.locked()).to.equal(true);
			
			//get password and unlock
			const passwd = await provider.getStorageAt(contract.address, 5);
			
			//we want to take only 16 bytes
			await contract.unlock(passwd.substring(0, 34));

			//contract should be unlocked 
			expect(await contract.locked()).to.equal(false);
		});
    });    
});
