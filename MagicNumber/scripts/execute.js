const { ethers } = require("hardhat");
const Runner = require("./lib/runner");
const utils = require("../scripts/lib/utils");

Runner.run(async (provider) => {
    
    //PLACE THE MAGICNUMBER CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x740915A1F4e0c5fe63A2D63B8c5471406357BCAA";
    
    //deploy solver 
    const solver = await utils.deployContract("MagicNumberSolver"); 
    
    //set solver 
    const magicNumber = await ethers.getContractAt("MagicNumber", contractAddr);
    await magicNumber.setSolver(solver.address);
    
    //call solver methods 
    console.log();
    console.log("* * * ");
    console.log("what is the meaning of life? ... ");
    console.log(`... ${parseInt(await provider.call({to:solver.address, data:utils.encodeFunctionSignature("whatIsTheMeaningOfLife")}))}`);
    console.log("* * * ");
});

