const { ethers } = require("hardhat");
const Runner = require("./lib/runner");


Runner.run(async () => {
	
    //PLACE DOUBLEENTRYPOINT CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x75b106d15AC497C4bC5A134E4F4b98488043e92a";     
    
    const det = await ethers.getContractAt("DoubleEntryPoint", contractAddr);
    const vault = await ethers.getContractAt("CryptoVault", await det.cryptoVault());
    
    //if all is good, then this call should revert with message 
    // "Alert has been triggered, reverting"
    await vault.sweepToken(await det.delegatedFrom()); 
    
    console.log("* * * ");
    console.log("* * * ");
});
