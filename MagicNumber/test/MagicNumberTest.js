const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const utils = require("../scripts/lib/utils");

const provider = waffle.provider;

describe("Ethernaut MagicNumber", function () {		  
	let contract;				//contracts
	let owner;					//accounts
	
	beforeEach(async function () {
		[owner, ...addrs] = await ethers.getSigners();
        
        //deploy contract
		contract = await utils.deployContractSilent("MagicNumberSolver");
	});
	      
	describe("Get Magic Number", function () {
		it("call a method", async function () {
			//answer is correct: 42
            expect(parseInt(await provider.call({to:contract.address, data:utils.encodeFunctionSignature("whatIsTheMeaningOfLife")}))).to.be.equal(42);
		});
		
		it("call any method", async function () {
			//all calls return the same thing
            expect(parseInt(await provider.call({to:contract.address, data:utils.encodeFunctionSignature("meaningOfLife")}))).to.be.equal(42);
			expect(parseInt(await provider.call({to:contract.address, data:utils.encodeFunctionSignature("getCode")}))).to.be.equal(42);
			expect(parseInt(await provider.call({to:contract.address, data:utils.encodeFunctionSignature("harambe")}))).to.be.equal(42);
		});
    });    
});