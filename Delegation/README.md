## Ethernaut: Delegation

### Ethernaut Description
The goal of this level is for you to claim ownership of the instance you are given.

**Things that might help**
- Look into Solidity's documentation on the delegatecall low level function, how it works, how it can be used to delegate operations to on-chain libraries, and what implications it has on execution scope.
- Fallback methods
- Method ids
  
### Solution
The _Delegation_ contract calls to the _Delegate_ contract via _delegatecall_, in the fallback method. Therefore, if we call _Delegation_ with the method signature of the pwn() method, and _Delegation_ does not have such a method, execution will go to the fallback. There, it will call to _Delegate_'s pwn() method. 

Now, in the pwn() method, the owner will be set as msg.sender. But since it's _delegatecall_, it won't set _Delegate_'s owner, but _Delegation_'s. Because _delegatecall_ preserves the context of the caller, not the callee. It operates on the calling contract's memory, not the called contract's. So we will then be setting _Delegation_'s owner to whatever address called the method. And we become the owner of the contract. 

### Takeaways
_delegatecall_ is a common attack point, and has been a known common attack point in the past. It's context-preserving nature has confused developers at times, and in more complex examples it can legitimately have some pretty difficult to foresee effects. In short, to summarized I'd say that it creates a deceptive amount of complication that can lead to an attack point. So while this example is simple and the issue is easy to see, it's a legitimate security issue, though awareness of it has grown. 

### Instructions
- In **/scripts/execute.js**, set the contractAddr variable's value with Ethernaut's contract.address. 
- Run **/scripts/execute.js** in hardhat (rinkeby network)
`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- **/contracts/Delegation.sol** - Ethernaut contracts 
- **/scripts/execute.js** - Executes the solution 
- **/test/DelegationTest.js** - Unit tests 
