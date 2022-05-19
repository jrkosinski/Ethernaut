// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * OBJECTIVES: 
 * - drain all balances of token1 & token2 from the Dex. 
 */
contract Dex is Ownable {
    using SafeMath for uint;
    address public token1;
    address public token2;
    
    constructor()  {
    }
    
    function setTokens(address _token1, address _token2) public onlyOwner {
        token1 = _token1;
        token2 = _token2;
    }

    function swap(address from, address to, uint amount) public {
        require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
        
        //get price
        uint swap_amount = getSwapAmount(from, to, amount);
        
        //transfer 'from' coin to DEX 
        IERC20(from).transferFrom(msg.sender, address(this), amount);
        
        //approve DEX as spender for 'to' coin 
        IERC20(to).approve(address(this), swap_amount);
        
        //transfer 'to' coin to sender 
        IERC20(to).transferFrom(address(this), msg.sender, swap_amount);
    }

    function add_liquidity(address token_address, uint amount) public{
        IERC20(token_address).transferFrom(msg.sender, address(this), amount);
    }

    function getSwapAmount(address from, address to, uint amount) public view returns(uint) {
        return((amount * IERC20(to).balanceOf(address(this)))/IERC20(from).balanceOf(address(this)));
    }

    function approve(address spender, uint amount) public {
        SwappableTokenTwo(token1).approve(spender, amount);
        SwappableTokenTwo(token2).approve(spender, amount);
    }

    function balanceOf(address token, address account) public view returns (uint){
        return IERC20(token).balanceOf(account);
    }
}

contract SwappableTokenTwo is ERC20 {
    constructor(string memory name, string memory symbol, uint initialSupply)  ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}