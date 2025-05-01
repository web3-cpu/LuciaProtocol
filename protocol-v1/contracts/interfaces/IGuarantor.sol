//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
interface IGuarantor {
    function getScore(address account) external view returns (uint256);
}
