## DoubleEntryPoint

### Ethernaut Description
This level features a CryptoVault with special functionality, the sweepToken function. This is a common function to retrieve tokens stuck in a contract. The CryptoVault operates with an underlying token that can't be swept, being it an important core's logic component of the CryptoVault, any other token can be swept.

The underlying token is an instance of the DET token implemented in DoubleEntryPoint contract definition and the CryptoVault holds 100 units of it. Additionally the CryptoVault also holds 100 of LegacyToken LGT.

In this level you should figure out where the bug is in CryptoVault and protect it from being drained out of tokens.

The contract features a Forta contract where any user can register its own detection bot contract. Forta is a decentralized, community-based monitoring network to detect threats and anomalies on DeFi, NFT, governance, bridges and other Web3 systems as quickly as possible. Your job is to implement a detection bot and register it in the Forta contract. The bot's implementation will need to raise correct alerts to prevent potential attacks or bug exploits.

**Things that might help:**
- How does a double entry point work for a token contract ?

### Solution 
They want you to first find out what attack(s) are possible, then use the Forta detection bot pattern provided, to prevent it/them. 

Regardless of whatever else you might find, there is actually only one thing that the level is looking for. And that is The fact that while you cannot call sweepToken and pass the address of DET token (the call will revert with the appropriate error), you can circumvent the restriction by calling it with the address of LGT. 

You are supposed to fix the issue using a Forta DetectionBot (CryptoVault has a Forta contract address; you must call its setDetectionBot function and pass in the address of a contract which implements IDetectionBot). 

What you do _in_ the DetectionBot's handleTransaction method is what will solve the problem. Since you have limited data available to you here in this function, you can't prevent the issue as directly as you'd like (for example, if you had the address of the token being transferred, you could do a check to see that it is the true underlying token of CryptoVault. But you can't do that.) Using what's available, you can solve the problem by ensuring that it's the _transfer_ method being called, not the _delegateTransfer_ method. 

You can do that by examining the msgData. The first 4 bytes will be the method signature. So in doing this you will exclude transfers of any delegated token that implements DelegateERC20. 

### Takeaways
This is a better exercise than the others in that it's a more realistic scenario. It's more realistic in that: 

a) there's a bunch of interacting contracts, creating the "noise" (unrelated to the specific problem) that's closer to what you'd see in real life, 

b) the type of problem you're looking for is not explicitly given or clued, and 

c) you're responsible not just for finding the problem, but for fixing it as well. 

### Instructions
- compile 
- enter the DoubleEntryPoint contract address (from Ethernaut) into execute.js
- run scripts/execute.js
