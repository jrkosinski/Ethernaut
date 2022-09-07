## Ethernaut: Good Samaritan

### Ethernaut Description
This instance represents a Good Samaritan that is wealthy and ready to donate some coins to anyone requesting it.

Would you be able to drain all the balance from his Wallet?

**Things that might help**

Solidity Custom Errors

### Solution 
As the clue suggests, errors (and the try/catch in the GoodSamaritan contract) are part of the solution. Reentrancy is also part of the solution. 

//TODO: explain 


### Takeaways
The level is an introduction to the relatively new error format. Previously, error information was given in string form, e.g. 

`require(balance > 0, "balance must be greater than zero")`

The strings are gas-costly, and it's not easy to pass dynamic information into them. Newish (0.8.4) errors can be thrown like: 

```
error InsufficientBalance(uint currentBalance); 

function transfer() {
    if (balance <= 0) revert InsufficientBalance(balance); 
```


### Instructions
- compile 
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [/contracts/GoodSamaritan.sol](contracts/GoodSamaritan.sol) - Ethernaut main contract 
- [/contracts/ErrorAttack.sol](contracts/ErrorAttack.sol) - Contract that performs the most successful attack 
- [/contracts/ErrorAttack.sol](contracts/ReentrancyAttack.sol) - Alternate attack, using only reentrancy; slower and more expensive 
- [/scripts/execute.js](scripts/execute.js) - Executes the solution 
- [/test/GoodSamaritanTest.js](test/GoodSamaritanTest.js) - Unit tests 

