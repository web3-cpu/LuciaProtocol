// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {ILUCI} from "./interfaces/ILUCI.sol";

/**
 * @title LUCI Lending Contract
 * @author c-n-o-t-e
 * @notice .......
 * @dev ....
 */

contract LUCILending is
    Initializable,
    PausableUpgradeable,
    UUPSUpgradeable,
    AccessControlUpgradeable
{
    using SafeERC20 for ILUCI;
    using SafeERC20 for IERC20;

    error LUCILending_AlreadyBorrowed();
    error LUCILending_Invalid_Base_Asset();
    error LUCILending_Asset_Not_Supported();
    error LUCILending_No_Pending_Repayment();
    error LUCILending_Amount_Cannot_Be_Zero();
    error LUCILending_Amount_Above_Total_Owed();
    error LUCILending_Amount_Not_Exact_Amount_Due();
    error LUCILending_Cannot_Pay_Less_Than_Monthly_Due();
    error LUCILending_Amount_Not_Equal_to_Months_Loan_Cost();
    error LUCILending_Loan_Length_Not_Within_Approved_Range();
    error LUCILending_Amount_Above_User_Available_Collateral();
    error LUCILending_CreditScoreWeight_Sum_Should_Be_One();
    error LUCILending_Not_Enough_Credit_Score();

    event Supply(
        address indexed supplier,
        address indexed asset,
        uint256 amount
    );

    event Borrow(address indexed borrower, uint256 amount);

    ILUCI public BASE_ASSET;
    uint256 public constant GRACE_PERIOD = 72 hours;
    uint256 public constant MIN_LOAN_MONTH_LENGTH = 3;
    uint256 public constant MAX_LOAN_MONTH_LENGTH = 12;
    uint256 public constant MONTHLY_INTEREST_RATE = 500; //5%

    // Credit Score Weight
    uint256 initialCreditScoreW1;
    uint256 guarantorScoreW2;
    uint256 paymentHistoryW3;
    uint256 loanUtilizationRateW4;
    uint256 kycW5;

    uint256 threshold;

    // keccak256(abi.encode(uint256(keccak256("lucia.storage.LUCILending")) - 1)) & ~bytes32(uint256(0xff))
    bytes32 private constant LUCILendingStorageLocation =
        0x0817b8f2ce7cb815eeebd38ac1a9e523ef0e14aac12e38da98faa1353157f500;

    struct LUCILendingStorage {
        uint256 totalBaseAssetBorrowed;
        mapping(address borrower => uint256) loanLength;
        mapping(address supportedTokens => bool) assets;
        // credit score params
        mapping(address borrower => uint256) initialCreditScore;
        mapping(address borrower => uint256) guarantorScore;
        mapping(address borrower => uint256) kyc;
        mapping(address borrower => uint256) totalTimelyRepayments;
        mapping(address borrower => uint256) totalRepayment;
        mapping(address borrower => uint256) totalLoanAmountTaken;
        mapping(address borrower => uint256) monthsMissed;
        mapping(address borrower => uint256) monthsRepaid;
        mapping(address borrower => uint256) penaltyPoint;
        mapping(address borrower => uint256) nextPaymentDue;
        mapping(address borrower => uint256) lockUpDuration;
        mapping(address borrower => uint256) amountRemaining;
        mapping(address supplier => address) collateralAsset;
        mapping(address borrower => uint256) borrowedTimestamp;
        mapping(address supplier => uint256) suppliedCollateral;
        mapping(address borrower => uint256) borrowedCollateral;
        mapping(address borrower => uint256) penaltyPointTimestamp;
        mapping(address supportedTokens => uint256) totalSuppliedAssets;
    }

    function _getLUCILendingStorage()
        private
        pure
        returns (LUCILendingStorage storage $)
    {
        // slither-disable-next-line assembly
        assembly {
            $.slot := LUCILendingStorageLocation
        }
    }

    function initialize(
        ILUCI token,
        address[] calldata supplyAssets
    ) public initializer {
        BASE_ASSET = token;

        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        LUCILendingStorage storage $ = _getLUCILendingStorage();

        for (uint i; i < supplyAssets.length; i++) {
            $.assets[supplyAssets[i]] = true;
        }

        initialCreditScoreW1 = 30;
        guarantorScoreW2 = 20;
        paymentHistoryW3 = 20;
        loanUtilizationRateW4 = 15;
        kycW5 = 15;

        threshold = 1000;
    }

    function _authorizeUpgrade(address newImplementation) internal override {}

    function supply(address asset, uint256 amount) external whenNotPaused {
        LUCILendingStorage storage $ = _getLUCILendingStorage();
        if (!$.assets[asset]) revert LUCILending_Asset_Not_Supported();

        IERC20(asset).safeTransferFrom(msg.sender, address(this), amount);
        $.suppliedCollateral[msg.sender] += amount;

        $.collateralAsset[msg.sender] = asset;
        $.totalSuppliedAssets[asset] += amount;

        emit Supply(msg.sender, asset, amount);
    }

    // the model we're working with is you offer collateral you can only make one borrow, u must repay that before borrowing again.

    function borrow(uint256 amount, uint256 loanLength) external whenNotPaused {
        if (amount == 0) revert LUCILending_Amount_Cannot_Be_Zero();
        LUCILendingStorage storage $ = _getLUCILendingStorage();

        if (
            loanLength > MAX_LOAN_MONTH_LENGTH ||
            loanLength < MIN_LOAN_MONTH_LENGTH
        ) revert LUCILending_Loan_Length_Not_Within_Approved_Range();

        uint256 lockUpDuration = 30 days * loanLength;

        if ($.borrowedCollateral[msg.sender] > 0)
            revert LUCILending_AlreadyBorrowed();

        // $.creditScore will be used to determine undercollaterized loans given to user
        uint256 paymentHistory = 0;
        if (
            $.totalRepayment[msg.sender] != 0 &&
            $.totalTimelyRepayments[msg.sender] != 0
        )
            paymentHistory =
                ($.totalTimelyRepayments[msg.sender] /
                    $.totalRepayment[msg.sender]) *
                100;
        uint256 loanUtilizationRate = ($.totalLoanAmountTaken[msg.sender] /
            $.suppliedCollateral[msg.sender]) * 100;
        uint256 creditScore = (initialCreditScoreW1 *
            $.initialCreditScore[msg.sender] +
            guarantorScoreW2 *
            $.guarantorScore[msg.sender] +
            paymentHistoryW3 *
            paymentHistory +
            loanUtilizationRate *
            loanUtilizationRateW4 +
            $.kyc[msg.sender] *
            kycW5) / 100;
        if (creditScore < threshold)
            revert LUCILending_Not_Enough_Credit_Score();

        if ($.suppliedCollateral[msg.sender] < amount)
            revert LUCILending_Amount_Above_User_Available_Collateral();

        $.nextPaymentDue[msg.sender] = block.timestamp + 30 days;
        $.borrowedTimestamp[msg.sender] = block.timestamp;
        $.lockUpDuration[msg.sender] = lockUpDuration;
        $.borrowedCollateral[msg.sender] = amount;
        $.amountRemaining[msg.sender] = amount;

        // to be handle by the treasury
        BASE_ASSET.mint(amount, msg.sender);
        $.totalBaseAssetBorrowed += amount;

        $.totalLoanAmountTaken[msg.sender] += amount;

        emit Borrow(msg.sender, amount);
    }

    function repayOutstandingLoans() external {}

    function repayLoan(
        uint256 amount
    ) external returns (uint256 monthsCovered, uint256 remainingAmount) {
        LUCILendingStorage storage $ = _getLUCILendingStorage();
        if (0 == $.borrowedCollateral[msg.sender])
            revert LUCILending_No_Pending_Repayment();

        uint256 loanDuration = $.lockUpDuration[msg.sender] / 30 days;

        uint monthlyPaymentDue = calculateRepaymentPerMonth(
            $.borrowedCollateral[msg.sender],
            loanDuration
        ); // principal might change

        if (amount < monthlyPaymentDue)
            revert LUCILending_Cannot_Pay_Less_Than_Monthly_Due();

        if (amount == monthlyPaymentDue) {
            IERC20(address(BASE_ASSET)).safeTransferFrom(
                msg.sender,
                address(this),
                amount
            );

            monthsCovered = 1;
        } else if (amount > monthlyPaymentDue) {
            for (uint256 i = 2; i < loanDuration; i++) {
                uint256 a = monthlyPaymentDue * i;

                if (amount < a)
                    revert LUCILending_Amount_Not_Exact_Amount_Due();
                else if (amount > monthlyPaymentDue * loanDuration)
                    revert LUCILending_Amount_Above_Total_Owed();
                else if (amount == a) {
                    IERC20(address(BASE_ASSET)).safeTransferFrom(
                        msg.sender,
                        address(this),
                        amount
                    );

                    monthsCovered = i;
                    break;
                }
            }
        }

        uint256 nextPaymentDue = $.nextPaymentDue[msg.sender];
        uint256 penaltyTimestamp = $.penaltyPointTimestamp[msg.sender];
        uint256 missedMonths = getMonthsMissed();

        if (missedMonths > 0) {
            if ($.penaltyPoint[msg.sender] > 0) {
                if (block.timestamp > penaltyTimestamp + 30 days) {
                    uint256 elapsedTimeInSeconds = block.timestamp -
                        penaltyTimestamp;
                    uint256 additionalMonthsPassed = elapsedTimeInSeconds /
                        30 days;

                    $.penaltyPoint[msg.sender] += additionalMonthsPassed;
                    $.penaltyPointTimestamp[msg.sender] =
                        penaltyTimestamp +
                        (30 days * additionalMonthsPassed);
                }
            } else {
                $.penaltyPoint[msg.sender] += missedMonths;
                $.penaltyPointTimestamp[msg.sender] =
                    nextPaymentDue +
                    (30 days * missedMonths);
            }
        } else {
            // Credit Score payment history
            $.totalTimelyRepayments[msg.sender] += amount;
        }

        // Credit Score payment history
        $.totalRepayment[msg.sender] += amount;

        if (block.timestamp > nextPaymentDue)
            $.nextPaymentDue[msg.sender] =
                nextPaymentDue +
                (30 days * monthsCovered);

        $.monthsRepaid[msg.sender] += monthsCovered;

        remainingAmount =
            $.borrowedCollateral[msg.sender] -
            $.monthsRepaid[msg.sender];

        $.amountRemaining[msg.sender] = remainingAmount;
    }

    function getMonthsMissed() internal view returns (uint256 monthsPassed) {
        LUCILendingStorage storage $ = _getLUCILendingStorage();
        uint256 lastpaymentDue = $.nextPaymentDue[msg.sender];

        // Check if payment is currently overdue
        if (block.timestamp > lastpaymentDue + GRACE_PERIOD) {
            monthsPassed++;

            for (uint256 i = 1; i < MAX_LOAN_MONTH_LENGTH + 1; i++) {
                if (
                    block.timestamp >
                    lastpaymentDue + (30 days * i) + GRACE_PERIOD
                ) monthsPassed++;
                else break;
            }
        }

        return monthsPassed;
    }

    // calculation needs to be refined down the road.
    function calculateRepaymentPerMonth(
        uint256 principal,
        uint256 termInMonths
    ) public pure returns (uint256 monthlyRepayment) {
        uint256 initialNumerator = (1 + MONTHLY_INTEREST_RATE) ** termInMonths;
        uint256 numerator = initialNumerator / 100;
        uint denominator = initialNumerator - 100 ** termInMonths;

        monthlyRepayment = (principal * numerator) / denominator;
    }

    function getCollateralNeededForLoan()
        public
        view
        returns (uint256 collateral)
    {}

    function withdrawCollateral(address asset, uint256 amount) external {}

    function setCreditScoreWeight(
        uint256 w1,
        uint256 w2,
        uint256 w3,
        uint256 w4,
        uint256 w5
    ) external {
        if (w1 + w2 + w3 + w4 + w5 != 100)
            revert LUCILending_CreditScoreWeight_Sum_Should_Be_One();
        initialCreditScoreW1 = w1;
        guarantorScoreW2 = w2;
        paymentHistoryW3 = w3;
        loanUtilizationRateW4 = w4;
        kycW5 = w5;
    }

    function setThreshold(uint256 _threshold) external {
        threshold = _threshold;
    }

    function setCreditScore(
        uint256 _initialCreditScore,
        uint256 _guarantorScore,
        uint256 _kyc
    ) external {
        LUCILendingStorage storage $ = _getLUCILendingStorage();

        $.initialCreditScore[msg.sender] = _initialCreditScore;
        $.guarantorScore[msg.sender] = _guarantorScore;
        $.kyc[msg.sender] = _kyc;
    }
}
