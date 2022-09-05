## Ethernaut: Alien Codex

### Ethernaut Description
You've uncovered an Alien contract. Claim ownership to complete the level.

**Things that might help**

* Understanding how array storage works
* Understanding ABI specifications
* Using a very underhanded approach

### Solution 
Just glancing over the contract, it becomes immediately apparent that the potential for array index underflow/overflow is either a red herring, or it's part of the attack. I haven't seen any red herrings in any of to other Ethernaut problems, so I guessed it was related (at any rate that avenue needed to be looked into regardless).
Indeed, underflowing that array length is the first step. 

### Takeaways

### Instructions
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- **/contracts/AlienCodex.sol** - Ethernaut contracts 
- **/scripts/execute.js** - Executes the solution 
- **/test/AlienCodexTest.js** - Unit tests 

