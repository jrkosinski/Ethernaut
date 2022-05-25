//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

interface DelegateERC20 {
    function delegateTransfer(address to, uint256 value, address origSender) external returns (bool);
}