// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./GatekeeperTwo.sol";
import "./GateTester.sol";

/**
 * Used only in unit tests, to test each gate individually. 
 */
contract GateTesterClient {
    bool public passed = false;
    
    constructor(address _addr, bool _testGate1, bool _testGate2) {     
        if (_addr != address(0)) {
            GateTester gt = GateTester(_addr);
            
            if (_testGate1 && _testGate2) {
                passed = gt.testGateOne() && gt.testGateTwo();
            }
            else {
                if (_testGate1) 
                    passed = gt.testGateOne();
                
                if (_testGate2) 
                    passed = gt.testGateTwo();
            }
        }   
    }
    
    function testGateThree(address _addr) public returns (bool) {
        GateTester gt = GateTester(_addr); 
        
        //get a max value using underflow
        uint64 max64 = uint64(0);
        unchecked {
            max64--;
        }
            
        uint64 myAddr = uint64(bytes8(keccak256(abi.encodePacked(address(this))))); 
        uint64 value = (max64 ^ myAddr);
            
        passed = gt.testGateThree(bytes8(value));
        return passed;
    }
}
