const Runner = require("./lib/runner");
const Deployer = require("./deployer");

Runner.run(async () => {
    await Deployer.deploy(); 
});

