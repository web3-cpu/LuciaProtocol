// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./CreditScore.sol";

contract CreditScoreV2 is CreditScore {    
    // New function for upgraded contract
    function getContractVersion() external view returns (uint256) {
        return 2;
    }
}
