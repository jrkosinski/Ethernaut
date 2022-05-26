const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut NaughtCoin", function () {		  
	let token;					//contracts
	let owner, addr1;			//accounts
	const initialBalance = "1000000000000000000000000";
	
	beforeEach(async function () {
		[owner, addr1, ...addrs] = await ethers.getSigners();
		
        //contracts
		token = await utils.deployContractSilent("NaughtCoin", owner.address);
	});
	      
	describe("Initial state", function () {
		it("boolean value", async function () {
			expect(await token.balanceOf(owner.address)).to.be.equal(initialBalance); 
			expect(await token.balanceOf(addr1.address)).to.be.equal(0); 
		});		
    });    
	      
	describe("Transfer tokens", function () {
		it("normal transfer fails", async function () {
			//transfer fails when contract is locked
			await expect(token.transfer(addr1.address, 1)).to.be.revertedWith("contract is locked");
		});
		
		it ("approve and transfer", async function () {
			const initialBalance = await token.balanceOf(owner.address);
			
			//approve & transfer 
			await token.approve(addr1.address, initialBalance); 
			await token.connect(addr1).transferFrom(owner.address, addr1.address, initialBalance); 
			
			//verify that all of owner's tokens have been transferred to addr1
			expect(await token.balanceOf(addr1.address)).to.be.equal(initialBalance); 
			expect(await token.balanceOf(owner.address)).to.be.equal(0); 
		});
    });
});