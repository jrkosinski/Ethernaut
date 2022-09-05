## Ethernaut: Magic Number

### Ethernaut Description
To solve this level, you only need to provide the Ethernaut with a Solver, a contract that responds to whatIsTheMeaningOfLife() with the right number.

Easy right? Well... there's a catch.

The solver's code needs to be really tiny. Really reaaaaaallly tiny. Like freakin' really really itty-bitty tiny: 10 opcodes at most.

Hint: Perhaps its time to leave the comfort of the Solidity compiler momentarily, and build this one by hand O_o. That's right: Raw EVM bytecode.

Good luck!

### Solution 
Of course, the contract is expected to return 42 in response to whatIsTheMeaningOfLife(). However, the instructions did not say that _only_ this call must result in 42. 

//TODO: elaborate & format 
opcodes: 
`60 2a `

`60 00 `

`52 `

`60 20 `

`60 00 `

`f3 `

assembly: 

`opcode  code    arg     stack`

`---------------------------------`

`0x60    PUSH1   2a      [2a]        //push 1 byte 2a onto stack`

`0x60    PUSH1   00      [00][2a]    //push 1 byte 00 onto stack `

`0x52    MSTORE                      //store value 2a at memory offset 00`

`0x60    PUSH1   20      [20]        //push 1 byte 20 onto stack`

`0x60    PUSH1   00      [00][20]    //push 1 byte 00 onto stack`

`0xf3    RETURN                      //return 0x20 bytes from memory 00    `

Note that this does not actually create a function. Any call to any function will result in this code being executed and the same value being returned. This is demonstrated in unit tests. 

### Takeaways
Magic can be done using assembly, that cannot be accomplished in a higher level language. Not all languages allow you to include inline assembly as a block within higher-level code, but Solidity does (as of version 0.3.something). 

### Instructions
- Compile 
- In [scripts/execute.js](scripts/execute.js), set the contractAddr variable's value with Ethernaut's contract.address. 
- Run [scripts/execute.js](scripts/execute.js) in hardhat (rinkeby network)

`> npx hardhat run scripts/execute.js --network rinkeby`

### Files of Note
- [contracts/MagicNumber.sol](contracts/MagicNumber.sol) - Ethernaut contract 
- [contracts/MagicNumberSolver.sol](contracts/MagicNumberSolver.sol) - Code to deploy the solver 
- [scripts/execute.js](scripts/execute.js) - Executes the solution 
- [test/MagicNumberTest.js](test/MagicNumberTest.js) - Unit tests 
