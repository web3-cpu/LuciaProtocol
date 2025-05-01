// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ILuciaPool.sol";
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(ILuciaPool pool) external returns (ILMPool lmPool);
}
