const utils = require("./lib/utils");

module.exports = {
    deploy: async() => {
        return await utils.deployContract("Attacker"); 
    }
};