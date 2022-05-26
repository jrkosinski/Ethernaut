// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/**
 * OBJECTIVES: 
 * - prevent the contract owner from being able to withdraw the funds
 *      (while the contract still has funds, and the transaction is of 1M gas or less)
 */
contract Denial {
    using SafeMath for uint256;
    address public partner; // withdrawal partner - pay the gas, split the withdraw
    address payable public owner;
    uint timeLastWithdrawn;
    mapping(address => uint) withdrawPartnerBalances; // keep track of partners balances
    
    /**
     * Sets the contract creator as the owner. 
     */
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * Sets the partner storage variable. 
     * @param _partner the address value to set. 
     */
    function setWithdrawPartner(address _partner) public {
        partner = _partner;
    }

    /**
     * Withdraw 1% to recipient and 1% to owner.
     */
    function withdraw() public {
        uint amountToSend = address(this).balance.div(100);
        // perform a call without checking return
        // The recipient can revert, the owner will still get their share
        partner.call{value:amountToSend}("");
        owner.transfer(amountToSend);
        // keep track of last withdrawal time
        timeLastWithdrawn = block.timestamp;
        withdrawPartnerBalances[partner] = withdrawPartnerBalances[partner].add(amountToSend);
    }

    /**
     * Allow deposit of funds.
     */
    receive() external payable {}

    /**
     * Gets the ether balance of this contract. 
     * @return (uint) the balance in wei. 
     */
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}