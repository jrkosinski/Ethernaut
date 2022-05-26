// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/**
 * OBJECTIVES: 
 * - find the SimpleToken that was generated in the past from this contract 
 * - reduce the found SimpleToken contract's balance to zero
 */
contract Recovery {
    
    /**
     * Spawns a new SimpleToken contract with the given parameters. 
     * @param _name name of the token to generate 
     * @param _initialSupply initial token supply of the token to generate 
     */
    function generateToken(string memory _name, uint256 _initialSupply) public {
        new SimpleToken(_name, msg.sender, _initialSupply);
    }
}

/**
 * A simple token implementation, simplified from ERC20. 
 */
contract SimpleToken {
    using SafeMath for uint256;
    
    string public name;
    mapping (address => uint) public balances;

    /**
     * Constructor 
     * @param _name unique token name  
     * @param _creator token creator/owner
     * @param _initialSupply initial token supply 
     */
    constructor(string memory _name, address _creator, uint256 _initialSupply) {
        name = _name;
        balances[_creator] = _initialSupply;
    }

    /**
     * Collects ether in return for tokens. 
     */
    receive() external payable {
        balances[msg.sender] = msg.value.mul(10);
    }
    
    /**
     * Transfers ownership of tokens to a new address. 
     * @param _to the recipient to whom to transfer
     * @param _amount the number of tokens to transfer 
     */
    function transfer(address _to, uint _amount) public { 
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        balances[_to] = _amount;
    }

    /**
     * Self-destructs the token, passing all ether to the given address. 
     * @param _to the recipient of this contract's ether 
     */
    function destroy(address payable _to) public {
        selfdestruct(_to);
    }
}