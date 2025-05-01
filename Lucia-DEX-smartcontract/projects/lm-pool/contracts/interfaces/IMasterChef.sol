// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

interface IMasterChef {
    function nonfungiblePositionManager() external view returns (address);

    function getLatestPeriodInfo(address _pool) external view returns (uint256 LCIPerSecond, uint256 endTime);
}
