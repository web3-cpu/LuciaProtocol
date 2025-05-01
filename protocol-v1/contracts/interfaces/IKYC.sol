//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
interface IKYC {
    function getScore(address account) external view returns (uint256);
}
