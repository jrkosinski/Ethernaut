// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./GatekeeperTwo.sol";
import "./GateTester.sol";

/**
 * Used only in unit tests, to test each gate individually, in conjunction with GateTester. 
 * GateTesterClient calls GateTester, which 'plays the role' of GatekeeperTwo, except that it
 * allows each gate to be attempted individually. 
 */
contract GateTesterClient {
    bool public passed = false;
    
    /**
     * Has the ability to test gates 1 and 2 separately or together, in conjunction with the 
     * GateTester contract. 
     * @param _gateTesterAddr the address of the GateTester contract
     * @param _testGate1 if true, gate 1 will be tested in this constructor 
     * @param _testGate2 if true, gate 2 will be tested in this constructor 
     */
    constructor(address _gateTesterAddr, bool _testGate1, bool _testGate2) {     
        if (_gateTesterAddr != address(0)) {
            GateTester gt = GateTester(_gateTesterAddr);
            
            //test gates 1 & 2 together
            if (_testGate1 && _testGate2) {
                passed = gt.testGateOne() && gt.testGateTwo();
            }
            else {
                //test gate 1 separately
                if (_testGate1) 
                    passed = gt.testGateOne();
                
                //test gate 2 separately
                if (_testGate2) 
                    passed = gt.testGateTwo();
            }
        }   
    }
    
    /**
     * Tests gate3; this one is more convenient to test outside of the constructor. 
     * @param _gateTesterAddr the address of the GateTester contract
     * @return (bool) true if successfully passed gate 3 
     */
    function testGateThree(address _gateTesterAddr) public returns (bool) {
        GateTester gt = GateTester(_gateTesterAddr); 
        
        //get a max value using underflow
        uint64 max64 = uint64(0);
        unchecked {
            max64--;
        }
        
        //encode the value with address 
        uint64 myAddr = uint64(bytes8(keccak256(abi.encodePacked(address(this))))); 
        uint64 value = (max64 ^ myAddr);
        
        //attempt to pass the gate 
        passed = gt.testGateThree(bytes8(value));
        return passed;
    }
}
