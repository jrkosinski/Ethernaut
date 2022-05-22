const { expect } = require("chai");
const { ethers } = require("hardhat");
const testUtils = require("./utils");

describe("Ethernaut Token", function () {		  
	let token;					//contracts
	let owner, addr1, addr2;	//accounts
	const initialSupply = 10000000;
	
	beforeEach(async function () {
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        
        //contract
		token = await testUtils.deployContract("Token", initialSupply);
		
		//transfer 20 tokens to addr1
		await token.transfer(addr1.address, 20); 
	});
	      
	describe("Initial State", function () {
		it("token balances", async function () {
			expect(await token.totalSupply()).to.equal(initialSupply); 
			expect(await token.balanceOf(addr1.address)).to.equal(20);
			expect(await token.balanceOf(owner.address)).to.equal(initialSupply - 20);
		});
    });    
	
	describe("Transfer", function() {
		it ("can transfer amount less than balance", async function() {
			await token.connect(addr1).transfer(addr2.address, 5); 
			
			//balances of sender and recipient are as expected 
			expect(await token.balanceOf(addr1.address)).to.equal(15);
			expect(await token.balanceOf(addr2.address)).to.equal(5);
		}); 
		
		//underflow 
		it ("can transfer more than balance", async function() {
			
			//addr1 transfer to addr2 more tokens than addr1 has 
			const balanceBefore = await token.balanceOf(addr1.address); 
			await token.connect(addr1).transfer(addr2.address, 21); 
			
			//addr1 ends up with more tokens after transferring
			expect(await token.balanceOf(addr1.address)).to.equal(ethers.constants.MaxUint256);
			
			//addr2 still ends up with tokens 
			expect(await token.balanceOf(addr2.address)).to.equal(21); 
		});
	});
});