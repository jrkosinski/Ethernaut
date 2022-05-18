const { ethers } = require("hardhat");

module.exports = (addr, txCount) => {
	return "0x" + (ethers.utils.solidityKeccak256(
		["bytes1", "bytes1", "address", "bytes1"],
		["0xd6", "0x94", addr, txCount]  
	)).substring(26);
};