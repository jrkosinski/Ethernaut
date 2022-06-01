## Ethernaut Dex Two 

### Ethernaut Description 

This level will ask you to break DexTwo, a subtly modified Dex contract from the previous level, in a different way.

You need to drain all balances of token1 and token2 from the DexTwo contract to succeed in this level.

You will still start with 10 tokens of token1 and 10 of token2. The DEX contract still starts with 100 of each token.

**Things that might help:**
- How has the swap method been modified?
- Could you use a custom token contract in your attack?

### Solution 

This one is similar to Dex One, but the changes they've made to it make it actually simpler to complete. 

//TODO: elaborate

### Takeaways 
- wonky math (division) when liquidity is low results in unintended amounts (e.g. 0)
- trusting contracts to adhere faithfully to an interface 

### Instructions 
