const { ethers, waffle } = require("hardhat");
const Runner = require("./lib/runner");
const Deployer = require("./deployer"); 

const provider = waffle.provider;

Runner.run(async (owner) => {
    const contractAddr = "0x3e4211498d070a5ea9A7aF0608Aca193328Ee2C5";
    
    //deploy destructible contract 
    const destructible = await Deployer.deploy(); 
    
    console.log();
    console.log("* * * ");
    console.log(`contract balance is ${await provider.getBalance(contractAddr)}`);
    
    //send ether 
    console.log("sending ether...");
    await owner.sendTransaction({
        to: destructible.address,
        value: "0x01", 
        gasLimit: 100000
    });
    
    //destroy
    console.log("destroying...");
    await destructible.destroy(contractAddr);
    
    console.log(`contract balance is ${await provider.getBalance(contractAddr)}`);
    console.log("* * * ");
});
