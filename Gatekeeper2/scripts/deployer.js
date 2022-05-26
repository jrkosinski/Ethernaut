const utils = require("./lib/utils");

module.exports = {
    deploy: async(address) => {
        return await utils.deployContract("Attacker", address);
    }
};