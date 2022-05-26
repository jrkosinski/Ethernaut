pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

import "./IShop.sol";

/**
 * Legitimate buyer, for use in unit testing. 
 */
contract TestBuyer is IBuyer {
    uint private offerPrice = 0;
    
    /**
     * Offers a fair price. 
     */
    function price() external override view returns (uint)  {
        return offerPrice;
    }
    
    /**
     * Legitimately buys a thing. 
     * @param _shop The target Shop contract from which to buy
     * @param _offerPrice The price to offer for the thing 
     * @return (bool) true if successfully bought/sold 
     */
    function buy(address _shop, uint _offerPrice) public returns (bool) {
        offerPrice = _offerPrice;
        IShop shop = IShop(_shop);
        shop.buy();
        return shop.isSold();
    }
}