const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut Shop", function () {		  
	let shop, buyer;			//contracts
	
	beforeEach(async function () {
        //contracts
		shop = await utils.deployContractSilent("Shop");
		buyer = await utils.deployContractSilent("TestBuyer");
	});
	      
	describe("Buying", function () {
		it("cannot buy if price too low", async function () {
			//attempt to buy for askPrice - 1
			const askPrice = await shop.price(); 
			const bidPrice = 99;
			await buyer.buy(shop.address, bidPrice);
			
			//shop should not have sold anything 
			expect(await shop.isSold()).to.be.equal(false);
			expect(await shop.price()).to.be.equal(askPrice);
		});
		
		it("can buy if price is right", async function () {
			//buy for exactly asking price 
			const bidPrice = 100;
			await buyer.buy(shop.address, bidPrice);
			
			//shop should be now sold out
			expect(await shop.isSold()).to.be.equal(true);
			expect(await shop.price()).to.be.equal(bidPrice);
		});
		
		it("can buy if price is higher", async function () {
			//buy for 1 above asking price 
			const bidPrice = 101;
			await buyer.buy(shop.address, bidPrice);
			
			//shop should be now sold out
			expect(await shop.isSold()).to.be.equal(true);
			expect(await shop.price()).to.be.equal(bidPrice);
		});
    });    
	
	describe("Attack", function () {
		it("can get price down to zero", async function () {
			
			//expect initial price to be 100
			expect(await shop.price()).to.be.equal(100);
			
			//deploy attack 
			attacker = await utils.deployContractSilent("Attacker");
			await attacker.buy(shop.address);
			
			//shop should be now sold out at price 0
			expect(await shop.isSold()).to.be.equal(true);
			expect(await shop.price()).to.be.equal(0);
		});
	});
});
