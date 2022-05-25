//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 
import "hardhat/console.sol";

/**
 * OBJECTIVES: 
 * - become the owner of this contract 
 */
contract Delegation {
    address public owner;
    Delegate delegate;

    /**
     * Establishes a delegate whose functions will be called from the fallback. 
     * @param _delegateAddress address of delegate contract 
     */
    constructor(address _delegateAddress) {
        delegate = Delegate(_delegateAddress);
        owner = msg.sender;
    }

    /**
     * Unknown function signatures will be forwarded to delegate contract. 
     */
    fallback() external {
        (bool result,) = address(delegate).delegatecall(msg.data);
        if (result) {
            console.log("Delegation owner is %s ", owner);
            this;
        }
    }
}

/**
 * Delegate contract; will receive function calls from Delegation. 
 */
contract Delegate {
    address public owner;

    /**
     * Records contract owner. 
     * @param _owner address of contract owner 
     */
    constructor(address _owner) {
        owner = _owner;
    }

    /**
     * Sets the caller as new owner. 
     */
    function pwn() public {
        owner = msg.sender;
    }
}
