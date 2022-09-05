## Ethernaut: Motorbike

### Ethernaut Description
Ethernaut's motorbike has a brand new upgradeable engine design.

Would you be able to selfdestruct its engine and make the motorbike unusable?

**Things that might help:**
- EIP-1967
- UUPS upgradeable pattern
- Initializable contract

### Solution 
//TODO: put into paragraphs
- because of delegatecall, engine is uninitialized 
- because it's uninitialized, initialize can still be called 
- call initialize to become upgrader 
- upgrade to something that will self-destruct

### Takeaways
- don't leave initializable contracts uninitialized 
- be aware of the potential pitfalls of delegatecall

### Instructions
- Compile 
- In [/scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [/scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [/contracts/Motorbike.sol](contracts/Motorbike.sol) - Ethernaut contract
- [/contracts/AttackEngine.sol](contracts/AttackEngine.sol) - Contract which executes the attack
- [/scripts/execute.js](scripts/execute.js) - Executes the solution 
- [/test/RecoveryTest.js](test/ShopTest.js) - Unit tests 
