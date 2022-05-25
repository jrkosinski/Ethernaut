const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut Elevator", function () {
	let elevator, building;				//contracts
	
	beforeEach(async function () {
        //contracts
		elevator = await utils.deployContractSilent("Elevator");
		building = await utils.deployContractSilent("Building");
	});   

	//TODO: make this pass? 
	/*describe("Building", function () {
		it("isLastFloor returns false, then true", async function () {
			//console.log(await building.isLastFloor(1));
			expect(await building.isLastFloor(1)).to.be.equal(false);
		});
    });    */
	      
	describe("Elevator", function () {
		it("can go to top floor", async function () {
			await building.goToTop(elevator.address); 
			expect(await elevator.top()).to.be.equal(true);
		});
    });    
});
