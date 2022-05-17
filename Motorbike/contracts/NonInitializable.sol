// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract NonInitializable {
    function moo() public pure returns (uint) {
        return 0;
    }
}