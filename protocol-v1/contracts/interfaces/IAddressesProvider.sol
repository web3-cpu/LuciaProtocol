/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IAddressesProvider {

    event CreditScoreEngineUpdated(address indexed newAddress);

    event CredProtocolUpdated(address indexed newAddress);

    event GuarantorEngineUpdated(address indexed newAddress);

    event KYCEngineUpdated(address indexed newAddress);

    function setAddress(bytes32 id, address newAddress) external;

    function getAddress(bytes32 id) external view returns (address);

    function getCreditScoreEngine() external view returns (address);

    function setCreditScoreEngine(address engine) external;

    function getCredProtocol() external view returns (address);

    function setCredProtocol(address cred) external;

    function getGuarantorEngine() external view returns (address);

    function setGuarantorEngine(address engine) external;

    function getKYCEngine() external view returns (address);

    function setKYCEngine(address engine) external;
}
