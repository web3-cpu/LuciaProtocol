// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Test, console2 as console} from "forge-std/Test.sol";
import {ITokenVesting} from "../src/interfaces/ITokenVesting.sol";
import {TokenVesting} from "../src/TokenVesting.sol";
import {DemoToken} from "./DemoToken.sol";

contract TokenVestingTest is Test {
    DemoToken demoToken;
    TokenVesting tokenVesting;

    uint constant VESTED_AMOUNT = 10 ether;

    uint64 start = uint64(block.timestamp);
    uint64 duration = 365 days * 5;

    function setUp() public {
        demoToken = new DemoToken();
        tokenVesting = new TokenVesting(demoToken);
    }

    function testShouldVestTokens() public {
        vest(start, duration, VESTED_AMOUNT, address(1));

        (
            ,
            uint64 s,
            uint64 d,
            uint256 amountVested,
            uint256 amountReleased
        ) = tokenVesting.vested(address(1));

        assertEq(s, start);
        assertEq(d, duration);
        assertEq(VESTED_AMOUNT, amountVested);
        assertEq(0, amountReleased);
    }

    function testShouldReturnVestedAmountToRedeem() public {
        vest(start, duration, VESTED_AMOUNT, address(1));

        // after two months
        vm.warp(60 days);

        (, uint64 s, , , ) = tokenVesting.vested(address(1));

        /*
         * formular
         * totalAllocation * (currentTime - vestingStartTime)) / vestingDuration;
         */

        uint256 amountAvailableToRedeem = (VESTED_AMOUNT *
            (block.timestamp - s)) / duration;

        assertEq(tokenVesting.releasable(address(1)), amountAvailableToRedeem);
    }

    function testShouldWithdrawPortionOfVestedTokens() public {
        demoToken.transfer(address(tokenVesting), VESTED_AMOUNT);
        vest(start, duration, VESTED_AMOUNT, address(1));

        // after two months
        vm.warp(60 days);

        (
            ,
            uint64 s,
            ,
            uint256 amountVested,
            uint256 amountReleased
        ) = tokenVesting.vested(address(1));
        assertEq(amountReleased, 0);

        uint256 amountAvailableToRedeem = (amountVested *
            (block.timestamp - s)) / duration;

        assertEq(demoToken.balanceOf(address(1)), 0);
        assertEq(demoToken.balanceOf(address(tokenVesting)), VESTED_AMOUNT);

        tokenVesting.release(address(1));
        (, , , , uint256 released) = tokenVesting.vested(address(1));

        assertEq(released, amountAvailableToRedeem);
        assertEq(demoToken.balanceOf(address(1)), amountAvailableToRedeem);

        assertEq(
            demoToken.balanceOf(address(tokenVesting)),
            VESTED_AMOUNT - amountAvailableToRedeem
        );
    }

    function testShouldCancelInvestor() public {
        vest(start, duration, VESTED_AMOUNT, address(1));

        (
            ,
            uint64 s,
            uint64 d,
            uint256 amountVested,
            uint256 amountReleased
        ) = tokenVesting.vested(address(1));

        assertEq(s, start);
        assertEq(d, duration);
        assertEq(VESTED_AMOUNT, amountVested);
        assertEq(0, amountReleased);

        tokenVesting.cancelVesting(address(1));

        (
            ,
            uint64 s0,
            uint64 d0,
            uint256 amountVested0,
            uint256 amountReleased0
        ) = tokenVesting.vested(address(1));

        assertEq(0, s0);
        assertEq(0, d0);
        assertEq(0, amountVested0);
        assertEq(0, amountReleased0);
    }

    function testShouldWithdrawTokensInContract() public {
        demoToken.transfer(address(tokenVesting), VESTED_AMOUNT);
        assertEq(demoToken.balanceOf(address(tokenVesting)), VESTED_AMOUNT);

        tokenVesting.withdrawTokens(VESTED_AMOUNT);
        assertEq(demoToken.balanceOf(address(tokenVesting)), 0);
    }

    function testFailWhenNotOwner() public {
        vm.startPrank(address(2));
        vest(start, duration, VESTED_AMOUNT, address(1));
        tokenVesting.withdrawTokens(VESTED_AMOUNT);
    }

    function testFailWhenContractIsPaused() public {
        tokenVesting.pause();
        vest(start, duration, VESTED_AMOUNT, address(1));
    }

    // FUZZING TEST

    function testShouldFuzzMultipleUsers(
        uint64 year,
        uint256 amount,
        address user,
        uint256 months
    ) public {
        year = uint64(bound(year, 1, 10));
        amount = bound(amount, 1, 10_000);
        months = bound(months, 1, 100);

        uint64 durationInSecs = 365 days * year;
        uint amt = amount * 1e18;

        vest(start, durationInSecs, amt, user);

        // fast forward in months
        vm.warp(months * 30);

        (, uint64 s, , , ) = tokenVesting.vested(user);
        uint256 amountAvailableToRedeem;

        if (block.timestamp > tokenVesting.end(user)) {
            amountAvailableToRedeem = amt;
        } else {
            amountAvailableToRedeem =
                (amt * (block.timestamp - s)) /
                durationInSecs;
        }

        assertEq(tokenVesting.releasable(user), amountAvailableToRedeem);
    }

    function testShouldWithdrawPortionOfVestedTokens(
        uint64 year,
        uint256 amount,
        address user,
        uint256 months
    ) public {
        year = uint64(bound(year, 1, 10));
        amount = bound(amount, 1, 10_000);
        months = bound(months, 1, 100);

        uint amt = amount * 1e18;
        demoToken.transfer(address(tokenVesting), amt);

        uint64 durationInSecs = 365 days * year;

        vest(start, durationInSecs, amt, user);

        // fast forward in months
        vm.warp(months * 30);

        (, uint64 s, , , uint256 amountReleased) = tokenVesting.vested(user);
        assertEq(amountReleased, 0);

        uint256 amountAvailableToRedeem;

        if (block.timestamp > tokenVesting.end(user)) {
            amountAvailableToRedeem = amt;
        } else {
            amountAvailableToRedeem =
                (amt * (block.timestamp - s)) /
                durationInSecs;
        }

        assertEq(demoToken.balanceOf(user), 0);
        assertEq(demoToken.balanceOf(address(tokenVesting)), amt);

        tokenVesting.release(user);
        (, , , , uint256 released) = tokenVesting.vested(user);

        assertEq(released, amountAvailableToRedeem);
        assertEq(demoToken.balanceOf(user), amountAvailableToRedeem);

        assertEq(
            demoToken.balanceOf(address(tokenVesting)),
            amt - amountAvailableToRedeem
        );
    }

    function vest(
        uint64 startTime,
        uint64 durationTime,
        uint256 vestedAmount,
        address investor
    ) internal {
        ITokenVesting.VestedDetails memory params = ITokenVesting
            .VestedDetails({
                vested: true,
                start: startTime,
                duration: durationTime,
                amountVested: vestedAmount,
                amountReleased: 0
            });

        tokenVesting.vestInvestor(investor, params);
    }
}
