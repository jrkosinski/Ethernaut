const Runner = require('./lib/runner');
const Deployer = require('./deployer');

Runner.run(async () => {
    const attacker = await Deployer.deploy();     
});

