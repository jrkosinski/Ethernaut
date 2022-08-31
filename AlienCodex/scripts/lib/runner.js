const { ethers, waffle } = require("hardhat");

/**
 * Passes in to main the following parameters: 
 * provider
 * owner 
 * addr1
 * addr2
 * If more addresses are needed, they can be gotten manually from ethers.getSigners() in the 
 * main function itself.  
 */
doRun = async (main) => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await main(waffle.provider, owner, addr1, addr2);
}

module.exports = {
    run: (main) => {
        doRun(main)
            .then(() => process.exit(0))
            .catch((error) => {
            console.error(error);
            process.exit(1);
        });
    }
}