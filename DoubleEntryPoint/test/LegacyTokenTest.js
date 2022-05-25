const { expect } = require("chai");
const { ethers } = require("hardhat");
const testUtils = require("./utils");

describe("Ethernaut DoubleEntryPoint", function () {		  
	let legacyToken;				//contracts
	let owner;					//accounts
	
	beforeEach(async function () {
		[owner, ...addrs] = await ethers.getSigners();
        
        //contracts
		legacyToken = await testUtils.deployContract("LegacyToken");
	});
});