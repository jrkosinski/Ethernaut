const { ethers } = require("hardhat");

module.exports = {
    deployContract: async(artifactId, args) => {
        const Contract = await ethers.getContractFactory(artifactId);
        if (args) {
            if (args.length) {
                if (args.length == 1)
                    return await Contract.deploy(args[0]);
                else if (args.length == 2)
                    return await Contract.deploy(args[0], args[1]);
            }
            return await Contract.deploy(args);
        }
        return await Contract.deploy();
    }
}