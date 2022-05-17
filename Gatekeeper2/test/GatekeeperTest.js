const { expect } = require("chai");
const { ethers } = require("hardhat");
const testUtils = require("./utils");

describe("GatekeeperTwo contract", function () {		  
	let gateKeeper, gateTester;		//contracts
	
	beforeEach(async function () {
        //contracts
		gateKeeper = await testUtils.deployContract("GatekeeperTwo");
		gateTester = await testUtils.deployContract("GateTester");
	});
	
	describe("Initial State", function () {
		it("initial entrant value", async function () {
			//entrant values should be not set (null addresses 0x000...)
            expect(parseInt(await (gateKeeper.entrant()))).to.equal(0);
            expect(parseInt(await (gateTester.entrant()))).to.equal(0);
		});
	});
	    
	describe("Test Gates", function () {
		it("test gate1", async function () {
			//constructor should pass gate 1 
			const gateTestClient = await testUtils.deployContract("GateTesterClient", [gateTester.address, true, false]);
			expect(await gateTestClient.passed()).to.equal(true);
		});
		
		it("test gate2", async function () {
			//constructor should pass gate 2 
			const gateTestClient = await testUtils.deployContract("GateTesterClient", [gateTester.address, false, true]);
			expect(await gateTestClient.passed()).to.equal(true);
		});
		
		it("test gate3", async function () {
			//create test client with no constructor activity 
			const gateTestClient = await testUtils.deployContract("GateTesterClient", ['0x0000000000000000000000000000000000000000', false, false]);			
			
			//initially passed == false
			expect(await gateTestClient.passed()).to.equal(false);
			
			//test gate 3 & verify 
			await gateTestClient.testGateThree(gateTester.address);
			expect(await gateTestClient.passed()).to.equal(true);
		});
    });    
	      
	describe("Break All 3 Gates", function () {
		it("set entrant", async function () {
			await expect(testUtils.deployContract("Attacker", gateKeeper.address)).to.be.not.reverted;
            expect(parseInt(await (gateKeeper.entrant()))).to.not.equal(0);
		});
    });    
});