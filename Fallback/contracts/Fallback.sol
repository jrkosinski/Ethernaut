pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/**
 * OBJECTIVES: 
 * - become the owner 
 * - drain the balance of the contract to 0
 */
contract Fallback {
    using SafeMath for uint256;
    
    mapping(address => uint) public contributions;
    address payable public owner;

    /**
     * Sets the owner and initializes contributions. 
     */
    constructor() {
        owner = payable(msg.sender);
        contributions[msg.sender] = 1000 * (1 ether);
    }

    /**
     * Homespun Ownable pattern modifier (a la OpenZeppelin Ownable). Enforces the role 
     * as owner (only) 
     */
    modifier onlyOwner {
            require(
                msg.sender == owner,
                "caller is not the owner"
            );
            _;
        }

    /**
     * Pay into the contract. Contribution must be below a maximum. If you are the highest
     * contributor, you become the owner. 
     */
    function contribute() public payable {
        require(msg.value < 0.001 ether, "Contribution must be below min");
        
        contributions[msg.sender] += msg.value;
        if(contributions[msg.sender] > contributions[owner]) {
            owner = payable(msg.sender);
        }
    }

    /**
     * Returns the latest contribution amount of msg.sender. 
     * @return uint the contribution amount 
     */
    function getContribution() public view returns (uint) {
        return contributions[msg.sender];
    }

    /**
     * Owner may withdraw all available funds. 
     */
    function withdraw() public onlyOwner {
        owner.transfer(address(this).balance);
    }

    /**
     * Accepts payment; if your contribution is higher than that of msg.sender, you become 
     * the owner (alternate way to become owner)
     */
    receive() external payable {
        require(msg.value > 0 && contributions[msg.sender] > 0);
        owner = payable(msg.sender);
    }
}