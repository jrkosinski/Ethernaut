## Ethernaut: Good Samaritan

### Ethernaut Description
This instance represents a Good Samaritan that is wealthy and ready to donate some coins to anyone requesting it.

Would you be able to drain all the balance from his Wallet?

**Things that might help**

Solidity Custom Errors

### Solution 
As the clue suggests, errors (and the try/catch in the GoodSamaritan contract) are part of the solution. There is a hook given in the code, in the form of the call to INotify.notify. This can be any custom contract, and will be called if the caller of requestDonation is a smart contract. That's the 'in' that allows you to inject custom functionality into the process. 

The other clue is in the 'catch' clause of the aforementioned try/catch in GoodSamaritan.sol. Note that the 'catch', it's specified that if the error caught is the NotEnoughBalance error, the GoodSamaritan will simply dump all of the contents of its wallet to the caller. Since INotify.notify is in that call stack, it stands to reason that if INotify.notify throws that specific error, it will be caught here... and the entire contents of the wallet will be dumped to the caller. Therefore, all one needs to do is: 
- create a contract that both implements INotify, and calls the GoodSamaritan's requestDonation method. 
- have that contract throw a NotEnoughBalance error from its notify method. 

https://hackernoon.com/good-samaritan-the-new-ethernaut-ctf-challenge


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

