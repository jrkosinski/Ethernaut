## Preservation

### Ethernaut Description
This contract utilizes a library to store two different times for two different timezones. The constructor creates two instances of the library for each time to be stored.

The goal of this level is for you to claim ownership of the instance you are given.

**Things that might help**

- Look into Solidity's documentation on the delegatecall low level function, how it works, how it can be used to delegate operations to on-chain. libraries, and what implications it has on execution scope.
- Understanding what it means for delegatecall to be context-preserving.
- Understanding how storage variables are stored and accessed.
- Understanding how casting works between different data types.

### Solution 
The fun thing about this one, is that delegatecall allows for unintended memory overwrite, and that enables the first step of the attack. The first step is to replace the existing timeZone1Library with your own custom contract. The second step is to invoke that custom contract in order to overwrite the owner with your own custom value, getting the requirement of becoming the owner. 

1. Create your own custom contract which exposes a setTime(uint) function. This function should write the passed in value to the 4th memory slot. 

2. The first step of the attack is to take advantage of a bug in this contract setup to overwrite the contract's timeZone1Library with your own contract from step 1. Simply calling setFirstTime(uint) and passing the address of your contract will do this. The call to the library's setTime function appears to set the library contract's storedTime value (first memory slot). However, because delegatecall is executing the call in the parent contract's context, it's actually overwriting the 1st memory slot of the parent contract, which is the address of timeZone1Library. You are essentially replacing that library. 

3. Now that your library is in place, invoke it by calling setFirstTime again. But this time pass the address of the desired owner (yourself). Your contract (from step 1) is set up to write to the 4th memory slot. Which is, in the context of the parent contract, the owner. After that call you should have overwritten the owner with your own address. 

### Takeaways
The dangers of delegatecall. It can be easy to forget that the call is executed in the caller's context, not the callee's. It can be even easier to miss some of the less obvious or less intuitive implications of this. 

In this case, delegatecall should not be used. If it did for some reason or another need to be used, then the library contract's code would have to take into account the memory layout of the calling contract. But that's a backwards design, so it doesn't really make sense. Really there's no need for delegatecall here, but if delegatecall is used it must be remembered that it operates within the state context of the caller contract. This is the caller contract's responsibility to know, and to be careful about what it delegatecalls. 

### Instructions
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [contracts/Preservation.sol](contracts/Preservation.sol) - Ethernaut contract
- [contracts/ImpostorLibrary.sol](contracts/ImpostorLibrary.sol) - Contract that executes the 'attack'
- [contracts/FixedTimeLibrary.sol](contracts/FixedTimeLibrary.sol) - Contract that fixes the bug in the timezone library; used in unit tests 
- [scripts/execute.js](scripts/execute.js) - Executes the solution 
- [test/PreservationTest.js](test/PreservationTest.js) - Unit tests 
