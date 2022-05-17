const Deployer = require('./deployer');
const Runner = require('./lib/runner');


Runner.run(async () => {
    await Deployer.deploy();
});

