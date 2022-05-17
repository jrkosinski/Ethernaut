const { ethers } = require("hardhat");

module.exports = {
    deployContract: async(artifactId) => {
      const Contract = await ethers.getContractFactory(artifactId);
      return await Contract.deploy();
    }
}