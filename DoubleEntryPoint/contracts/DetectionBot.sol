//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "./Forta.sol";
import "./CryptoVault.sol";
import "hardhat/console.sol";

/**
 * 
 */
contract DetectionBot is IDetectionBot {
    
    function handleTransaction(address _user, bytes calldata _msgData) external override  {
        IForta forta = IForta(msg.sender); 
        
//0x9cd1a121 - function signature 
//00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8  - recipient 
//0000000000000000000000000000000000000000000000056bc75e2d63100000  - amount 
//0000000000000000000000005f3f1dbd7b74c6b46e8c44f98792a1daf8d69154  - origSender
        
        //parse msg. data 
        bytes4 funcSig = 0;
        //bytes20 recip = 0;
        //bytes20 origSender = 0;
        //uint256 value = 0;
        bytes memory b = _msgData;
        
        assembly {
            funcSig := mload(add(b, 32))
            //recip := mload(add(b, 48))
            //value := mload(add(b, 68))
           //origSender := mload(add(b, 112))
        }
        
        //this signature is the normal transfer (not delegatedTransfer) function 
        // only normal transfer function is allowed 
        if (funcSig != 0xa9059cbb) {
            forta.raiseAlert(_user);
        } 
    }
}