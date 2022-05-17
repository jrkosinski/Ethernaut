const { expect } = require("chai");
const { ethers } = require("hardhat");
const testUtils = require("./utils");

describe("Ethernaut Reentrancy", function () {		  
	let contract;				//contracts
	let owner, addr1, addr2;	//accounts
	
	beforeEach(async function () {
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        
        //contract
		contract = await testUtils.deployContract("Reentrancy");
	});
	      
	describe("Initial state", function () {
		it("initial balances", async function () {
			//all accounts should have 0 balance 
			expect(await contract.balanceOf(owner.address)).to.equal(0);
			expect(await contract.balanceOf(addr1.address)).to.equal(0);
			expect(await contract.balanceOf(addr2.address)).to.equal(0);
		});
    });    
	      
	describe("Donations", function () {
		it("can donate", async function () {
			const amount1 = 11;
			const amount2 = 22;
			
			//donate 
			await contract.donate(addr1.address, {value:amount1});
			await contract.donate(addr2.address, {value:amount2});
			
			//check balances after donate 
			expect(await contract.balanceOf(addr1.address)).to.equal(amount1);
			expect(await contract.balanceOf(addr2.address)).to.equal(amount2);
		});
		
		it("can donate multiple times", async function () {
			const amount1 = 11;
			const amount2 = 22;
			
			//donate 
			await contract.donate(addr1.address, {value:amount1});
			await contract.donate(addr1.address, {value:amount2});
			
			//check balances after donate 
			expect(await contract.balanceOf(addr1.address)).to.equal(amount1 + amount2);
		});
    });    
	      
	describe("Withdrawals", function () {
		it("can withdraw", async function () {
			const amount = 11;
			
			//donate 
			await contract.donate(owner.address, {value:amount});
			
			//check balance after donate 
			expect(await contract.balanceOf(owner.address)).to.equal(amount);
			
			//withdraw
			await contract.withdraw(amount);
			
			//check balance after withdraw
			expect(await contract.balanceOf(owner.address)).to.equal(0);
		});
		
		it("cannot withdraw more than donation", async function () {
			const amount = 11;
			
			//donate 
			await contract.donate(owner.address, {value:amount});
			
			//check balance after donate 
			expect(await contract.balanceOf(owner.address)).to.equal(amount);
			
			//withdraw
			await contract.withdraw(amount+1);
			
			//balance should be unchanged 
			expect(await contract.balanceOf(owner.address)).to.equal(amount);
		});
    }); 
});