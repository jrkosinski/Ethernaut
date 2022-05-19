//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "./Force.sol";

contract ForceFactory {
    address public contractAddress = address(0);
    
    function spawnContract() external {
        Force f = new Force(); 
        contractAddress = address(f); 
    }
}