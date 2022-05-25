const { ethers } = require("hardhat");

module.exports = {
    deployContract: async(artifactId, args) => {
      const Contract = await ethers.getContractFactory(artifactId);
      
      if (args) {
        if (args.length) {
          if (args.length == 2)
            return Contract.deploy(args[0], args[1]);
          else if (args.length == 3)
            return Contract.deploy(args[0], args[1], args[2]);
          else if (args.length == 4)
            return Contract.deploy(args[0], args[1], args[2], args[3]);
        }
        return Contract.deploy(args);
      }
      return await Contract.deploy();
    }
}