const { ethers } = require("hardhat");

module.exports = {
    deployContract: async(artifactId, args) => {
      const Contract = await ethers.getContractFactory(artifactId);
      return await Contract.deploy(args);
    }
}