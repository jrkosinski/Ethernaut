## Privacy

### Ethernaut Description
The creator of this contract was careful enough to protect the sensitive areas of its storage.

Unlock this contract to beat the level.

**Things that might help:**
- Understanding how storage works
- Understanding how parameter parsing works
- Understanding how casting works

### Solution 
The password is stored in an array in storage. Since the array is fixed-length, it's stored sequentially in the 4th, 5th, and 6th data slots. The solution is to read it from there, then pass only the first half of it (since the parameter must be passed as bytes16) to 'unlock' the contract. 

There is an alternate and maybe quicker way: the 'level' passes the string in its constructor code. When you find the transaction that creates the contract, the data is in there (or can be found by decompiling the contract bytecode in etherscan). 

### Takeaways
The exercise wants you to understand how things are stored in memory, especially fixed-length arrays. You can also see how some of the data fields are packed, for example the 3rd memory slot contains three packed values - two byte8 values and a uint16.

Also casting: it wants the user to understand that the bytes32 value of the password must be converted to bytes16. Maybe it's also trying to illustrate how the endianness of stored integers and strings differ from one another. 

### Instructions
- compile 
- enter the Privacy contract address (from Ethernaut) into attack.js
- run scripts/attack.js
