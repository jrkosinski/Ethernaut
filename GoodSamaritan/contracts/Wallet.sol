// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Coin.sol";
import "hardhat/console.sol"; 

contract Wallet {
    // The owner of the wallet instance
    address public owner;

    Coin public coin;

    error OnlyOwner();
    error NotEnoughBalance();

    modifier onlyOwner() {
        if(msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function donate10(address dest_) external onlyOwner {
        // check balance left
        console.log("wallet.donate10(%s)", dest_); 
        if (coin.balances(address(this)) < 10) {
            console.log("there is not enough"); 
            revert NotEnoughBalance();
        } else {
            console.log("there is enough"); 
            // donate 10 coins
            coin.transfer(dest_, 10);
        }
    }

    function transferRemainder(address dest_) external onlyOwner {
        // transfer balance left
        coin.transfer(dest_, coin.balances(address(this)));
    }

    function setCoin(Coin coin_) external onlyOwner {
        coin = coin_;
    }
}
