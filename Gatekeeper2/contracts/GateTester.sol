//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "./GatekeeperTwo.sol";

/**
 * Used only in unit tests, to test each gate individually, in conjunection with GateTesterClient. 
 * GateTester plays the role of GatekeeperTwo, but allows each gate to be attempted separately. 
 */
contract GateTester is GatekeeperTwo {
    
    /**
     * Allows standalone test of gateOne modifier. 
     * @return true if gate condition passed. 
     */
    function testGateOne() public view gateOne returns (bool) {
        return true;
    }
    
    /**
     * Allows standalone test of gateTwo modifier. 
     * @return true if gate condition passed. 
     */
    function testGateTwo() public view gateTwo returns (bool) {
        return true;
    }
    
    /**
     * Allows standalone test of gateThree modifier. 
     * @param _gateKey the password attempt 
     * @return true if gate condition passed. 
     */
    function testGateThree(bytes8 _gateKey) public view gateThree(_gateKey) returns (bool) {
        return true;
    }
}