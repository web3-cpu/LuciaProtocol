// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract ProxyAdmin is Ownable {
    constructor() {
    }

    function upgradeTo(address proxy, address implementation) public onlyOwner {
        TransparentUpgradeableProxy(payable(proxy)).upgradeTo(implementation);
    }
}
