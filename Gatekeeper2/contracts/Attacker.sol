// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./GatekeeperTwo.sol";

/**
 * Attempts to pass all three gates from the constructor. 
 */
contract Attacker {
    bool public passed = false;
    
    constructor(address _addr) {        
        if (_addr != address(0)) {
            GatekeeperTwo gk = GatekeeperTwo(_addr); 
            
            //get a max value using underflow
            uint64 max64 = uint64(0);
            unchecked {
                max64--;
            }
            
            //create the value using bitwise arithmetic
            uint64 myAddr = uint64(bytes8(keccak256(abi.encodePacked(address(this))))); 
            uint64 value = (max64 ^ myAddr);
            
            //enter the value for gate3
            passed = gk.enter(bytes8(value));
        }
    }
}
