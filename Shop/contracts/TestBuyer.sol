pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

interface IShop {
    function buy() external;
    function isSold() external returns (bool);
}

/**
 * Legitimate buyer, for use in unit testing. 
 */
contract TestBuyer {
    uint private offerPrice = 0;
    
    /**
     * Offers a fair price. 
     */
    function price() external view returns (uint)  {
        return offerPrice;
    }
    
    /**
     * 
     */
    function buy(address _shop, uint _offerPrice) public returns (bool) {
        offerPrice = _offerPrice;
        IShop shop = IShop(_shop);
        shop.buy();
        return shop.isSold();
    }
}