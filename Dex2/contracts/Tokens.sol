// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 */
contract AToken is ERC20 { 
    constructor() ERC20("Alpha Token", "ATK") {
        _mint(msg.sender, 1000000000);
    }
}

/**
 */
contract BToken  is ERC20 {
    constructor() ERC20("Bravo Token", "BTK") {
        _mint(msg.sender, 1000000000);
    }
}


/**
 */
contract AttackToken  is IERC20 {
    uint256 private _balance = 1000000000; 
    
    constructor() {
    }
    
    function setBalance(uint256 _bal) public {
        _balance = _bal;
    }
    
    function balanceOf(address /* addr */) public view override returns (uint256) {
        return _balance;
    }
    
    function totalSupply() external override pure returns (uint256)
    {
        return 1000000000;
    }
    function transfer(address, uint256) external override pure returns (bool)
    {
        return true;
    }
    function allowance(address, address) external override pure returns (uint256)
    {
        return 1000000000;
    }
    function approve(address, uint256) external override pure returns (bool)
    {
        return true;
    }
    function transferFrom(address, address, uint256) external override pure returns (bool)
    {
        return true;
    }
}