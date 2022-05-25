//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "./Force.sol";

/** 
 * Spawns a new Force contract. This is used in unit tests to demonstrate 
 * contract address prediction. 
 */
contract ForceFactory {
    address public contractAddress = address(0);
    
    /**
     * Spawns a new Force contract. 
     */
    function spawnContract() external {
        Force f = new Force(); 
        contractAddress = address(f); 
    }
}