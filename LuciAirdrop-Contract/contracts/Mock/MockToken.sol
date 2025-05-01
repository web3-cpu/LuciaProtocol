// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor(
        string memory _symbol,
        string memory _name
    ) ERC20(_symbol, _name) {}

    function mint(uint256 amount, address minter) external {
        _mint(minter, amount);
    }
}
