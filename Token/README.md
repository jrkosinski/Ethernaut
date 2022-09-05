## Ethernaut: Token

### Ethernaut Description
The goal of this level is for you to hack the basic token contract below.

You are given 20 tokens to start with and you will beat the level if you somehow manage to get your hands on any additional tokens. Preferably a very large amount of tokens.

**Things that might help:**
- What is an odometer?

### Solution 
As the hint suggests, the attack is by way of underflow. None of the arithmetic operations in the _transfer_ method that check, increment, or decrement balances are checked for underflow or overflow. In this way, transferring more than your available balance is totally allowed. Transferring (your balance)+1 will give you 78 digits of pure token wealth, significantly more than the totalSupply() of the token. 

Note that as of Solidity 0.8, arithmetic operations are checked by default. I've had to fix that for this exercise (which was created before 0.8, but I am using 0.8 anyway) by putting the arithmetic operations into an _unchecked_ block (in the _transfer_ method). Note also that this token provides a simplified subset of the ERC20 standard, not the entire standard. 

### Takeaways
Be wary of arithmetic overflows and underflows, which can cause an unanticipated state in your contract, which can in turn become an attack point. 

The normal guard against this prior to Solidity 0.8 was to check your arithmetic for overflow/underflow, or (more commonly) to use OpenZeppelin's SafeMath library. With 0.8 and later, this is no longer needed, as the arithmetic is checked by default. Perhaps OpenZeppelin will deprecate their SafeMath library in the future, though it's my understanding that for now it will still be included in their suite. 

### Instructions
- Compile 
- In [/scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [/scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [/contracts/Token.sol](contracts/Token.sol) - Ethernaut contract
- [/scripts/execute.js](scripts/execute.js) - Executes the solution 
- [/test/TokenTest.js](test/TokenTest.js) - Unit tests 
