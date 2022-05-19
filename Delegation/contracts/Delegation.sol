//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

/**
 * OBJECTIVES: 
 * - become the owner of this contract 
 */
contract Delegation {
    address public owner;
    Delegate delegate;

    constructor(address _delegateAddress) {
        delegate = Delegate(_delegateAddress);
        owner = msg.sender;
    }

    fallback() external {
        (bool result,) = address(delegate).delegatecall(msg.data);
        if (result) 
            this;
    }
}

contract Delegate {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function pwn() public {
        owner = msg.sender;
    }
}
