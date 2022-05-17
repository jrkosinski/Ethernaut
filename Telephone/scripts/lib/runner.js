const { ethers } = require("hardhat");

doRun = async (main) => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await main(owner, addr1, addr2);
}

module.exports = {
    run: (main) => {
        doRun(main)
            .then(() => process.exit(0))
            .catch((error) => {
            console.error(error);
            process.exit(1);
        });
    }, 
    
    deployContract: async(artifactId) => {
        const [deployer] = await ethers.getSigners();
        console.log("Deploying contracts with the account:", deployer.address);  
        console.log("Account balance:", (await deployer.getBalance()).toString());
        
        const Contract = await ethers.getContractFactory(artifactId);
        const contract = await Contract.deploy();
      
        console.log("Contract address:", contract.address);
        return contract;
    }
}