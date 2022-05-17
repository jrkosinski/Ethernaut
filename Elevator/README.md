## Elevator

### Ethernaut Description
This elevator won't let you reach the top of your building. Right?

**Things that might help:**
- Sometimes solidity is not good at keeping promises.
- This Elevator expects to be used from a Building.

### Solution 
The Ethernaut description implies that the goal is to get the 'top' boolean data in the contract's first data slot to be set to true. 

The Elevator contract has a clause that explicitly denies going to the top floor. It's based on whether the Building contract returns true or false for the isLastFloor(uint) method. When you design your Building contract (which you must do in order to accomplish this), you can make it return from that property in whatever way you want. Looking at the code for Elevator's goTo function, it's easy to see that a Building whose isLastFloor(uint) method returned 'false' the very first time it was called, but 'true' the second time, would trick the Elevator into setting top = true. 

So the solution is to design such a contract, deploy it on rinkeby, then invoke it passing the Elevator's address, in such a way that it calls the Elevator's goTo(uint) method. 

### Takeaways
What is Ethernaut trying to teach here? My takeaway is that you should be very wary of external contracts called by your contract, in that you should strictly limit your assumptions about how they will behave. The only assumption we can safely make about the external contract (Building) is that it will implement an isLastFloor method which takes a uint and returns a bool. The natural assumption here is that it will return deterministically the same output every time it's given a specific input, but we cannot make that assumption. So in short, limit your assumptions about any external contracts, to the bare minimum. 

I would also like to add: suppose your contract calls to a _specific_ smart contract address, and is limited to calling only that address? Then you can be freer with your assumption, but you should still check: 
- is that contract fully upgradeable? If so, then any assumptions are moot, as that contract can change overnight to be essentially a different contract. 
- how would your call behave in the case that that contract were self-destructed? 
- how would your call behave if the external call reverted? 
- how would your call behave if the external call used up all available gas? 
- how would your call behave if the external call called back into the caller (reentrant call)? 

Again, you must limit your assumptions to the bare minimum. 


### Instructions
- compile 
- enter the Elevator contract address (from Ethernaut) into attack.js
- run scripts/attack.js
