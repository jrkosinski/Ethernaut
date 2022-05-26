// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Initializable.sol";
import "./Address.sol";

/**
 * The upgradeable logic delegate contract of Motorbike. 
 */
contract Engine is Initializable {
    // keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    address public upgrader;
    uint256 public horsePower;

    struct AddressSlot {
        address value;
    }

    /**
     * Initializer following the Initializable pattern. 
     */
    function initialize() external initializer {
        horsePower = 1000;
        upgrader = msg.sender;
    }

    /**
     * Upgrade the implementation of the proxy to `newImplementation` and subsequently 
     * execute the function call
     * @param _newImplementation address of delegate to which to upgrade implementation 
     * @param _data function signature and call data, to call new delegate's initializer function 
     */
    function upgradeToAndCall(address _newImplementation, bytes calldata _data) external payable {
        _authorizeUpgrade();
        _upgradeToAndCall(_newImplementation, _data);
    }

    /**
     * Restrict to upgrader role
     */
    function _authorizeUpgrade() internal view {
        require(msg.sender == upgrader, "Can't upgrade");
    }

    /**
     * Perform implementation upgrade with security checks for UUPS proxies, and additional 
     * setup call.
     * @param _newImplementation address of delegate to which to upgrade implementation 
     * @param _data function signature and call data, to call new delegate's initializer function 
     */
    function _upgradeToAndCall(
        address _newImplementation,
        bytes memory _data
    ) internal {
        // Initial upgrade and setup call
        _setImplementation(_newImplementation);
        if (_data.length > 0) {
            (bool success,) = _newImplementation.delegatecall(_data);
            require(success, "Call failed");
        }
    }
    
    /**
     * Stores a new address in the EIP1967 implementation slot.
     * @param _newImplementation address of delegate to which to upgrade implementation 
     */
    function _setImplementation(address _newImplementation) private {
        require(Address.isContract(_newImplementation), "ERC1967: new implementation is not a contract");
        
        AddressSlot storage slot = _getAddressSlot(_IMPLEMENTATION_SLOT);
        slot.value = _newImplementation;
    }
    
    /**
     * Gets the address slot in which the address of the upgrade delegate resides. 
     * @param _slot address of the memory slot reserved for the delegate address 
     * @return r the requested memory, as AddressSlot 
     */
    function _getAddressSlot(bytes32 _slot) internal pure returns (AddressSlot storage r) {
        assembly {
            r.slot := _slot  //TODO: how is this naming of r_slot working?
        }
    } 
}