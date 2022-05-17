const Runner = require('./lib/runner');

module.exports = {
    deploy: async() => {
        return await Runner.deployContract("Building");
    }
};