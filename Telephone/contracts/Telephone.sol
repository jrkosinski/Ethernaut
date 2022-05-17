//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "hardhat/console.sol";

/**
 * OBJECTIVES: 
 * - become the owner of the contract 
 */
contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    /**
     * Changes the owner if tx.origin != msg.sender. 
     */
    function changeOwner(address _owner) public {
        console.log("%s and %s", tx.origin, msg.sender);
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}