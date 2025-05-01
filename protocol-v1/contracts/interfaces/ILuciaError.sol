//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../libraries/types/DataTypes.sol";
interface ILuciaError {
    error LUCIA_ERROR(ErrorTypes.ErrorCodes);
}