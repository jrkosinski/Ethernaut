pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

interface Buyer {
    function price() external view returns (uint);
}

/**
 * OBJECTIVES: 
 * - get Shop.price to equal 0 
 */
contract Shop {
    uint public price = 100;
    bool public isSold;

    /**
     * Assumes that the sender is a Buyer contract. 
     */
    function buy() public {
        Buyer _buyer = Buyer(msg.sender);

        if (_buyer.price() >= price && !isSold) {
            isSold = true;
            price = _buyer.price();
        }
    }
}