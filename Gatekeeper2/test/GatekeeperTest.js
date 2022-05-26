const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut GatekeeperTwo", function () {		  
	let gateKeeper, gateTester;		//contracts
	
	beforeEach(async function () {
        //contracts
		gateKeeper = await utils.deployContractSilent("GatekeeperTwo");
		gateTester = await utils.deployContractSilent("GateTester");
	});
	
	describe("Initial State", function () {
		it("initial entrant value", async function () {
			//entrant values should be not set 
            expect(parseInt(await (gateKeeper.entrant()))).to.equal(0);
            expect(parseInt(await (gateTester.entrant()))).to.equal(0);
		});
	});
	    
	describe("Test Gates", function () {
		it("test gate1", async function () {
			//constructor should pass gate 1 
			const gateTestClient = await utils.deployContractSilent("GateTesterClient", [gateTester.address, true, false]);
			expect(await gateTestClient.passed()).to.equal(true);
		});
		
		it("test gate2", async function () {
			//constructor should pass gate 2 
			const gateTestClient = await utils.deployContractSilent("GateTesterClient", [gateTester.address, false, true]);
			expect(await gateTestClient.passed()).to.equal(true);
		});
		
		it("test gate3", async function () {
			//create test client with no constructor activity 
			const gateTestClient = await utils.deployContractSilent("GateTesterClient", ['0x0000000000000000000000000000000000000000', false, false]);			
			
			//initially passed == false
			expect(await gateTestClient.passed()).to.equal(false);
			
			//test gate 3 & verify 
			await gateTestClient.testGateThree(gateTester.address);
			expect(await gateTestClient.passed()).to.equal(true);
		});
    });    
	      
	describe("Break All 3 Gates", function () {
		it("set entrant", async function () {
			const attacker = await utils.deployContractSilent("Attacker", gateKeeper.address);
			
			//entrant should be set to a value 
            expect(parseInt(await (gateKeeper.entrant()))).to.not.equal(0);
		});
    });    
});