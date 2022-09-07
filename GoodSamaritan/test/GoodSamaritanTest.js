const { expect } = require("chai");
const { ethers } = require("hardhat");
const { initial } = require("lodash");
const utils = require("../scripts/lib/utils");

const provider = ethers.provider;

describe("Ethernaut Good Samaritan", function () {
    let contract, coin, wallet; //contracts
    let owner, addr1, addr2;    //accounts 
    const initialBalance = 1000000;
	
	beforeEach(async function () {
		[owner, addr1, addr2,...addrs] = await ethers.getSigners();
        
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
            expect(await coin.balances(wallet.address)).to.equal(initialBalance);
        });
	});
    
    describe("Coin", function () {
        let _coin; 
        
        beforeEach(async function () {
            _coin = await utils.deployContractSilent("Coin", owner.address); 
        });

        it("initial state", async function () {
            expect(await _coin.balances(owner.address)).to.equal(initialBalance); 
        });
        
        it("simple transfer", async function () {
            const amount = 5000; 
            await _coin.transfer(addr1.address, amount);
            expect(await _coin.balances(owner.address)).to.equal(initialBalance - amount);
            expect(await _coin.balances(addr1.address)).to.equal(amount);
        });

        it("transfer over balance", async function () {
            const amount = 5000;
            await _coin.transfer(addr1.address, amount);
            
            //transfer more than balance 
            await expect(
                _coin.connect(addr1).transfer(addr2.address, amount +1)
            ).to.be.revertedWith(`InsufficientBalance(${amount}, ${amount+1})`); 
        });
    });

    describe("Wallet", function () {
        let _coin;

        beforeEach(async function () {
            _wallet = await utils.deployContractSilent("Wallet"); 
            _coin = await utils.deployContractSilent("Coin", _wallet.address);
            _wallet.setCoin(_coin.address);
        });
        
        it("initial state", async function () {
            expect(await _coin.balances(_wallet.address)).to.equal(initialBalance);
            expect(await _wallet.owner()).to.equal(owner.address);
            expect(await _wallet.coin()).to.equal(_coin.address);
        });

        it("transfer remaining", async function () {
            await _wallet.transferRemainder(addr1.address);
            expect(await _coin.balances(addr1.address)).to.equal(initialBalance);
            expect(await _coin.balances(_wallet.address)).to.equal(0);
        });

        it("non-owner cannot call donate10", async function () {
            await expect(
                _wallet.connect(addr1).donate10(addr1.address)
            ).to.be.revertedWith("OnlyOwner()"); 
        });

        it("owner can call donate10", async function () {
            await _wallet.donate10(addr1.address);
            expect(await _coin.balances(addr1.address)).to.equal(10);
            expect(await _coin.balances(_wallet.address)).to.equal(initialBalance - 10);
        });
    });

    describe("GoodSamaritan", function () {
        it("out of money", async function () {
            await contract.connect(addr1).requestDonation(); 
        });
    });

    describe("Attack", function () {
        it("error attack", async function () {
            const transferDest = await utils.deployContractSilent("ErrorAttack"); 
            
            await transferDest.attack(contract.address);
            
            expect(await coin.balances(wallet.address)).to.equal(0); 
        });
        
        it.skip("reentrancy attack", async function () {
            const transferDest = await utils.deployContractSilent("ReentrancyAttack");

            while (true) {
                await transferDest.attack(contract.address, { gasLimit:30000000});
                const bal = await coin.balances(wallet.address); 
                if (bal == 0) 
                    break;
            }
            //const tx = await transferDest.attack(
            //    contract.address, [], {
            //    gasLimit: 100000,
            //    nonce: nonce || undefined,
            //});

            expect(await coin.balances(wallet.address)).to.equal(0); 
        }); 
    });
});