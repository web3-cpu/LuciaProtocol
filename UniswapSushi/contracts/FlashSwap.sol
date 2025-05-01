// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.6;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "./libraries/UniswapV2Library.sol";
import "./libraries/SafeERC20.sol";
import "./interfaces/IUniswapV2Router01.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IERC20.sol";

contract PancakeFlashSwap {
    using SafeERC20 for IERC20; // allow us to benefits of the safe ERC20 while using IERC20

    // dont need to paste in as string, solidity knows
    address private constant PANCAKE_FACTORY =
        0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;
    address private constant PANCAKE_ROUTER =
        0x10ED43C718714eb63d5aA57B78B54704E256024E;

    // Token Addresses
    address private constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address private constant BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    address private constant CAKE = 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82;
    address private constant USDT = 0x55d398326f99059fF775485246999027B3197955;
    address private constant CROX = 0x2c094F5A7D1146BB93850f629501eB749f6Ed491;
    // next action make it possible to pass in as variable

    // Trade variables
    uint256 private deadline = block.timestamp + 1 days;

    // smart contract needs to know how much it needs to approve on behalf of the sender
    uint256 private constant MAX_INT =
        115792089237316195423570985008687907853269984665640564039457584007913129639935;

    function fundFlashSwapContract(
        address _owner,
        address _token,
        uint256 _amount
    ) public {
        IERC20(_token).transferFrom(_owner, address(this), _amount);
    }

    // Gets balance of any token, which is stored with a balance in this smart contract
    // Contract Balance
    // Allows public view of balance for contract
    function getBalanceOfToken(address _address) public view returns (uint256) {
        return IERC20(_address).balanceOf(address(this));
    }

    function getBalanceOfTokenForUser(
        address _address,
        address user
    ) public view returns (uint256) {
        return IERC20(_address).balanceOf(user);
    }

    function placeTrade(
        address _fromToken,
        address _toToken,
        uint256 _amountIn
    ) private returns (uint256) {
        address pair = IUniswapV2Factory(PANCAKE_FACTORY).getPair(
            _fromToken,
            _toToken
        );
        require(pair != address(0), "Pool does not exist");

        // Calculate amountOut
        address[] memory path = new address[](2);
        path[0] = _fromToken;
        path[1] = _toToken;

        uint256 amountRequired = IUniswapV2Router01(PANCAKE_ROUTER)
            .getAmountsOut(_amountIn, path)[1];
        // console.log("amount Required: ", amountRequired);

        // Perform Arbitrage - Swap for another token.

        uint256 amountReceived = IUniswapV2Router01(PANCAKE_ROUTER)
            .swapExactTokensForTokens(
                _amountIn,
                amountRequired,
                path,
                address(this),
                deadline
            )[1];
        // console.log("Amount received: ", amountReceived);

        require(amountReceived > 0, "Reverted Tx: Trade returned zero");
        return amountReceived;
    }

    function profitCheck(
        uint256 _input,
        uint256 _output
    ) private returns (bool) {
        return _output > _input;
    }

    // Getting the flash swap loan from the contract
    // _amount is the amount we want to borrow
    // Begins receiving the loan and performing arbirage trades
    // input is token we want to borrow
    // Business logic: approves the router which is what makes the swap
    // its the router that swaps token for token
    // approve it up to the max int we set earlier
    // now pancake router can make tx on our behalf
    function startArbitrage(address _tokenBorrow, uint256 _amount) external {
        IERC20(BUSD).safeApprove(address(PANCAKE_ROUTER), MAX_INT);
        IERC20(USDT).safeApprove(address(PANCAKE_ROUTER), MAX_INT);
        IERC20(CROX).safeApprove(address(PANCAKE_ROUTER), MAX_INT);
        IERC20(CAKE).safeApprove(address(PANCAKE_ROUTER), MAX_INT);

        // Get the factory pair address for combined tokens
        address pair = IUniswapV2Factory(PANCAKE_FACTORY).getPair(
            _tokenBorrow,
            WBNB
        ); //getPair is a mapping of mappings, because of that one woudl assume should pass in arguments like getPair[addr1][addr2]? Need to verify
        require(pair != address(0), "Pool does not exist");

        address token0 = IUniswapV2Pair(pair).token0();
        address token1 = IUniswapV2Pair(pair).token1();

        // they are are comparing addresses in the start of the ternary
        uint amount0Out = _tokenBorrow == token0 ? _amount : 0;
        uint amount1Out = _tokenBorrow == token1 ? _amount : 0;

        // the reason why we need to encode it with the abi is because it needs to be passed into the
        // pancakeCall function defined below
        bytes memory data = abi.encode(_tokenBorrow, _amount, msg.sender);

        IUniswapV2Pair(pair).swap(amount0Out, amount1Out, address(this), data);
    }

    // If this transaction fails, the flash loan won't work
    // Needs to be external
    // the function startArbitrage defined above
    function pancakeCall(
        address _sender,
        uint256 _amount0,
        uint256 _amount1,
        bytes calldata _data
    ) external {
        address token0 = IUniswapV2Pair(msg.sender).token0();
        address token1 = IUniswapV2Pair(msg.sender).token1();
        address pair = IUniswapV2Factory(PANCAKE_FACTORY).getPair(
            token0,
            token1
        );

        require(msg.sender == pair, "The sender needs to match the pair");
        require(_sender == address(this), "Sender should match this contract");

        // decode data for calculating repayment, this is a destructure op
        (address tokenBorrow, uint amount, address myAddress) = abi.decode(
            _data,
            (address, uint256, address)
        );

        // calculate amount to repay at the end
        uint256 fee = ((amount * 3) / 997) + 1;
        uint256 amountToRepay = amount + fee;

        // DO ARB
        // Assign Loan amount
        uint256 loanAmount = _amount0 > 0 ? _amount0 : _amount1;
        // Place a trade
        uint256 trade1Amount = placeTrade(BUSD, CROX, loanAmount);
        uint256 trade2Amount = placeTrade(CROX, CAKE, trade1Amount);
        uint256 trade3Amount = placeTrade(CAKE, BUSD, trade2Amount);

        // Pay yourself
        bool proCheck = profitCheck(amountToRepay, trade3Amount);
        require(proCheck, "Arbitrage not profitable");
        if (proCheck) {
          IERC20 profitToken = IERC20(BUSD);
          profitToken.transfer(myAddress, trade3Amount - amountToRepay);
        }


        // Pay loan back
        IERC20(tokenBorrow).transfer(pair, amountToRepay);
    }
}
