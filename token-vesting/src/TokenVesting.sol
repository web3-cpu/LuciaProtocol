// SPDX-License-Identifier: MIT

/// @title Vesting Contract
/// @notice Contract is used to vest investors token for a duration with a linear vesting curve.
/// @author Lucia Protocol - c-n-o-t-e

pragma solidity 0.8.20;

import {ITokenVesting} from "./interfaces/ITokenVesting.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {Pausable} from "openzeppelin-contracts/contracts/utils/Pausable.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenVesting is Ownable, Pausable, ITokenVesting {
    IERC20 luciaToken;

    mapping(address investor => VestedDetails) public vested;

    constructor(IERC20 token) Ownable(msg.sender) {
        luciaToken = token;
    }

    /// @inheritdoc ITokenVesting
    function updateToken(address newToken) external onlyOwner {
        luciaToken = IERC20(newToken);
    }

    /// @inheritdoc ITokenVesting
    function vestInvestor(
        address investor,
        VestedDetails calldata params
    ) external onlyOwner whenNotPaused {
        if (params.start < block.timestamp)
            revert Token_Vesting_Start_Time_In_The_Past();

        if (vested[investor].vested) revert Token_Vesting_Already_Vested();

        vested[investor] = params;

        emit TokenVested(
            investor,
            params.start,
            params.duration,
            params.amountVested
        );
    }

    /// @inheritdoc ITokenVesting
    function cancelVesting(address investor) external onlyOwner {
        delete vested[investor];
    }

    /// @inheritdoc ITokenVesting
    function release(address investor) external virtual {
        uint256 amount = releasable(investor);

        vested[investor].amountReleased += amount;
        emit TokenReleased(investor, amount);

        SafeERC20.safeTransfer(luciaToken, investor, amount);
    }

    /// @inheritdoc ITokenVesting
    function withdrawTokens(uint256 amount) external onlyOwner {
        if (amount > luciaToken.balanceOf(address(this)))
            revert Token_Vesting_Amount_Above_Contract_Balance();

        emit TokenWithdrawn(amount);

        SafeERC20.safeTransfer(luciaToken, msg.sender, amount);
    }

    /// @inheritdoc ITokenVesting
    function pause() external onlyOwner {
        _pause();
    }

    /// @inheritdoc ITokenVesting
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @inheritdoc ITokenVesting
    function end(address investor) public view virtual returns (uint256) {
        return vested[investor].start + vested[investor].duration;
    }

    /// @inheritdoc ITokenVesting
    function released(address investor) public view virtual returns (uint256) {
        return vested[investor].amountReleased;
    }

    /// @inheritdoc ITokenVesting
    function releasable(
        address investor
    ) public view virtual returns (uint256) {
        return
            vestedAmount(investor, uint64(block.timestamp)) -
            released(investor);
    }

    /// @inheritdoc ITokenVesting
    function vestedAmount(
        address investor,
        uint64 timestamp
    ) public view virtual returns (uint256) {
        return _vestingSchedule(investor, timestamp);
    }

    /**
     * @dev Virtual implementation of the vesting formula. This returns the amount vested, as a function of time, for
     * an asset given its total historical allocation.
     */
    function _vestingSchedule(
        address investor,
        uint64 timestamp
    ) internal view virtual returns (uint256) {
        uint256 totalAllocation = vested[investor].amountVested +
            released(investor);

        if (timestamp < vested[investor].start) {
            return 0;
        } else if (timestamp >= end(investor)) {
            return totalAllocation;
        } else {
            return
                (totalAllocation * (timestamp - vested[investor].start)) /
                vested[investor].duration;
        }
    }
}
