const { ethers, waffle } = require("hardhat");

const provider = waffle.provider;

/**
 * General utility functions for testing, deploying, etc. 
 */
class Utils {
    /**
     * Deploys the specified contract to the connected network. 
     * 
     * @param {*} artifactId name of the contract
     * @param {*} args contract args (optional). A single value if only one parameter is needed 
     * for construction; an array if more than one. 
     * @param {*} silent (optional, false by default) if true, no output about the deployed contract
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
                        contract = await abi.deploy(args[0], args[1]);
                    case 2: 
                        contract = await abi.deploy(args[0], args[1], args[2]);
                    case 3: 
                        contract = await abi.deploy(args[0], args[1], args[2], args[3]);
                    case 4: 
                        contract = await abi.deploy(args[0], args[1], args[2], args[3], args[4]);
                    case 5: 
                        contract = await abi.deploy(args[0], args[1], args[2], args[3], args[4], args[5]);
                    default: 
                        contract = await abi.deploy(args);
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
     * @param {*} artifactId name of the contract
     * @param {*} args contract args (optional). A single value if only one parameter is needed 
     * for construction; an array if more than one. 
     */
    async deployContractSilent(artifactId, args) {
        return this.deployContract(artifactId, args, true); 
    }
    
    /**
     * Gets the first 4 bytes of the keccak256 of the function's signature, as per function name
     * encoding standard. 
     * @param {*} name the function name without parentheses. 
     * @param {*} args (optional) array of strings representing the parameter types. 
     * E.g. ['address', 'uint32', 'bytes8']. If only one argument, a single value (non-array) can 
     * be passed (e.g. 'address') 
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
}

module.exports = new Utils();