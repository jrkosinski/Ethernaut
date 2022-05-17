pragma solidity <0.7.0;

contract Initializable {
    bool private initialized;
    bool private initializing;
    
    modifier initializer() { 
        require(initializing || isConstructor() || !initialized, "Contract instance has already been initialized");
        
        bool isTopLevelCall = !initializing;
        if (isTopLevelCall) {
            initializing = true;
            initialized = true;
        }
        
        _;
        
        if (isTopLevelCall) {
            initializing = false;
        }
    }
    
    function isConstructor() private view returns (bool) {
        address self = address(this);
        uint256 cs;
        assembly { cs := extcodesize(self) }    //in constructor code size is 0
        return (cs == 0);
    }
    
    uint256[50] private ______gap;
}