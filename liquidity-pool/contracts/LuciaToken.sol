pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LuciaToken is ERC20 {

    // Define the supply of LuciaToken: 1,000,000 
    uint256 constant initialSupply = 1000000000 * (10**18);

    // Constructor will be called on contract creation
    constructor() ERC20("LuciaToken", "LUCI") {
        _mint(msg.sender, initialSupply);
    }
}
