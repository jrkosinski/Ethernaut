const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const Deployer = require("./deployer");


Runner.run(async () => {
    
    //PLACE GatekeeperTwo CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x9d9356d48ea54276c53486Bc3ed49d7bC497A31e";     
    
    //get contracts 
    const contract = await ethers.getContractAt("GatekeeperTwo", contractAddr);
    const attacker = await Deployer.deploy(contract.address);
    
    console.log();
    console.log("* * * ");
    const passed = await attacker.passed(); 
    console.log(`PASSED: ${passed ? 'true' : 'false'}`)
    console.log("* * * ");
});
