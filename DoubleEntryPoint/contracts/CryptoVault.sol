//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";


/**
 * Contract that stores various types of token, and provides a 'sweep' function 
 * to privileged address. 
 */
contract CryptoVault {
    address public sweptTokensRecipient;
    IERC20 public underlying;

    /**
     * Sets the recipient for the sweepTokens operation. 
     */
    constructor(address recipient) {
        sweptTokensRecipient = recipient;
    }

    /**
     * The underlying token can be set only once. 
     */
    function setUnderlying(address latestToken) public {
        require(address(underlying) == address(0), "Already set");
        underlying = IERC20(latestToken);
    }

    /*
    ...
    */

    /**
     * Retrieve tokens stuck in a contract. Only the underlying token can't be swept.
     * Note that this function is not privileged in any way; anyone can call it, but 
     * the tokens are always swept to the privileged address only. 
     */
    function sweepToken(IERC20 token) public {
        require(token != underlying, "Can't transfer underlying token");
        token.transfer(sweptTokensRecipient, token.balanceOf(address(this)));
    }
}
