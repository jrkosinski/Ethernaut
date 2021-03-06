// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/**
 * OBJECTIVES: 
 * - claim ownership of the contract 
 * - drain (steal) the contract's funds 
 */
contract Fallout {
    using SafeMath for uint256;
    mapping (address => uint) allocations;
    address payable public owner;


    /* constructor? */
    function Fal1out() public payable {
        owner = payable(msg.sender);
        allocations[owner] = msg.value;
    }

    modifier onlyOwner {
                require(
                    msg.sender == owner,
                    "caller is not the owner"
                );
                _;
            }

    /**
     * Pays into the contract, and records the cumulative payment for the sender.
     */
    function allocate() public payable {
        allocations[msg.sender] = allocations[msg.sender].add(msg.value);
    }

    /**
     * Sends the given allocator's allocations back to the original address.
     * @param _allocator address of the allocator
     */
    function sendAllocation(address payable _allocator) public {
        require(allocations[_allocator] > 0);
        _allocator.transfer(allocations[_allocator]);
    }

    /**
     * Only the owner may receive the entire balance of this contract.
     */
    function collectAllocations() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    /**
     * Gets the total cumulative amount of the given allocator's allocations. 
     * @param _allocator address of the allocator
     */
    function allocatorBalance(address _allocator) public view returns (uint) {
        return allocations[_allocator];
    }
}