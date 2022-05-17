const { ethers } = require("hardhat");

module.exports = {
  deployContract: async(artifactId, args) => {
    const Contract = await ethers.getContractFactory(artifactId);
    
    if (args)
      return await Contract.deploy(args);
    else
      return await Contract.deploy();
  }
}