## GatekeeperTwo

### Ethernaut Description
This gatekeeper introduces a few new challenges. Register as an entrant to pass this level.

**Things that might help:**
- Remember what you've learned from getting past the first gatekeeper - the first gate is the same.
- The assembly keyword in the second gate allows a contract to access functionality that is not native to vanilla Solidity. See here for more information. The extcodesize call in this gate will get the size of a contract's code at a given address - you can learn more about how and when this is set in section 7 of the yellow paper.
- The ^ character in the third gate is a bitwise operation (XOR), and is used here to apply another common bitwise operation (see here). 
- The Coin Flip level is also a good place to start when approaching this challenge.

### Solution 
Gate one is the same as in the first gatekeeper; calling from another contract will ensure that the tx.id is different from the msg.sender.

Gate two is checking that the codesize is 0. Generally if codesize > 0, the caller is taken to be a contract (which would fail the gate). But if we call from the constructor of the smart contract, codesize is still 0 (as the contract has not actually been created yet). 

Gate three is checking for a specific transformation of an 8-byte portion of the sender address. Get it by starting with the sender (contract) address, take the first 8 bytes of the hash of the address, and cast it to uint64. Then take the 1s complement of that value, and pass 8 bytes of it cast as bytes8. 

### Takeaways
- First, the exercise is reiterating that tx.id is not always equal to msg.sender. 
- Second, the exercise teaches about extcodesize, how it is > 0 for contract addresses, except when the caller is construction/creation code. 
-  Finally, bitwise operations and binary conversions! Be aware of how they work and what they return. 

### Instructions
- compile 
- enter the GatekeeperTwo contract address (from Ethernaut) into attack.js
- run scripts/attack.js