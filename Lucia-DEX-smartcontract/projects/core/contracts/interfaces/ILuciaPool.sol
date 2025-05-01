// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/ILuciaPoolImmutables.sol';
import './pool/ILuciaPoolState.sol';
import './pool/ILuciaPoolDerivedState.sol';
import './pool/ILuciaPoolActions.sol';
import './pool/ILuciaPoolOwnerActions.sol';
import './pool/ILuciaPoolEvents.sol';

/// @title The interface for a LuciaSwap Pool
/// @notice A LuciaSwap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface ILuciaPool is
    ILuciaPoolImmutables,
    ILuciaPoolState,
    ILuciaPoolDerivedState,
    ILuciaPoolActions,
    ILuciaPoolOwnerActions,
    ILuciaPoolEvents
{

}
