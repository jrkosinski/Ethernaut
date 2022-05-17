// SPDX-License-Identifier: MIT
pragma solidity <0.7.0;

//import "@openzeppelin/contracts/utils/Address.sol";
import "./Address.sol";
import "hardhat/console.sol";

/**
 * OBJECTIVES: 
 * - fit the Motorbike with an Engine that will self-destruct (or a self-destructed engine)
 */
contract Motorbike {
    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;
    
    struct AddressSlot {
        address value;
    }
    
    constructor(address _logicAddr) public {
        require(Address.isContract(_logicAddr), "ERC1967: new implementation is not a contract");
        AddressSlot storage slot = _getAddressSlot(_IMPLEMENTATION_SLOT);
        slot.value = _logicAddr;
        console.log("calling engine upgrade initialize with %s", msg.sender);
        (bool success,) = _logicAddr.delegatecall(abi.encodeWithSignature("initialize()")); 
        require(success, "Call failed");
    }
    
    // Delegates the current call to `implementation`.
    function _delegate(address implementation) internal virtual {
        assembly {
            calldatacopy(0, 0, calldatasize())  //copy bytes from calldata at position 0 to mem at position 0
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)  //store return value at mem 0
            returndatacopy(0, 0, returndatasize())  //copy return data to position 0? 
            
            switch result 
                case 0 {revert(0, returndatasize())}    //revert 
                default {return(0, returndatasize())}   //return actual return val
        }
    }
    
    fallback () external payable virtual {
        _delegate(_getAddressSlot(_IMPLEMENTATION_SLOT).value);
    }
    
    function _getAddressSlot(bytes32 slot) internal pure returns (AddressSlot storage r) {
        assembly {
            r_slot := slot  
        }
    } 
}