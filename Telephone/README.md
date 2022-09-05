## Ethernaut: Telephone

### Ethernaut Description
Claim ownership of the contract to complete this level.

### Solution 
Just call the changeOwner method from another contract. 
//TODO: elaborate. 

### Takeaways
Tx.origin can't be relied on to be equal to msg.sender.  
//TODO: elaborate. 

### Instructions
- Compile 
- In [/scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [/scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [/contracts/Telephone.sol](contracts/Telephone.sol) - Ethernaut contracts 
- [/contracts/Attacker.sol](contracts/Attacker.sol) - The contract that performs the attack
- [/scripts/execute.js](scripts/execute.js) - Executes the solution 
- [/test/TelephoneTest.js](test/TelephoneTest.js) - Unit tests 
