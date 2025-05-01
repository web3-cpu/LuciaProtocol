// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Score is Ownable {
    struct ScoreData {
        bool zkVerified;
        uint256 kycScore;
        uint256 initScore;
        uint256 guarantorScore;
        uint256 totalBorrowed;
        uint256 totalRepaid;
        uint256 totalCollateral;
    }

    uint256 internal creditScore;

    function onBorrow(address account, uint256 value) external virtual;
    function onRepay(address account, uint256 value) external virtual;
    function onIncreaseCollateral(address account, uint256 value) external virtual;
    function onDecreaseCollateral(address account, uint256 value) external virtual;

    function score(address account) external view virtual returns (uint256);

    // Helper methods
    function zkVerify(address account) external virtual;
}
