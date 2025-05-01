//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
interface ICredProtocol {
    function getScore(address account) external view returns (uint256);
}
