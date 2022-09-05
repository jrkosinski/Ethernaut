## Ethernaut: Fallback

### Ethernaut Description
Look carefully at the contract's code below.

You will beat this level if

1. you claim ownership of the contract
2. you reduce its balance to 0
  
**Things that might help**

- How to send ether when interacting with an ABI
- How to send ether outside of the ABI
- Converting to and from wei/ether units (see help() command)
- Fallback methods

### Solution 
There are two ways to become the owner (outside of the constructor). One is the hard way, by being the highest contributor. The other is much easier, via the receive() method. To take advantage of this we need only to first contribute 1 wei via the contribute() method, then send 1 wei to the receive() method. This will satisfy the requirements to allow the caller to become the owner. No new contract code is necessary to accomplish this.  

### Takeaways
This exercise just aims to have the user be familiar with what a fallback is, how it's defined, and how it's invoked. And of course, how fallbacks may, if unheeded, conceivably have unexpected security consequences. 

Fallback functions are executed if a call to a contract is made with either no method signature specified, or no method in the contract matches the specified signature. In other words, the contract can't match the signature that you requested to anything in the contract's ABI. Fallbacks have the following properties: 

- are optional 
- cannot take any arguments 
- cannot return anything 
- must be marked external (therefore cannot be invoked directly from within the contract itself) 
- in recent Solidity versions, must be marked with the keyword "fallback" (in early versions, they were just unnamed functions) 

Fallbacks are an essential component of some contract upgrade patterns. 

### Instructions
- Compile
- In [/scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [/scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [/contracts/Fallback.sol](contracts/Fallback.sol) - Ethernaut contract
- [/scripts/execute.js](scripts/execute.js) - Executes the solution 
- [/test/FallbackTest.js](test/FallbackTest.js) - Unit tests 
