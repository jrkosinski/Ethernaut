// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * Used in unit tests to test the behavior of Motorbike if given the address of a contract that 
 * does not implement an initialize() method. 
 */
contract NonInitializable {
    function moo() public pure returns (uint) {
        return 0;
    }
}