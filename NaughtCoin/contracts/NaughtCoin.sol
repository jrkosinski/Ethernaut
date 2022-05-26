pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * OBJECTIVES: 
 * - transfer all of the tokens away from player; get player's token balance to 0
 */
contract NaughtCoin is ERC20 {

    // string public constant name = 'NaughtCoin';
    // string public constant symbol = '0x0';
    // uint public constant decimals = 18;
    uint public timeLock = block.timestamp + 10 * 365 days;
    uint256 public INITIAL_SUPPLY;
    address public player;

    /**
     * Transfers initial mint of tokens to player. 
     * @param _player address of the Ethernaut player  
     */
    constructor(address _player)  ERC20('NaughtCoin', '0x0')  {
        player = _player;
        INITIAL_SUPPLY = 1000000 * (10**uint256(decimals()));
        _mint(player, INITIAL_SUPPLY);
        emit Transfer(address(0), player, INITIAL_SUPPLY);
    }
    
    /**
     * Standard ERC20 transfer, but is timelocked.  
     * @param _to transfer recipient (see ERC20 transfer)
     * @param _value transfer amount of tokens  (see ERC20 transfer)
     * @return (bool) (see ERC20 transfer)
     */
    function transfer(address _to, uint256 _value) override public lockTokens returns (bool) {
        return super.transfer(_to, _value);
    }

    /**
     * Prevent the initial owner from transferring tokens until the timelock has passed
     */
    modifier lockTokens() {
        if (msg.sender == player) {
            require(block.timestamp > timeLock, "contract is locked");
            _;
        } else {
            _;
        }
    } 
} 