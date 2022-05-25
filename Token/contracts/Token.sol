//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

/**
 * OBJECTIVES: 
 * - claim all available tokens for your own 
 */
contract Token {
    mapping(address => uint) balances;
    uint public totalSupply;

    /**
     * Sets the initial supply of the contract creator, and the totalSupply. 
     * @param _initialSupply the initial supply of tokens to mint 
     */
    constructor(uint _initialSupply) {
        balances[msg.sender] = totalSupply = _initialSupply;
    }

    /**
     * Transfers ownership of the specified number of tokens. 
     * @param _to recipient address
     * @param _value number of tokens to transfer 
     * @return (bool) true if successful 
     */
    function transfer(address _to, uint _value) public returns (bool) {
        unchecked  {
            require(balances[msg.sender] - _value >= 0);
            balances[msg.sender] -= _value;
            balances[_to] += _value;
        }
        return true;
    }

    /**
     * Indicates the number of tokens owner by the given address.
     * @param _owner the address in question 
     * @return balance (uint) the number of tokens owner by the given address
     */
    function balanceOf(address _owner) public view returns (uint balance) {
        return balances[_owner];
    }
}