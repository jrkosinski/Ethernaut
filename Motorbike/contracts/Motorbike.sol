// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Address.sol";

/**
 * OBJECTIVES: 
 * - fit the Motorbike with an Engine that will self-destruct (or a self-destructed engine)
 */
contract Motorbike {
    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;
    
    struct AddressSlot {
        address value;
    }
    
    /**
     * Address for logic delegate is required to be a contract; immediately its initialize() 
     * function is called by delegatecall. 
     * @param _logicAddr the address of this proxy's logical implementation
     */
    constructor(address _logicAddr) {
        require(Address.isContract(_logicAddr), "ERC1967: new implementation is not a contract");
        AddressSlot storage slot = _getAddressSlot(_IMPLEMENTATION_SLOT);
        slot.value = _logicAddr;
        (bool success,) = _logicAddr.delegatecall(abi.encodeWithSignature("initialize()")); 
        require(success, "Call failed");
    }
    
    /**
     * Delegates the current call to `implementation`.
     * @param _implementation address of implementation contract to delegatecall. 
     */
    function _delegate(address _implementation) internal virtual {
        assembly {
            calldatacopy(0, 0, calldatasize())  //copy bytes from calldata at position 0 to mem at position 0
            let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)  //store return value at mem 0
            returndatacopy(0, 0, returndatasize())  //copy return data to position 0? 
            
            switch result 
                case 0 {revert(0, returndatasize())}    //revert 
                default {return(0, returndatasize())}   //return actual return val
        }
    }
    
    /**
     * Fallback forwards the call to logic delegate. 
     */
    fallback () external payable virtual {
        _delegate(_getAddressSlot(_IMPLEMENTATION_SLOT).value);
    }
    
    /**
     * Gets the address slot in which the address of the logic delegate resides. 
     * @param _slot address of the memory slot reserved for the delegate address 
     * @return r the requested memory, as AddressSlot 
     */
    function _getAddressSlot(bytes32 _slot) internal pure returns (AddressSlot storage r) {
        assembly {
            r.slot := _slot  
        }
    } 
}