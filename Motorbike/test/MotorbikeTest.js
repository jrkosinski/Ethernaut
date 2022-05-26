const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut Motorbike", function () {		  
	let Motorbike, engine, nonInitializable;	//contracts
	let owner, addr1; 							//accounts
	
	//TODO: more unit tests with engine + attack 
	beforeEach(async function () {
		[owner, addr1,...addrs] = await ethers.getSigners();
        
        //contract
		Motorbike = await ethers.getContractFactory("Motorbike");
		engine = await utils.deployContractSilent("AttackEngine");
		nonInitializable = await utils.deployContractSilent("NonInitializable");
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