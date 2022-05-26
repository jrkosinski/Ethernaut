const { ethers } = require("hardhat");

/**
 * General utility functions for testing, deploying, etc. 
 */
class Utils {
    /**
     * Deploys the specified contract to the connected network. 
     * 
     * @param {string} artifactId name of the contract
     * @param {*} args contract args (optional). A single value if only one parameter is needed 
     * for construction; an array if more than one. 
     * @param {bool} silent (optional, false by default) if true, no output about the deployed contract
     * will be written to the console. 
     * @returns an ethers contract instance
     */
    async deployContract(artifactId, args, silent) {
        const [deployer] = await ethers.getSigners();
        
        if (!silent) {
            console.log("Deploying contracts with the account:", deployer.address);  
            console.log("Account balance:", (await deployer.getBalance()).toString());
        }
        
        const abi = await ethers.getContractFactory(artifactId);
        let contract; 
        
        if (args) {
            if (args.length) {
                switch (args.length) {
                    case 1: 
                        contract = await abi.deploy(args[0]);
                        break;
                    case 2: 
                        contract = await abi.deploy(args[0], args[1]);
                        break;
                    case 3: 
                        contract = await abi.deploy(args[0], args[1], args[2]);
                        break;
                    case 4: 
                        contract = await abi.deploy(args[0], args[1], args[2], args[3]);
                        break;
                    case 5: 
                        contract = await abi.deploy(args[0], args[1], args[2], args[3], args[4]);
                        break;
                    case 6: 
                        contract = await abi.deploy(args[0], args[1], args[2], args[3], args[4], args[5]);
                        break;
                    default: 
                        contract = await abi.deploy(args);
                        break;
                }
            } else {
                contract = await abi.deploy(args);
            }
        } else {
            contract = await abi.deploy();
        }
      
        if (!silent) 
            console.log("Contract address:", contract.address);
            
        return contract;
    }
    
    /**
     * Deploys the specified contract to the connected network, with no console output. 
     * 
     * @param {string} artifactId name of the contract
     * @param {*} args contract args (optional). A single value if only one parameter is needed 
     * for construction; an array if more than one. 
     * @returns an ethers contract instance
     */
    async deployContractSilent(artifactId, args) {
        return this.deployContract(artifactId, args, true); 
    }
    
    /**
     * Gets the first 4 bytes of the keccak256 of the function's signature, as per function name
     * encoding standard. 
     * @param {string} name the function name without parentheses. 
     * @param {*} args (optional) array of strings representing the parameter types. 
     * E.g. ['address', 'uint32', 'bytes8']. If only one argument, a single value (non-array) can 
     * be passed (e.g. 'address') 
     * @returns {string} a 4-byte hex encoded EVM function selector. 
     */
    encodeFunctionSignature(name, argTypes) {
        let args = "";
        if (argTypes) {
            if (argTypes.length) {
                argTypes.forEach(element => {
                    if (args.length > 0)
                        args += ",";
                    args += element;
                });
            }
            else {
                args = argTypes;
            }
        }
        const sig = `${name}(${args})`;
        return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(sig)).substring(0, 10);
    }
    
    /**
     * Given the creator's address and a number of already existing transactions for that address, 
     * uses an algorithm to predict the next contract address that will be used by the CREATE 
     * function. 
     * @param {string} creatorAddr address of creator wallet or contract 
     * @param {number} txCount number of already existing transactions by that address
     * @returns {string} a 20-byte hex-encoded ethereum address e.g. '0x0f32101b1c00fa124a120f32101b1c001abcdda5'
     */
    predictContractAddress(creatorAddr, txCount) {
        return "0x" + (ethers.utils.solidityKeccak256(
            ["bytes1", "bytes1", "address", "bytes1"],
            ["0xd6", "0x94", creatorAddr, txCount+1]  
        )).substring(26);
    }
}

module.exports = new Utils();