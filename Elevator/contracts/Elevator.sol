//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Building.sol";

/**
 * OBJECTIVES: 
 * - get the 'top' property to return 'true'
 */
contract Elevator {
    bool public top;
    uint public floor;
    
    /**
     * 'Moves' to a floor. Note that the elevator seems to refuse to go to the top floor. 
     * But will set 'top' equal to true if it ever does. 
     * @param _floor the floor we want to go to 
     */
    function goTo(uint _floor) public { 
        Building building = Building(msg.sender);

        if (! building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}