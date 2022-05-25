const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const Deployer = require("./deployer");


Runner.run(async () => {
	
    //PLACE DOUBLEENTRYPOINT CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x75b106d15AC497C4bC5A134E4F4b98488043e92a";     
    
    //get the relevant contracts 
    const det = await ethers.getContractAt("DoubleEntryPoint", contractAddr);
    const bot = await Deployer.deploy();
    const forta = await ethers.getContractAt("Forta", await det.forta());
    
    //set detection bot 
    console.log();
    console.log("* * * ");
    console.log('setting detection bot...')
    await forta.setDetectionBot(bot.address); 
    console.log("... done"); 
    console.log("* * * ");
});
