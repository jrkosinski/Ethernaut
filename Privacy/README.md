## Ethernaut: Privacy

### Ethernaut Description
The creator of this contract was careful enough to protect the sensitive areas of its storage.

Unlock this contract to beat the level.

**Things that might help:**
- Understanding how storage works
- Understanding how parameter parsing works
- Understanding how casting works

### Solution 
The password is stored in an array in storage. Since the array is fixed-length, it's stored sequentially in the 4th, 5th, and 6th data slots. The solution is to read it from there, then pass only the first half of it (since the parameter must be passed as bytes16) to 'unlock' the contract. 

This puzzle is similar to the [Vault](https://github.com/jrkosinski/Ethernaut/tree/main/Vault) puzzle, but with more data variables to make it a bit harder, there's an array, and a cast. 

- the 0 slot stores 1 boolean variable (_locked_)
- the 1 slot stores 1 unit256 variable (_ID_)
- the 2 slot has three packed variables: 2 uint8s and a uint16 (_flattening, denomination, and awkwardness_)
- the 3, 4, and 5 slots are for the 3-element array _data_ (1 slot per element) 

There is an alternate and maybe quicker way: the 'level' passes the string in its constructor code. When you find the transaction that creates the contract, the data is in there (or can be found by decompiling the contract bytecode in etherscan). 

### Takeaways
The exercise wants you to understand how things are stored in memory, especially fixed-length arrays. You can also see how some of the data fields are packed, for example the 3rd memory slot contains three packed values - two byte8 values and a uint16.

Also casting: it wants the user to understand that the bytes32 value of the password must be converted to bytes16. Maybe it's also trying to illustrate how the endianness of stored integers and strings differ from one another. 

### Instructions
- Compile 
- In [/scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [/scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [/contracts/Privacy.sol](contracts/Privacy.sol) - Ethernaut contract
- [/scripts/execute.js](scripts/execute.js) - Executes the solution 
- [/test/PrivacyTest.js](test/PrivacyTest.js) - Unit tests 
