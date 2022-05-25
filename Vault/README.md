## Vault

### Ethernaut Description
Unlock the vault to pass the level!
  
### Solution 
The password (that you have to pass in to the unlock function) is stored in the second memory slot. If you retrieve it from there. you can use it. 

An alternative (but less exciting) way is to find the 'level' contract (Ethernaut gives you the address of it) in etherscan. In its code to create the contract, it will have passed the password value to its constructor. 

### Takeaways
- nothing is private on the blockchain 
- how to retrieve state data (even if it's private) from a published contract 

Private state variables cannot be modified from outside the contract; that would require a transaction to modify the value, and the contract/EVM will not allow that. They can, however, be read, so they should definitely not be used for anything that should be truly unseeable or secure. 

### Instructions
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [contracts/Force.sol](contracts/Vault.sol) - Ethernaut contract
- [scripts/execute.js](scripts/execute.js) - Executes the solution 
- [test/ForceTest.js](test/VaultTest.js) - Unit tests 
