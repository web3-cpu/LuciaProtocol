// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.5;
pragma abicoder v2;

import '@luciaswap/periphery/contracts/interfaces/ISelfPermit.sol';

import './ISwapRouter.sol';
import './IStableSwapRouter.sol';
import './IApproveAndCall.sol';
import './IMulticallExtended.sol';

/// @title Router token swapping functionality
interface ISmartRouter is ISwapRouter, IStableSwapRouter, IApproveAndCall, IMulticallExtended, ISelfPermit {

}
