const { ethers } = require("hardhat");

module.exports = {
    deployContract: async(artifactId, arg) => {
      
      const Contract = await ethers.getContractFactory(artifactId);
      if (arg) 
        return await Contract.deploy(arg);
      return await Contract.deploy();
    }
}