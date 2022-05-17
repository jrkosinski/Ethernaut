const { ethers } = require("ethers");
const Runner = require("./lib/runner");

module.exports = {
    deploy: async(address) => {
        return await Runner.deployContract("Attacker", address);
    }
}