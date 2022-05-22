## NaughtCoin

### Ethernaut Description
NaughtCoin is an ERC20 token and you're already holding all of them. The catch is that you'll only be able to transfer them after a 10 year lockout period. Can you figure out how to get them out to another address so that you can transfer them freely? Complete this level by getting your token balance to 0.

### Solution 
The author of the token protected the transfer method with the lockTokens modifier, but neglected to do anything about approve/transferFrom. As the contract inherits from OpenZeppelin's ERC20 base, those method would just have their default implementations. 

### Takeaways
This exercise just wants you to be aware that, in regard to ERC20 tokens, approve/transferFrom is an alternate to transfer, as a way to move tokens from one address to another. 

### Instructions
- compile 
- enter the NaughtCoin contract address (from Ethernaut) into attack.js
- run scripts/attack.js
