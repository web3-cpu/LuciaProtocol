// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "./proxy/ProxyAdmin.sol";
import "./protocol/creditscore/CreditScore.sol";

contract LuciaFactory {
    /// @notice Emitted when a credit score engine is created
    event CreditScoreEngineCreated(address indexed owner, address indexed engine, uint256 createTime);

    /// @notice Emitted when a credit score engine is upgraded
    event CreditScoreEngineUpgraded(address indexed upgrader, address indexed proxy, address indexed newImplementation);

    ProxyAdmin immutable _proxyAdmin;
    address private _addressProvider;
    address immutable _implCreditScore;
    constructor(address addressProvider) {
        _addressProvider = addressProvider;
        _implCreditScore = address(new CreditScore());
        _proxyAdmin = new ProxyAdmin();
    }

    function deployCreditScoreEngine() external returns (address) {
        bytes memory _data = abi.encodeWithSignature("initialize(address)", _addressProvider);        
        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(_implCreditScore, address(_proxyAdmin), _data);

        emit CreditScoreEngineCreated(msg.sender, address(proxy), block.timestamp);
        return address(proxy);
    }

    function upgradeTo(address proxy, address implementation) external {
        _proxyAdmin.upgradeTo(proxy, implementation);

        emit CreditScoreEngineUpgraded(msg.sender, proxy, implementation);
    }
}
