const { ethers, waffle } = require("hardhat");
const Runner = require("./lib/runner");

const provider = waffle.provider;

Runner.run(async (player) => {
	
    const contractAddr = "0x75b106d15AC497C4bC5A134E4F4b98488043e92a";     
    
    const det = await ethers.getContractAt("DoubleEntryPoint", contractAddr);
    const cryptoVault = await ethers.getContractAt("CryptoVault", await det.cryptoVault());
    const legacyToken = await ethers.getContractAt("LegacyToken", await det.delegatedFrom());
    const forta = await ethers.getContractAt("Forta", await det.forta());
    
    console.log();
    console.log(`DoubleEntryPoint.delegatedFrom: ${await det.delegatedFrom()}`);
    console.log(`DoubleEntryPoint.player: ${await det.player()}`);
    console.log(`DoubleEntryPoint.forta: ${await det.forta()}`);
    console.log(`DoubleEntryPoint.cryptoVault.sweptTokensRecipient: ${await cryptoVault.sweptTokensRecipient()}`);
    console.log(`DoubleEntryPoint.cryptoVault.underlying: ${await cryptoVault.underlying()}`);
    console.log(`LegacyToken.delegate: ${await legacyToken.delegate()}`);
    console.log(`LGT.totalSupply: ${await legacyToken.totalSupply()}`);
    console.log(`DET.totalSupply: ${await det.totalSupply()}`);
    console.log(`My balance of LGT: ${await legacyToken.balanceOf(player.address)}`);
    console.log(`My balance of DET: ${await det.balanceOf(player.address)}`);
    console.log(`CryptoVault's balance of LGT: ${await legacyToken.balanceOf(cryptoVault.address)}`);
    console.log(`CryptoVault's balance of DET: ${await det.balanceOf(cryptoVault.address)}`);
    console.log(`forta.detectionBot for player: ${await forta.usersDetectionBots(player.address)}`);
    
    console.log("* * * ");
    
    //DET is delegatedFrom LGT
    //LGT's delegate is DET 
    //Player is DET's CryptoVault's sweptTokenRecipient 
    //The underlying of DET's CryptoVault is DET 
});
