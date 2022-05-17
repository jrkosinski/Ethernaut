const { expect } = require("chai");
const { ethers } = require("hardhat");
const testUtils = require("./utils");

describe("Ethernaut Motorbike", function () {		  
	let Motorbike, engine, nonInitializable;	//contracts
	let owner, addr1; 							//accounts
	
	//TODO: more unit tests with engine + attack 
	beforeEach(async function () {
		[owner, addr1,...addrs] = await ethers.getSigners();
        
        //contract
		Motorbike = await ethers.getContractFactory("Motorbike");
		engine = await testUtils.deployContract("AttackEngine");
		nonInitializable = await testUtils.deployContract("NonInitializable");
	});
	
	describe("Test Constructor", function () {
		it("Logic address must be contract", async function () {
            await expect(Motorbike.deploy(addr1.address)).to.be.revertedWith("ERC1967: new implementation is not a contract");
            await expect(Motorbike.deploy(engine.address)).to.not.be.reverted;
		});
        
		it("Logic address must be initializable contract", async function () {
            await expect(Motorbike.deploy(nonInitializable.address)).to.be.revertedWith("Call failed");
			await expect(Motorbike.deploy(engine.address)).to.not.be.reverted;
		});
    });    
});