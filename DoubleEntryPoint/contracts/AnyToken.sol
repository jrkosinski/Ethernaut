//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Forta.sol";

contract AnyToken is ERC20("AnyToken", "ANY"), Ownable {
    Forta public forta;
    address public player;
    
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
    
    function setForta(address _fortaAddress) public {
        forta = Forta(_fortaAddress);
        player = msg.sender;
    }
    
    modifier fortaNotify() {
        address detectionBot = address(forta.usersDetectionBots(player));

        // Cache old number of bot alerts
        uint256 previousValue = forta.botRaisedAlerts(detectionBot);

        // Notify Forta
        forta.notify(player, msg.data);

        // Continue execution
        _;

        // Check if alarms have been raised
        if(forta.botRaisedAlerts(detectionBot) > previousValue) revert("Alert has been triggered, reverting");
    }
    
    function transfer(address _to, uint256 _value) public override fortaNotify returns (bool) {
        _transfer(msg.sender, _to, _value);
        return true;
    }
}
