//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "./GatekeeperTwo.sol";

/**
 * Used only in unit tests, to test each gate individually. 
 */
contract GateTester is GatekeeperTwo {
    
    function testGateOne() public view gateOne returns (bool) {
        return true;
    }
    
    function testGateTwo() public view gateTwo returns (bool) {
        return true;
    }
    
    function testGateThree(bytes8 _gateKey) public view gateThree(_gateKey) returns (bool) {
        return true;
    }
}