// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * OBJECTIVES: 
 * - become the owner of the contract
 */
contract Preservation {
    // public library contracts 
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner; 
    uint storedTime;
    
    // Sets the function signature for delegatecall
    bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

    /**
     * Both timezone libraries specified here.
     * @param _timeZone1LibraryAddress address of the first timezone library contract
     * @param _timeZone2LibraryAddress address of the second timezone library contract
     */
    constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) public {
        timeZone1Library = _timeZone1LibraryAddress; 
        timeZone2Library = _timeZone2LibraryAddress; 
        owner = msg.sender;
    }
    
    /**
     * Set the time for timezone 1.
     * @param _timeStamp a timestamp 
     */
    function setFirstTime(uint _timeStamp) public {
        timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
    }

    /**
     * Set the time for timezone 2.
     * @param _timeStamp a timestamp 
     */
    function setSecondTime(uint _timeStamp) public {
        timeZone2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
    }
}

/**
 * Simple library contract to set the time
 */
contract LibraryContract {

    // stores a timestamp 
    uint storedTime;  

    /**
     * Sets the storedTime state variable. 
     * @param _time a timestamp 
     */
    function setTime(uint _time) public {
        storedTime = _time;
    }
}