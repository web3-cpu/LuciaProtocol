// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../../interfaces/IKYC.sol";

contract KYC is IKYC { 
    constructor(){}

    function getScore(address account) external override view returns (uint256) {
        return 0;
    }
}
