/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IAddressesProvider.sol";
import "../interfaces/ILuciaError.sol";
import "../libraries/types/DataTypes.sol";

contract AddressesProvider is Ownable, IAddressesProvider, ILuciaError {
    mapping(bytes32 => address) private _addresses;

    bytes32 public constant CREDIT_SCORE_ENGINE = "CREDIT_SCORE_ENGINE";
    bytes32 public constant CRED_PROTOCOL = "CRED_PROTOCOL";
    bytes32 public constant KYC_ENGINE = "KYC_ENGINE";
    bytes32 public constant GUARANTOR_ENGINE = "GUARANTOR_ENGINE";

    /// @dev throws if new address is not contract.
    modifier onlyContract(address newAddress) {
        if (!isContract(newAddress)) revert LUCIA_ERROR(ErrorTypes.ErrorCodes.NOT_CONTRACT_ADDRESS);
        _;
    }

    constructor() {}

    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function _updateImpl(bytes32 id, address newAddress) internal {
        _addresses[id] = newAddress;
    }

    function setAddress(bytes32 id, address newAddress) external override onlyOwner {
        _addresses[id] = newAddress;
    }

    function getAddress(bytes32 id) public view override returns (address) {
        return _addresses[id];
    }

    function getCreditScoreEngine() external view override returns (address) {
        return getAddress(CREDIT_SCORE_ENGINE);
    }

    function setCreditScoreEngine(address engine) external override onlyOwner onlyContract(engine) {
        _updateImpl(CREDIT_SCORE_ENGINE, engine);
        emit CreditScoreEngineUpdated(engine);
    }

    function getCredProtocol() external view override returns (address) {
        return getAddress(CRED_PROTOCOL);
    }

    function setCredProtocol(address cred) external override onlyOwner onlyContract(cred) {
        _updateImpl(CRED_PROTOCOL, cred);
        emit CredProtocolUpdated(cred);
    }

    function getGuarantorEngine() external view override returns (address) {
        return getAddress(GUARANTOR_ENGINE);
    }

    function setGuarantorEngine(address engine)
        external
        override
        onlyOwner
        onlyContract(engine)
    {
        _updateImpl(GUARANTOR_ENGINE, engine);
        emit GuarantorEngineUpdated(engine);
    }

    function getKYCEngine() external view override returns (address) {
        return getAddress(KYC_ENGINE);
    }

    function setKYCEngine(address engine)
        external
        override
        onlyOwner
        onlyContract(engine)
    {
        _updateImpl(KYC_ENGINE, engine);
        emit KYCEngineUpdated(engine);
    }
}
