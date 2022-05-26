//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

/**
 * In the constructor, creates an extremely simple and small contract. 
 */
contract MagicNumberSolver {
    constructor() {
        assembly {
            mstore(0, 0x602a60005260206000f3)
            return(0x16, 0x0a)
        }
    }
}