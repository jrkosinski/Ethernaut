// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Wallet.sol";
import "./Coin.sol";
import "hardhat/console.sol";

contract GoodSamaritan {
    Wallet public wallet;
    Coin public coin;

    constructor() {
        wallet = new Wallet();
        coin = new Coin(address(wallet));

        wallet.setCoin(coin);
    }

    function requestDonation() external returns(bool enoughBalance){
        // donate 10 coins to requester
        console.log("gs.requestDonation()"); 
        try wallet.donate10(msg.sender) {
            return true;
        } catch (bytes memory err) {
            if (keccak256(abi.encodeWithSignature("NotEnoughBalance()")) == keccak256(err)) {
                // send the coins left
                wallet.transferRemainder(msg.sender);
                return false;
            }
            else {
                console.logBytes32(keccak256(err)); 
            }
        }
    }
}