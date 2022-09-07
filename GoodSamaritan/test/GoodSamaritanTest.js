const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

const provider = ethers.provider;

describe("Ethernaut Good Samaritan", function () {
    let contract, coin, wallet; //contracts
	let owner, addr1, addr2;    //accounts 
	
	beforeEach(async function () {
		[owner, addr1,...addrs] = await ethers.getSigners();
        
        //contract
        contract = await utils.deployContractSilent("GoodSamaritan");
        wallet = await ethers.getContractAt("Wallet", await contract.wallet());
        coin = await ethers.getContractAt("Coin", await wallet.coin());
        
	});
	
	describe("Initial State", function() {
        it("ownership", async function () {
            expect(await wallet.owner()).to.equal(contract.address); 
        });

        it("balances", async function () {
            expect(await coin.balances(wallet.address)).to.equal("1000000");
        });
	});
    
    describe("Coin", function () {
        it("simple transfer", async function () {
        });
    });

    describe("GoodSamaritan", function () {
        it("out of money", async function () {
            await contract.connect(addr1).requestDonation(); 
            console.log(await coin.balances(wallet.address));
        });
    });

    describe.only("Attack", function () {
        it("error attack", async function () {
            console.log(await coin.balances(wallet.address));
            const transferDest = await utils.deployContractSilent("TransferDest"); 
            
            await transferDest.attack(contract.address);
            console.log(await coin.balances(wallet.address));
            
            expect(await coin.balances(wallet.address)).to.equal(0); 
        });
    });
});