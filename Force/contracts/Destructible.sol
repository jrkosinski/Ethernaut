//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

contract Destructible {
    receive() external payable { }
    
    function destroy(address payable to) public {
        selfdestruct(to); 
    }
}