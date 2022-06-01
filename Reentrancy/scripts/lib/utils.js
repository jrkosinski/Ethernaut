const { ethers, waffle } = require("hardhat");
const { isArray } = require("lodash");

const provider = waffle.provider;

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
            if (isArray(args)) {
                
                let argString = "";
                for (let n=0; n<args.length; n++) {
                    argString += `${n > 0 ? "," : ""}args[${n}]`;
                }
                eval(`contract = abi.deploy(${argString});`); 
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
     * @param {array} argTypes (optional) array of strings representing the parameter types. 
     * E.g. ['address', 'uint32', 'bytes8']. If only one argument, a single value (non-array) can 
     * be passed (e.g. 'address') 
     * @returns {string} a 4-byte hex encoded EVM function selector. 
     */
    encodeFunctionSignature(name, argTypes) {
        let args = "";
        if (argTypes) {
            if (isArray(argTypes)) {
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
        console.log(sig);
        return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(sig)).substring(0, 10);
    }
    
    /**
     * Encodes data including the function signature and argument data, to call the function. 
     * Function throws if args.length != argValues.length (if both are passed as arrays) 
     * 
     * @param {string} name the function name without parentheses. 
     * @param {array} args (optional) array of strings TYPES AND NAMES representing the parameters. 
     * E.g. ['address _owner', 'uint32 _count', 'bytes8 _value']. If only one argument, a single value (non-array) can 
     * be passed (e.g. 'address _owner') 
     * @param {*} argValues (optional) array of string argument values. Must be the same number of 
     * elements as argTypes.length. 
     */
    encodeFunctionCallData(name, args, argValues) {
        let argsString = ""; 
        if (args) {
            if (isArray(args)) {
                if (!argValues || !argValues.length)
                    throw "If args is passed as an array, argValues must be also.";
                if (argValues.length != args.length) 
                    throw "Array args and argValues must be of the same length.";
                args.forEach((i) => {
                    if (argsString.length > 0)
                        argsString += ", "; 
                    argsString += i; 
                });
            } else {
                argsString = args;
                if (!isArray(argValues))
                    argValues = [argValues];
            }
        } 
        let funcSig = [ `function ${name}(${argsString})` ];
        let iface = new ethers.utils.Interface(funcSig);
        return iface.encodeFunctionData(name, argValues)
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
    
    /**
     * Gets the address stored at the standard implementation memory slot of the given contract. 
     * @param {string} contractAddr address of the parent contract
     * @returns whatever exists at memory slot 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
     * of the given address, cast as a 20-byte hex address. 
     */
    async getImplementationAddress(contractAddr) {        
		return "0x" + (await provider.getStorageAt(contractAddr, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc")).substring(26, 66); 			
    }
}

module.exports = new Utils();