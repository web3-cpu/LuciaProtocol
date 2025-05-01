// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

interface ITokenVesting {
    error Token_Vesting_Amount_Above_Contract_Balance();
    error Token_Vesting_Start_Time_In_The_Past();
    error Token_Vesting_Already_Vested();

    event TokenVested(
        address indexed investor,
        uint64 start,
        uint64 duration,
        uint256 amountVested
    );

    event TokenReleased(address indexed investor, uint256 amount);
    event TokenWithdrawn(uint256 amount);

    struct VestedDetails {
        bool vested;
        uint64 start;
        uint64 duration;
        uint256 amountVested;
        uint256 amountReleased;
    }

    /**
     * @dev Update Lucia token address by only the owner.
     * @param newToken Address of the new token that serves as investors shares.
     */
    function updateToken(address newToken) external;

    /**
     * @dev Vest an investor tokens.
     * @param investor GGGH
     * @param params HHHHH
     * Emits a {TokenVested} event.
     */
    function vestInvestor(
        address investor,
        VestedDetails calldata params
    ) external;

    /**
     * @dev Release the tokens that have already vested.
     * @param investor investors token to be released.
     * Emits a {TokenReleased} event.
     */
    function release(address investor) external;

    /**
     * @dev Release the tokens that have already vested.
     * @param investor vested investor address to be canceled.ß
     */
    function cancelVesting(address investor) external;

    /**
     * @dev Withdraw Lucia token from contract only by owner.
     * @param amount amount of token to withdraw.
     */
    function withdrawTokens(uint256 amount) external;

    /**
     * @notice Pauses the whole contract; used as emergency response
     */
    function pause() external;

    /**
     * @notice unpauses the contract; resumes functionality.
     */
    function unpause() external;

    /**
     * @dev Getter for the end timestamp.
     */
    function end(address investor) external view returns (uint256);

    /**
     * @dev Amount of token already released
     */
    function released(address investor) external view returns (uint256);

    /**
     * @dev Getter for the amount of releasable `token` tokens.
     */
    function releasable(address investor) external view returns (uint256);

    /**
     * @dev Calculates the amount of tokens that has already vested. Default implementation is a linear vesting curve.
     */
    function vestedAmount(
        address investor,
        uint64 timestamp
    ) external view returns (uint256);
}
