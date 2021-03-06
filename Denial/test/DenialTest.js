const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const utils = require("../scripts/lib/utils");

const provider = waffle.provider;

describe("Ethernaut Denial", function () {		  
	let contract, attacker;		//contracts
	let owner, addr1, addr2;	//accounts
	
	beforeEach(async function () {
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        
        //deploy contracts
		contract = await utils.deployContractSilent("Denial");
		attacker = await utils.deployContractSilent("Attacker");
	});
	      
	describe("Initial State", function () {
		it("owner", async function () {
			//contract owner should be owner 
			expect(await contract.owner()).to.be.equal(owner.address);
		});
		
		it("partner", async function () {
			//contract partner not set 
			expect(await contract.partner()).to.be.equal("0x0000000000000000000000000000000000000000");
		});
		
		it("balances", async function () {
			//balances should be zero 
			expect(await provider.getBalance(contract.address)).to.be.equal(0);
			expect(await provider.getBalance(attacker.address)).to.be.equal(0);
		});
    });    
	      
	describe("Can Set Properties", function () {
		it("set partner", async function () {
			await contract.setWithdrawPartner(addr1.address);
			expect(await contract.partner()).to.be.equal(addr1.address);
		});
    });  
	      
	describe("Deposit and Withdraw", function () {
		it("deposit funds", async function () {
			//send 100 wei to receive() function 
			await addr1.sendTransaction({
				to: contract.address,
				value: 100
			});
			//balance is updated 
			expect(await provider.getBalance(contract.address)).to.be.equal(100);
		});
		
		it("withdraw funds", async function () {
			//set partner 
			await contract.setWithdrawPartner(addr1.address);
			
			//fund the contract 
			await addr1.sendTransaction({
				to: contract.address,
				value: 100
			});
			
			const bal1Before = await getBalanceLast3(addr1.address);
			const bal2Before = await getBalanceLast3(owner.address);
			
			//withdraw
			await contract.connect(addr2).withdraw();
			const bal1After = await getBalanceLast3(addr1.address);
			const bal2After = await getBalanceLast3(owner.address);
			
			//balances of each contract (owner & partner) should have each gained +1
			expect(bal1After-bal1Before).to.equal(1);
			expect(bal2After-bal2Before).to.equal(1);
		});
    });  
	
	describe("Attack", function () {
		it("attack", async function () {
			//fund the contract
			await addr1.sendTransaction({
				to: contract.address,
				value: 100000
			});
			
			//set attacker as partner
			await contract.setWithdrawPartner(attacker.address);
			
			const contractBal1 = parseInt((await provider.getBalance(contract.address)).toString());
			const attackerBal1 = parseInt((await provider.getBalance(attacker.address)).toString());
			
			//attempt to withdraw
			await contract.withdraw();
			
			const contractBal2 = parseInt((await provider.getBalance(contract.address)).toString());
			const attackerBal2 = parseInt((await provider.getBalance(attacker.address)).toString());
			
			//contract should have lost funds, while attacker should have gained
			expect(attackerBal2).to.be.greaterThan(attackerBal1);
			expect(contractBal2).to.be.lessThan(contractBal1);
		});
	});
	
	/**
	 * Gets least significant 3 digits of the wei balance of the given address. 
	 * @param {string} addr 
	 * @returns {number} 
	 */
	async function getBalanceLast3(addr) {
		let value = (await provider.getBalance(addr)).toString();
		return parseInt(value.substring(value.length-3, value.length));
	}
});