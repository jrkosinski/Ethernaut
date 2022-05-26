// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * OBJECTIVES: 
 * - get the 'locked' variable to be equal to false 
 */
contract Privacy {
    bool public locked = true;                              //stored in 0 slot 
    uint256 public ID = block.timestamp;                    //stored in 1 slot 
    uint8 private flattening = 10;                          //packed in 2 slot
    uint8 private denomination = 255;                       //packed in 2 slot
    uint16 private awkwardness = uint16(block.timestamp);   //packed in 2 slot
    bytes32[3] private data;                                //stored in 3, 4, and 5 slots 

    /**
     * Password is set and stored in array.
     * @param _data value of the data variable (like a password)
     */
    constructor(bytes32[3] memory _data) {
        data = _data; 
    }
    
    /**
     * Sets 'locked' to false if the password is correct.
     * @param _key should be equal to the first 16 bytes of the 'data' state variable
     */ 
    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }
}