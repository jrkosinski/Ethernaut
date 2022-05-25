const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const utils = require("../scripts/lib/utils");

const provider = waffle.provider;

describe("Ethernaut Force", function () {		  
	let contract, destructible;	//contracts
	let owner;					//accounts
	
	beforeEach(async function () {
		[owner, ...addrs] = await ethers.getSigners();
        
        //contract
		contract = await utils.deployContractSilent("Force");
		destructible = await utils.deployContractSilent("Destructible");
	});
	      
	describe("Initial State", function () {
		
		//all balances should be 0 
		it("contract balances", async function () {
			expect(await provider.getBalance(contract.address)).to.equal(0);
			expect(await provider.getBalance(destructible.address)).to.equal(0);
		});
		
		//the contract refuses to accept payments 
		it("can't send ether to contract", async function () {
			await expect(owner.sendTransaction({
				to: contract.address,
				value: '1'
			})).to.be.reverted;
		});
    });    
	      
	describe("Send Ether to Contract", function () {
		
		//this one sends ether to an existing contract, then self-destructs it into the target
		it("using self-destruct", async function () {
			await owner.sendTransaction({
				to: destructible.address,
				value: '0x01'
			}); 
			
			await (destructible.destroy(contract.address)); 
			expect(await provider.getBalance(contract.address)).to.equal(1);
		});
		
		//this one pre-sends ether to the contract before it's created 
		it("using address prediction", async function () {
			
			//create the factory 
			const factory = await utils.deployContractSilent("ForceFactory"); 
			
			//predict the address of the next created contract  
			const predictedAddr = "0x" + (ethers.utils.solidityKeccak256(
				["bytes1", "bytes1", "address", "bytes1"],
				["0xd6", "0x94", factory.address, 1]  
			)).substring(26);
			
			//send ether to predicted address 
			await owner.sendTransaction({
				to: predictedAddr,
				value: '0x01'
			}); 
			
			//spawn new contract 
			await factory.spawnContract(); 
			
			//newly spawned contract should already have ether 
			expect(predictedAddr.toLowerCase()).to.equal((await factory.contractAddress()).toLowerCase());
			expect(await provider.getBalance(factory.contractAddress())).to.equal(1); 
		});
    });    
});