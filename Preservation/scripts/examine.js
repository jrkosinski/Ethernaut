const { ethers, waffle } = require("hardhat");
const Runner = require('./lib/runner');
const Deployer = require('./deployer');
const provider = waffle.provider;

/**
 * Just a quick utility to have a look at what's in storage. 
 */
Runner.run(async (owner) => { 
    
    const contractAddr = "0xDC0C662aD9Ad7B1d8a536417A6E42D6D91E89848"; 
    const impostorAddr = "0x18998aef5D7B3c0b86C3e3436C8370eA6331C99C";
    
    const contract = await ethers.getContractAt("Preservation", contractAddr);
    
    const impostor = await ethers.getContractAt("ImpostorLibrary", impostorAddr);
    console.log(`impostor: ${impostor.address}`);
    
    console.log();
    console.log(`owner is: ${await contract.owner()}`);
    console.log(`storage 0: ${await provider.getStorageAt(contractAddr, 0)}`);
    console.log(`storage 1: ${await provider.getStorageAt(contractAddr, 1)}`);
    console.log(`storage 2: ${await provider.getStorageAt(contractAddr, 2)}`);
    console.log(`storage 3: ${await provider.getStorageAt(contractAddr, 3)}`);
    console.log(`timezone1lib: ${await contract.timeZone1Library()}`);
    
});
