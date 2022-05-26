// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * This timezone library fixes a bug in the original, which is that the memory slots are not arranged
 * correctly. In the original, memory would be overwritten (not the correct memory slot) by setTime. 
 */
contract FixedTimeLibrary {
    address private a;
    address private b;
    address private c;
    uint private storedTime;  

    /**
     * Sets the storedTime state variable. 
     * @param _time a timestamp 
     */
    function setTime(uint _time) public {
        storedTime = _time;
    }
}