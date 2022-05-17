// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/**
 * OBJECTIVES: 
 * - get the contract's balance to 0
 */
contract Reentrancy {    
    using SafeMath for uint256;
    mapping(address => uint) public balances;

    /**
     * Pays into the contract, and records the payment amount.
     */
    function donate(address _to) public payable {
        balances[_to] = balances[_to].add(msg.value);
    }

    /**
     * Returns the amount donated by the given address. 
     */
    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    /**
     * Allows a caller to withdraw up to and including the cumulative amount that they've donated. 
     */
    function withdraw(uint _amount) public {
        if(balances[msg.sender] >= _amount) {
            (bool result,) = msg.sender.call{value:_amount}("");    //calls to foreign entity
            if(result) {
                _amount;
            }
            
            balances[msg.sender] -= _amount;
        }
    }

    /**
     * Empty receive() function. 
     */
    receive() external payable {}
}