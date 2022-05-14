### Ethernaut Description
This is a simple wallet that drips funds over time. You can withdraw the funds slowly by becoming a withdrawing partner.

If you can deny the owner from withdrawing funds when they call withdraw() (whilst the contract still has funds, and the transaction is of 1M gas or less) you will win this level.

### Solution 
This is another reentrancy attack. Note the vulnerability in the withdraw() method, the unchecked call to an outside entity. That can be forced to be a contract, and the contract can, after accepting the payment, call withdraw again recursively. That will cause the caller to be paid again, calling withdraw() again... etc. until gas is used up. Preventing the owner from withdrawing funds, and potentially draining the contract's funds. 

Step 1: create an attacker contract with a receive() method which calls the withdraw() method of the caller. 
Step 2: make that contract a partner of the target contract (by calling its setWithdrawPartner method, passing the attacker contract's address)

### Instructions
- compile 
- run scripts/attack.js