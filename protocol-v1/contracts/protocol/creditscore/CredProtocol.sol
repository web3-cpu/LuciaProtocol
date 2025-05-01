// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../../interfaces/ICredProtocol.sol";

contract CredProtocol is ICredProtocol { 
    constructor(){}

    function getScore(address account) external override view returns (uint256) {
        return 0;
    }
}
