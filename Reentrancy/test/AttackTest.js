const { expect } = require("chai");
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;
const testUtils = require("./utils");

describe("Reentrancy Attack", function () {		  
	let victim, attacker;		//contracts
	let owner, addr1, addr2;	//accounts
    const donationAmt = 502;
    const attackerAmt = 500;
	
	beforeEach(async function () {
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        
        //contracts
		victim = await testUtils.deployContract("Reentrancy");
		attacker = await testUtils.deployContract("Attacker");
			
		//donate an amount from any other address
		await victim.donate(addr1.address, {value:donationAmt});
	});
	      
	describe("Attack", function () {
		it("reentrancy attack begin", async function () {
			//make sure that the total amount in contract is what's expected 
			expect(parseInt(await provider.getBalance(victim.address))).to.be.equal(donationAmt);
			
			//attacker donates a seed amount just to have a legit balance in the contract
			//  (the seed amount is the amount that you can withdraw on each iteration of 
			//  the attack )
			await victim.donate(attacker.address, {value:attackerAmt});
			
			//attacker begin attack 
			await attacker.startDrain(victim.address, attackerAmt); 
			
			//balance in contract should be zero
			expect(parseInt(await attacker.getVictimBalance())).to.be.equal(0);
		});
	});
});