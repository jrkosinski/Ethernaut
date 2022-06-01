## Force

### Ethernaut Description
Some contracts will simply not take your money ¯\_(ツ)_/¯

The goal of this level is to make the balance of the contract greater than zero.

**Things that might help:**
- Fallback methods
- Sometimes the best way to attack a contract is with another contract.

### Solution 
If a contract has no payable method, including no payable fallback() or receive(), then there are at least 2 ways that it can still receive ether. 

One is to predict the address of the contract before it's created, then send ether to that address before the contract is created. The contract will be created 'on top' of the ether that's already there. 

The other way is to self-destruct a contract that has ether, and pass the address of the target contract. 

The second way is used to complete this level. The first (address prediction) can be seen in the unit tests. 

### Takeaways
There is more than one way to send ether into a contract. Furthermore, sometimes overlooking a way that ether can get _into_ a contract can lead to ether going _out of_ a contract. 

### Instructions
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [contracts/Force.sol](contracts/Force.sol) - Ethernaut contract
- [contracts/Destructible.sol](contracts/Destructible.sol) - Contract that executes the 'attack'. 
- [scripts/execute.js](scripts/execute.js) - Executes the solution 
- [test/ForceTest.js](test/ForceTest.js) - Unit tests 
