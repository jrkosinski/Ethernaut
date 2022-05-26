const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut Recovery", function () {		  
	let contract;				//contracts
	let owner;					//accounts
	
	beforeEach(async function () {
		[owner, ...addrs] = await ethers.getSigners();
        
        //contract
		contract = await utils.deployContractSilent("Recovery");
		
		//generate three tokens 
		await contract.generateToken("token1", 10000000000);
		await contract.generateToken("token2", 10000000000);
		await contract.generateToken("token3", 10000000000);
	});
	      
	describe("Generate Addresses", function () {
		it("generate token 1 address", async function () {
			//token 1 should be at 0
			await verifyTokenName(0, "token1");
		});
		
		it("generate token 2 address", async function () {
			//token 2 should be at 1
			await verifyTokenName(1, "token2");
		});
		
		it("generate token 3 address", async function () {
			//token 3 should be at 2
			await verifyTokenName(2, "token3");
		});
    });    
	
	/**
	 * Predicts the next created contract address given the parameters. Then attempts to 
	 * locate a SimpleToken contract at that address, and verify its storage name. 
	 * @param {number} txCount number of transactions so far 
	 * @param {string} expectedName name of expected contract at address 
	 */
	async function verifyTokenName(txCount, expectedName) {
		//generate address and get token contract 
		const addr = utils.predictContractAddress(contract.address, txCount); 
		const token = await ethers.getContractAt("SimpleToken", addr); 
		
		//verify name 
		const name = await token.name(); 
		expect(name).to.equal(expectedName); 
	}
});