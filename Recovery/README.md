## Recovery

### Ethernaut Description

A contract creator has built a very simple token factory contract. Anyone can create new tokens with ease. After deploying the first token contract, the creator sent 0.001 ether to obtain more tokens. They have since lost the contract address.

This level will be completed if you can recover (or remove) the 0.001 ether from the lost contract address.
  
### Solution 

In the Recovery contract's generateToken method, a SimpleToken contract is created. It's the address of that token that we want to get. Once that's been gotten, the rest is trivial.  

Since everything is on the blockchain, you can simply just go on etherscan, look up the transaction that created the token, and get the address from there. This is a quick and easy way to do it. You already know the contract address, and in its internal transactions list on etherscan is a transaction that creates the token contract, and the address will of course be the 'to' address of that transaction. It will be marked as a contract creation transaction on etherscan. 

Once you find the contract address, the rest is trivial, because you only need to call the destroy function to recover the balance. 

But that way is not easily demonstrable in code, and I suppose looking things up on etherscan is not really what this exercise wants to teach. So I think that the real point is to understand that new contract addresses are deterministic using a formula based on the address of the creating contract, and its transaction count at that point (in this case would be 1, as creation of the Recovery contract itself is transaction 0). 

I believe that CREATE2 uses a different formula to determine new addresses (which I believe uses a salt to to obscure the future address, as it can be a potential attack surface. If, for example, you were to calculate the future address of a contract, you could pre-fund that contract with ether before it was even created. For some contracts this could be an attack point). But etherscan will tell us that this contract was created with CREATE. 

### Takeaways

My takeaway from this is that (a) contract creations leave a trail on the blockchain, so the contracts are never 'lost' if you know where to look, and (b) more importantly, how to calculate the future address of a contract that hasn't yet been created. 

### Instructions
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [contracts/Recovery.sol](contracts/Recovery.sol) - Ethernaut contract
- [scripts/execute.js](scripts/execute.js) - Executes the solution 
- [test/RecoveryTest.js](test/RecoveryTest.js) - Unit tests 

