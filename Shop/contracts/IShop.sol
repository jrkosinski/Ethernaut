pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

/**
 * Interface for convenience, to the Shop contract. 
 */
interface IShop {
    /**
     * If you are a buyer, offer a price to buy a thing. 
     */
    function buy() external;
    
    /**
     * Returns true if the thing was successfully sold.
     * @return (bool) 
     */
    function isSold() external returns (bool);
}

/**
 * Interface for a buyer. 
 */
interface IBuyer {
    /**
     * Gets the buyer's offer price. 
     * @return (uint) a price. 
     */
    function price() external view returns (uint);
}
