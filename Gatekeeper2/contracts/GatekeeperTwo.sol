//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

/**
 * OBJECTIVES: 
 * - pass all the gates to set the 'entrant' property 
 */
contract GatekeeperTwo {
    address public entrant;

    /**
     * Requires tx.origin to be different from msg.sender, so call from a contract.
     */
    modifier gateOne() {
        require(msg.sender != tx.origin, "gate 1");
        _;
    }

    /**
     * Requires codesize to be zero, so call from contract constructor. 
     */
    modifier gateTwo() {
        uint x;
        assembly { x := extcodesize(caller()) }
        require(x == 0, "gate 2");
        _;
    }

    /**
     * Requires the value passed in to be a specific bitwise transformation of an 8-byte portion
     * of the sender's address.
     */
    modifier gateThree(bytes8 _gateKey) {
        unchecked {
            require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1, "gate 3");
        }
        _;
    }

    /**
     * Will set entrant if all three gates are passed. 
     */
    function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}