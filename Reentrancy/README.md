## Reentrancy

### Ethernaut Description
The goal of this level is for you to steal all the funds from the contract.

**Things that might help:**
- Untrusted contracts can execute code where you least expect it.
- Fallback methods
- Throw/revert bubbling
- Sometimes the best way to attack a contract is with another contract.
- See the Help page above, section "Beyond the console"

### Solution 
No attempt is made to hide the fact that the solution to this level is to execute a reentrancy attack. The vulnerable point is in the withdraw(uint) method, where the call is made to msg.sender. Don't assume that msg.sender is not itself a smart contract. 

Well, supposing that it is a smart contract, we can imagine what might happen. Its receive() method would be called. From its receive() method it could call withdraw() again. At that point its balance would not yet have been decremented, so it would still pass the check `if (balances[msg.sender] >= _amount)`, _even though it had already received the amount_. That's the key right there. It will continually keep receiving the same amount over and over, until the transaction ran out of gas or the contract ran out of ether. 

Before executing that attack, you will have to send some amount of ether to the contract (from your attacker contract), so that it will pass the balance amount check. The amount that you send should ideally be an even factor of the contract's balance amount, or else you will not be able to steal all of the funds with one call. Also make sure you supply your transaction with enough gas, so that it doesn't run out before all of the recursive calls are finished. 


### Takeaways
This contract could have reduced the danger of this sort of attack by either 
- checks-effects-interactions 
or 
- a reentrancy guard 
(or both) 

Checks-effects-interactions is a pattern to guard against the likelihood of reentrancy attacks. The main point of it is that any checks (e.g. is the caller allowed to call this method, or take a certain action, etc.) should be the first code in the method. This is standard. This contract checks (first) if the caller's balance has the necessary amount. 

Next, the effects of the method should come before any external calls (interactions). That's where this contract goes wrong; the effects (decrementing the caller's balance) is done last. If this were done before the external call, the reentrancy attack would not be possible. The **check** would eventually fail when it was supposed to, and the method would return. 

A simple reentrancy guard could be just a boolean flag in storage that sets to true when the method call begins, and sets to false when the method returns or reverts. OpenZeppelin has a ReentrancyGuard.sol, and it is basically just as described (handled through a modifier). Costs a bit of extra gas for storage and processing, but simple and effective. 

Or why not both? 

Another takeaway might be to consider even before the solution, whether or not msg.sender is a contract. Seeing an unchecked call to an anonymous address is a big red flag for a possible attack point. So don't assume an address is not a contract, even if it fails the 'is a contract' test (as it could be constructor code). 

### Instructions
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [contracts/Reentrancy.sol](contracts/Reentrancy.sol) - Ethernaut contract
- [contracts/Attacker.sol](contracts/Attacker.sol) - Contract that executes the attack. 
- [scripts/execute.js](scripts/execute.js) - Executes the solution 
- [test/ReentrancyTest.js](test/ReentrancyTest.js) - General unit tests 
- [test/AttackTest.js](test/AttackTest.js) - Unit test that demonstrates attack
