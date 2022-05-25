# Ethernaut
## Solutions and Explanations to OpenZeppelin's Ethernaut puzzles (work in progress) 

OpenZeppelin's [Ethernaut](https://ethernaut.openzeppelin.com/) is a great place to start looking for a crash course in Ethereum smart contract security practices. It covers many common Solidity and EVM attack points, presented in a game format. Many of the puzzles have been directly inspired by real-life smart contract hacks that have taken place in the past. 

For each one, I've tried to make the solution as clear as possible, providing: 
- the original Solidity code provided by Ethernaut 
- any additional smart contract code (where needed) 
- solution client in javascript code 
- unit tests that further elaborate usage 
- some explanation and comments on the solution & takeaways 

I hope you enjoy. 

### Tools & Setup 

**Hardhat** 
I've used [hardhat](https://hardhat.org/) with waffle and ethers as a development and testing interface. It's a good easy to use platform, easy to set up. If you will be using a different platform (e.g. Truffle), you will need to make necessary changes to the client scripts. 
I recommend [hardhat](https://hardhat.org/). [Learn about how to set it up and work with it here](https://hardhat.org/tutorial/). 

**Alchemy API**
The exercises must be completed on the rinkeby network. I've used an [Alchemy](https://www.alchemy.com/) account - a common Web3 provider. If you use a different Web3 provider to access the rinkeby network, you will need to reflect that in your hardhat.config.js file for each exercise. If you are using Alchemy API, you will need to enter your API key into the hardhat.config.js file for each exercise. And regardless, you will need to enter your rinkeby private key into the hardhat.config.js files. 

To recap: 
- if using Alchemy API, fill in your API key into the hardhat.config.js file for each exercise 
- fill in your Rinkeby private key into the hardhat.config.js file for each exercise 
- if using a different Web3 provider, update your hardhat.config.js files accordingly 

**Metamask**
I use [Metamask](https://metamask.io/) as a browser wallet. You will need to set up a browser wallet to use Ethernaut. 


### List of Exercises 
Note that this repo is still a work in progress. Only completed exercises are uploaded. 

- [Fallback](https://github.com/jrkosinski/Ethernaut/tree/main/Fallback) 
- [Fallout](https://github.com/jrkosinski/Ethernaut/tree/main/Fallout) 
- [Telephone](https://github.com/jrkosinski/Ethernaut/tree/main/Telephone) 
- [Token](https://github.com/jrkosinski/Ethernaut/tree/main/Token) 
- [Force](https://github.com/jrkosinski/Ethernaut/tree/main/Force) 
- [Vault](https://github.com/jrkosinski/Ethernaut/tree/main/Vault) 
- [Reentrancy](https://github.com/jrkosinski/Ethernaut/tree/main/Reentrancy) 
- [Elevator](https://github.com/jrkosinski/Ethernaut/tree/main/Elevator) 
- [Privacy](https://github.com/jrkosinski/Ethernaut/tree/main/Privacy) 
- [Gatekeeper2](https://github.com/jrkosinski/Ethernaut/tree/main/Gatekeeper2) 
- [NaughtCoin](https://github.com/jrkosinski/Ethernaut/tree/main/NaughtCoin) 
- [Preservation](https://github.com/jrkosinski/Ethernaut/tree/main/Preservation) 
- [Recovery](https://github.com/jrkosinski/Ethernaut/tree/main/Recovery) 
- [Denial](https://github.com/jrkosinski/Ethernaut/tree/main/Denial) 
- [Shop](https://github.com/jrkosinski/Ethernaut/tree/main/Shop) 
- [Dex2](https://github.com/jrkosinski/Ethernaut/tree/main/Dex2) 
- [Motorbike](https://github.com/jrkosinski/Ethernaut/tree/main/Motorbike) 
- [DoubleEntryPoint](https://github.com/jrkosinski/Ethernaut/tree/main/DoubleEntryPoint) 

