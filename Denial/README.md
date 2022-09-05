## Denial

### Ethernaut Description
This is a simple wallet that drips funds over time. You can withdraw the funds slowly by becoming a withdrawing partner.

If you can deny the owner from withdrawing funds when they call withdraw() (whilst the contract still has funds, and the transaction is of 1M gas or less) you will win this level.

### Solution 
This is another reentrancy attack. Note the vulnerability in the withdraw() method, the unchecked call to an outside entity. That can be forced to be a contract; and the contract can, after accepting the payment, call withdraw again recursively. That will cause the caller to be paid again, calling withdraw() again... etc. until gas is used up. Preventing the owner from withdrawing funds, and potentially draining the contract's funds. 

Step 1: create an attacker contract with a receive() method which calls the withdraw() method of the caller. 

Step 2: make that contract a partner of the target contract (by calling its setWithdrawPartner method, passing the attacker contract's address)

### Takeaways
First, as with other reentrancy attacks, the unchecked call to an outside entity should always be seen as a potential attack point. This one could have been prevented by using the checks-effects-interactions pattern, or by implementing a reentrancy guard, or both. Reentrancy has in the past been a common way to attack a contract's logic. 

It's good to consider the different forms that reentrancy can take. And in general, anytime a contract calls out to another entity, this logic should be examined closely, and one should try to consider ways in which this outside call could go wrong.  

### Instructions
- In [/scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [/scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [/contracts/Denial.sol](contracts/Denial.sol) - Ethernaut contract
- [/contracts/Attacker.sol](contracts/Attacker.sol) - Contract which executes the attack
- [/scripts/execute.js](scripts/execute.js) - Executes the solution 
- [/test/DenialTest.js](test/DenialTest.js) - Unit tests 
