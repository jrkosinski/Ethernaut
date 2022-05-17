// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
 * OBJECTIVES: 
 * - get the 'locked' variable to be equal to false 
 */
contract Privacy {
    bool public locked = true;
    uint256 public ID = block.timestamp;
    uint8 private flattening = 10;
    uint8 private denomination = 255;
    uint16 private awkwardness = uint16(block.timestamp);
    bytes32[3] private data;

    /**
     * password is set and stored in array 
     */
    constructor(bytes32[3] memory _data) {
        data = _data;
    }
    
    /**
     * sets 'locked' to false if the password is correct.
     */
    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }
}