const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const testUtils = require("./utils");
const generateAddress = require("../scripts/generateAddress");

const provider = waffle.provider;

describe("Ethernaut Recovery", function () {		  
	let contract;				//contracts
	let owner;					//accounts
	
	beforeEach(async function () {
		[owner, ...addrs] = await ethers.getSigners();
        
        //contract
		contract = await testUtils.deployContract("Recovery");
		
		//generate three tokens 
		await contract.generateToken("token1", 10000000000);
		await contract.generateToken("token2", 10000000000);
		await contract.generateToken("token3", 10000000000);
	});
	
	async function verifyTokenName(nonce, expectedName) {
		//generate address and get token contract 
		const addr = generateAddress(contract.address, nonce); 
		const token = await ethers.getContractAt("SimpleToken", addr); 
		
		//verify name 
		const name = await token.name(); 
		expect(name).to.equal(expectedName); 
	}
	      
	describe("Generate Addresses", function () {
		it("generate token 1 address", async function () {
			await verifyTokenName(1, "token1");
		});
		
		it("generate token 2 address", async function () {
			await verifyTokenName(2, "token2");
		});
		
		it("generate token 3 address", async function () {
			await verifyTokenName(3, "token3");
		});
    });    
});