// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LCI is Ownable, ERC20 {
    uint256 private constant INITIAL_SUPPLY = 100 * 1e6 * 1e18; // the inital supply

    constructor() ERC20("LCI Token", "LCI") {
        mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(
        address _to,
        uint256 _amount
    ) public onlyOwner returns (bool) {
        _mint(_to, _amount);
        return true;
    }

    function burn(
        address _who,
        uint256 _amount
    ) public onlyOwner returns (bool) {
        _burn(_who, _amount);
        return true;
    }
}
