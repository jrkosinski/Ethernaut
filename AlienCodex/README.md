## Ethernaut: Alien Codex

### Ethernaut Description
You've uncovered an Alien contract. Claim ownership to complete the level.

**Things that might help**

* Understanding how array storage works
* Understanding ABI specifications
* Using a very underhanded approach

### Solution 
Just glancing over the contract, it becomes immediately apparent that the potential for array index underflow/overflow is either a red herring, or it's part of the attack. I haven't seen any red herrings in any of to other Ethernaut problems, so I guessed it was related (at any rate that avenue needed to be looked into regardless).
(Side note: for me, the 0.5.0 version number was also a clue to that effect). Indeed, underflowing that array length is the first step. 

The very first step is to simply call _make_contact()_, because without that you can't interact with the contract's array in ways that you need to. There's no trick to calling it; just call it, it's public and unrestricted by any conditions. 

Next is to underflow the array in order to overflow its length. After you call the _retract()_ method (which you can do after calling _make_contact()_, the array length will be the max size of uint256. This essentially gives you access to all of the contract's memory slot storage! Surely there's something useful you can do with that... 

Once that's done, it's a matter of figuring out how to use that ability to overwrite part of what's in memory slot 0, which is the owner address. Note that slot 0 is packed; it contains the bool _contact_ variable on one end, and the owner address on the other. You only need to overwrite the part that is the owner address. To win the level, overwrite it with your own address. 

You must know how arrays are stored. The _codex_ array is stored at storage slot 1, but the only thing actually stored there is the array length. You can verify this; before your call to _retract()_, the value 0 will be contained in storage slot 1. Afterwards, it will hold the max value of uint256 (2**256 -1); 

The array's actual elements are stored differently. Their memory slots are calculated in this way: 
`element i is stored at: keccak256(<array's storage slot>) + i`
  
So for an array of uint256's (32 bytes) stored at storage slot 1, this would become: 
`element i is stored at: keccak256(1) + i`

So to get the storage slot address of the 101st element of a uint256 array stored at storage slot 1, you could call: 
`uint256 slot = uint256(keccak256(abi.encodePacked(uint(1)))) + 101` 

Now the trick is that in addressing the array, you can find an array index that will overflow the contract's memory, and wrap it back to storage slot 0, which is what you want to overwrite. To do that, find out how many 32-byte slots there are from the (already calculated in previous step) array's storage slot index, to the end of memory (2 ** 256 -1). Then adding one more to that will wrap back around to zero. 

So finally, take that number that you've calculated, pass it in to the _revise()_ function, along with the data that you want to overwrite storage slot 0's data with. It will look something like: 0x000000000000000000000001ffffffffffffffffffffffffffffffffffffffff, but replacing the ffs with your 20-byte hex wallet address. In [scripts/execute.js](scripts/execute.js), and [test/AlienCodexTest.js](/test/AlienCodexTest.js) it's done in javascript. 


### Takeaways

### Instructions
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- **/contracts/AlienCodex.sol** - Ethernaut contracts 
- **/scripts/execute.js** - Executes the solution 
- **/test/AlienCodexTest.js** - Unit tests 

