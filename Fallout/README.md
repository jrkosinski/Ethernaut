## Fallout

### Ethernaut Description
Claim ownership of the contract below to complete this level.

**Things that might help**
Solidity Remix IDE

### Solution 
This one is so simple, but based on a known famous attack. Apparently a contract was renamed, but its constructor was not (and I suppose this was back in the days when Solidity constructors in Solidity bore the same name of the contract). So the constructor (which set the owner as msg.sender) just became an ordinary, unprotected, callable public function (named Fal1out()).

### Takeaways
Don't assume that the eponymous function is the constructor. And don't do what they did I guess. Maybe the lesson here is that disastrous consequences can arise from trivial oversights. 

Incidentally there's another way to drain the contract's funds, which can be seen in the unit tests.

### Instructions
- compile 
- enter the Fallout contract address (from Ethernaut) into attack.js
- run scripts/attack.js
