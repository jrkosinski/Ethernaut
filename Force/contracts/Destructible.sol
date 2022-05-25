//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

/**
 * The functioning of this contract is to receive ether, and then to be self-destructed 
 * into a specified address. 
 */
contract Destructible {
    receive() external payable { }
    
    /**
     * Self-destructs the contract, forwarding all funds to the specified address. 
     * @param _to the address to which to send funds 
     */
    function destroy(address payable _to) public {
        selfdestruct(_to); 
    }
}