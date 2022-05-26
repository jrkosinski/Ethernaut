// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * OBJECTIVES: 
 * create a contract to return the number 42 in 10 opcodes or less 
 */
contract MagicNumber {
    address public solver;

    /**
     * Sets the address of the 'solver' contract to satisfy the victory condition. 
     * @param _solver the address of the contract 
     */
    function setSolver(address _solver) public {
        solver = _solver;
    }
}