## Force

### Ethernaut Description
Some contracts will simply not take your money ¯\_(ツ)_/¯

The goal of this level is to make the balance of the contract greater than zero.

**Things that might help:**
- Fallback methods
- Sometimes the best way to attack a contract is with another contract.

### Solution 
If a contract has no payable method, including no payable fallback() or receive(), then there are 2 ways that it can still receive ether. 

One is to predict the address of the contract before it's created, then send ether to that address before the contract is created. The contract will be created 'on top' of the ether that's already there. 

The other way is to self-destruct a contract that has ether, and pass the address of the target contract. 

The first way is used to complete this level. The second can be seen in the unit tests. 

### Takeaways
There are several ways of paying ether into a contract. 

### Instructions
- compile
- enter the Force contract address (from Ethernaut) into attack.js
- run scripts/attack.js