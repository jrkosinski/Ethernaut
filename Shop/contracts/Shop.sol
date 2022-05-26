pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

import "./IShop.sol";

/**
 * OBJECTIVES: 
 * - get Shop.price to equal 0 
 */
contract Shop is IShop {
    uint public price = 100;
    bool public isSold;

    /**
     * If you are a buyer, offer a price to buy a thing. 
     * Assumes that the sender is a Buyer contract. 
     */
    function buy() public {
        IBuyer buyer = IBuyer(msg.sender);

        if (buyer.price() >= price && !isSold) {
            isSold = true;
            price = buyer.price();
        }
    }
}