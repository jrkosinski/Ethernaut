//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

/**
 * OBJECTIVES: 
 * get the 'locked' property to be equal to false 
 */
contract Vault {
    bool public locked;
    bytes32 private password;

    /**
     * Sets the password, which cannot then be changed. 
     * @param _password the password value 
     */
    constructor(bytes32 _password) {
        locked = true;
        password = _password;
    }

    /**
     * If the password matches, sets the locked variable to false. 
     * @param _password the password attempt 
     */
    function unlock(bytes32 _password) public {
        if (password == _password) {
            locked = false;
        }
    }
}