## Ethernaut: Fallout

### Ethernaut Description
Claim ownership of the contract below to complete this level.

**Things that might help**
- Solidity Remix IDE

### Solution 
This one is so simple, but based on a known famous attack. Apparently a contract was renamed, but its constructor was not (and I suppose this was back in the days when Solidity constructors in Solidity bore the same name of the contract). So the constructor (which set the owner as msg.sender) just became an ordinary, unprotected, callable public function (named _Fal1out()_).

### Takeaways
Don't assume that the eponymous function is the constructor. And don't do what they did I guess. Maybe the lesson here is that disastrous consequences can arise from trivial oversights. 

This one is based on a real attack, the Rubixi contract hack I believe. I don't remember the exact details, but this is a simplified version of exactly that. I don't know if this is a common mistake, but it's good to remember that every line of code must be thoroughly examined, as a disastrous vulnerability occasionally can arise from a small mistake. 

Incidentally there's a second way to drain the contract's funds, which can be seen in the unit tests.

### Instructions
- Compile 
- In [/scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [/scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [/contracts/Fallout.sol](contracts/Fallout.sol) - Ethernaut contracts 
- [/scripts/execute.js](scripts/execute.js) - Executes the solution 
- [/test/FalloutTest.js](test/FalloutTest.js) - Unit tests 
