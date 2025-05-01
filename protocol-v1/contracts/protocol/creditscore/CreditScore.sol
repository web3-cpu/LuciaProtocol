// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./base/Score.sol";
import "../../libraries/types/DataTypes.sol";
import "../../interfaces/ILuciaError.sol";
import "../../interfaces/IAddressesProvider.sol";
import "../../interfaces/ICredProtocol.sol";
import "../../interfaces/IGuarantor.sol";
import "../../interfaces/IKYC.sol";

contract CreditScore is Score, Initializable, ILuciaError {    

    /// @dev wallet address => score data
    mapping (address => ScoreData) private _scoreData;

    /// @dev address => bool
    mapping (address => bool) private _accounts;

    /// @dev lenders => true
    mapping (address => bool) private _lenders;

    address private _addressProvider;

    uint256 public constant MAX_BASE_SCORE = 10 ether;
    uint256 public constant W1 = 0.3 ether;    /// weight for KYC score
    uint256 public constant W2 = 0.2 ether;    /// weight for Cred score
    uint256 public constant W3 = 0.1 ether;    /// weight for Guarautor score
    uint256 public constant W4 = 0.2 ether;    /// weight for Repayment score
    uint256 public constant W5 = 0.1 ether;    /// weight for Loan Utility Rate score

    modifier onlyLender() {
        if (!_lenders[msg.sender]) {
            revert LUCIA_ERROR(ErrorTypes.ErrorCodes.ONLY_LENDER_IN_CREDITSCORE);
        }
        _;
    }

    function Initialize(address addressProvider) public initializer {
        _addressProvider = addressProvider;
    }

    function _scoreDataForAccount(address account) internal view returns (ScoreData storage) {
        if (!_accounts[account]) {
            revert LUCIA_ERROR(ErrorTypes.ErrorCodes.ACCOUNT_NOT_FOUND);
        }
        ScoreData storage data = _scoreData[account];
        if (!_scoreData[account].zkVerified) {
            revert LUCIA_ERROR(ErrorTypes.ErrorCodes.ACCOUNT_NOT_VERIFIED);
        }
        return data;
    }

    function register(address account) external {
        if (_scoreData[account].zkVerified) {
            revert LUCIA_ERROR(ErrorTypes.ErrorCodes.ACCOUNT_ALREADY_REGISTERED);
        }

        _scoreData[account] = ScoreData({
            zkVerified: true,       /// will get from zkVerifier.sol
            kycScore: 0,            /// will get from KYC.sol
            initScore: 2 ether,     /// will get from Cred protocol
            guarantorScore: 0,      /// will get from Guarantor.sol
            totalBorrowed: 0,
            totalRepaid: 0,
            totalCollateral: 0
        });
        _accounts[account] = true;
    }

    function scoreData(address account) external view returns (ScoreData memory) {
        return _scoreDataForAccount(account);
    }

    function score(address account) external view override returns (uint256) {
        ScoreData storage data = _scoreDataForAccount(account);

        uint256 W0 = W1 + W2 + W3 + W4 + W5;

        /// kyc score
        uint256 kycScore = W1 * IKYC(IAddressesProvider(_addressProvider).getKYCEngine()).getScore(account) / W0;

        /// initial credit score
        uint256 credScore = W2 * ICredProtocol(IAddressesProvider(_addressProvider).getCredProtocol()).getScore(account) / W0;

        /// guarantor credit score
        uint256 guarantorScore = W3 * IGuarantor(IAddressesProvider(_addressProvider).getGuarantorEngine()).getScore(account) / W0;

        /// payment history score
        uint256 maxK = 1.5 ether;
        uint256 minK = 0.5 ether;
        uint256 base;
        if (data.totalBorrowed == 0) {
            base = data.initScore;
        } else if (data.totalBorrowed > data.totalRepaid) {
            base = data.initScore / 2 ether; 
        } else {
            uint256 overage = data.totalRepaid * 1 ether / data.totalBorrowed;
            base = data.initScore * overage * 1.1 ether / 1 ether / 1 ether;
        }
        if (base > MAX_BASE_SCORE) {
            base = MAX_BASE_SCORE;
        }
        uint256 repaymentScore = W4 * (minK + (maxK - minK) * (1 ether - base * 1 ether / MAX_BASE_SCORE) / 1 ether) / W0;

        return kycScore + credScore + guarantorScore + repaymentScore;
    }

    // Hooks
    function onBorrow(address account, uint256 value) external override onlyLender {}

    function onRepay(address account, uint256 value) external override onlyLender {}

    function onIncreaseCollateral(address account, uint256 value) external override onlyLender {}

    function onDecreaseCollateral(address account, uint256 value) external override onlyLender {}

    // Helper functions
    function zkVerify(address account) external override {}

    // Management functions
    function setLender(address lender, bool status) external onlyOwner {
        _lenders[lender] = status;
    }
}
