//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

/**
 * OBJECTIVES: 
 * - become the owner of the contract 
 */
contract Telephone {
    address public owner;

    /**
     * Sets the contract creator as owner. 
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * Changes the owner if tx.origin != msg.sender. 
     * @param _owner the address of new owner 
     */
    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}