## Shop

### Ethernaut Description
Сan you get the item from the shop for less than the price asked?

**Things that might help:**
- Shop expects to be used from a Buyer
- Understanding restrictions of view functions

### Solution 
The Buyer changes the value returned by price() between the first time that it's called, and the second. The second time, it returns 0, and this becomes the actual buy price. 

### Takeaways
I think this is another example of the idea that you should make as few assumptions as possible about the behaviors of externally called contracts. 

Instead of calling buyer.price() twice in the Shop contract's buy() method, calling it once and caching the value would suffice, would presumably cost less gas, and would solve the problem. 

Also it's being communicated that the 'view' restriction on the Buyer interface is being violated here, and the EVM is fine with that. The external contract matches the shape of the interface enough at runtime that the method can be called. 

### Instructions
- compile 
- enter the Shop contract address (from Ethernaut) into attack.js
- run scripts/attack.js
