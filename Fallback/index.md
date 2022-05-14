### Ethernaut Description
Look carefully at the contract's code below.

You will beat this level if

1. you claim ownership of the contract
2. you reduce its balance to 0
  
**Things that might help**

- How to send ether when interacting with an ABI
- How to send ether outside of the ABI
- Converting to and from wei/ether units (see help() command)
- Fallback methods

### Solution 
There are two ways to become the owner (outside of the constructor). One is the hard way, by being the highest contributor. The other is much easier, via the receive() method. To take advantage of this we need only to first contribute 1 wei via the contribute() method, then send 1 wei to the receive() method. This will satisfy the requirements to allow the caller to become the owner. No new contract code is necessary to accomplish this.  

### Instructions
- compile 
- enter the Fallback contract address (from Ethernaut) into attack.js
- run scripts/attack.js