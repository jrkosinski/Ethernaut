const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;
const Runner = require("./lib/runner");

Runner.run(async () => {
    const contractAddr = "0x0F0962b59d11F1047caCADffa2FFC014a62ED93B";     
    
    //get engine address from storage slot 
    let engineAddr = await provider.getStorageAt(contractAddr, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"); 
    engineAddr = "0x" + engineAddr.substr(26); 
    console.log(`engine address is ${engineAddr}`);
    
    //retrieve engine contract 
    const engine = await ethers.getContractAt("Engine", engineAddr); 
    console.log(`engine horsePower: ${await engine.horsePower()}`); 
    console.log(`engine upgrader: ${await engine.upgrader()}`); 
});