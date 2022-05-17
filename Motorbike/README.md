## Motorbike

### Ethernaut Description
Ethernaut's motorbike has a brand new upgradeable engine design.

Would you be able to selfdestruct its engine and make the motorbike unusable?

**Things that might help:**
- EIP-1967
- UUPS upgradeable pattern
- Initializable contract

### Solution 
- because of delegatecall, engine is uninitialized 
- because it's uninitialized, initialize can still be called 
- call initialize to become upgrader 
- upgrade to something that will self-destruct

### Takeaways
- never leave initializable contracts uninitialized 
- be aware of the potential pitfalls of delegatecall

### Instructions
- compile 
- enter the Motorbike contract address (from Ethernaut) into attack.js
- run scripts/attack.js
