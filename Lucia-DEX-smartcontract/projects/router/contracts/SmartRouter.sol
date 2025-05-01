// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@luciaswap/periphery/contracts/base/SelfPermit.sol';
import '@luciaswap/periphery/contracts/base/PeripheryImmutableState.sol';

import './interfaces/ISmartRouter.sol';
import './SwapRouter.sol';
import './StableSwapRouter.sol';
import './base/ApproveAndCall.sol';
import './base/MulticallExtended.sol';
import './base/ImmutableState.sol';

/// @title Lucia Smart Router
contract SmartRouter is ISmartRouter, SwapRouter, StableSwapRouter, ApproveAndCall, MulticallExtended, SelfPermit {
    constructor(
        address _factoryV2,
        address _deployer,
        address _factoryV3,
        address _positionManager,
        address _stableFactory,
        address _stableInfo,
        address _WETH9
    ) ImmutableState(_positionManager) PeripheryImmutableState(_deployer, _factoryV3, _WETH9) StableSwapRouter(_stableFactory, _stableInfo) {}
}
