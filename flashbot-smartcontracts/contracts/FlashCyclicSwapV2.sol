//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

interface IDODO {
    function flashLoan(
        uint256 baseAmount,
        uint256 quoteAmount,
        address assetTo,
        bytes calldata data
    ) external;

    function _BASE_TOKEN_() external view returns (address);

    function _QUOTE_TOKEN_() external view returns (address);
}

interface IUniswapV2Router {
    function getAmountsOut(
        uint256 amountIn,
        address[] memory path
    ) external view returns (uint256[] memory amounts);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

interface IUniswapV2Pair {
    function token0() external view returns (address);

    function token1() external view returns (address);

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;
}

contract FlashCyclicSwapV2 is Ownable {
    function _swap(
        address router,
        address _tokenIn,
        address _tokenOut,
        uint256 _amount
    ) internal {
        IERC20(_tokenIn).approve(router, _amount);
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;
        uint deadline = block.timestamp + 300;
        IUniswapV2Router(router).swapExactTokensForTokens(
            _amount,
            1,
            path,
            address(this),
            deadline
        );
    }

    function getAmountOutMin(
        address router,
        address _tokenIn,
        address _tokenOut,
        uint256 _amount
    ) public view returns (uint256) {
        if (_amount == 0) return 0;
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;
        uint256 result = 0;
        try IUniswapV2Router(router).getAmountsOut(_amount, path) returns (
            uint256[] memory amountOutMins
        ) {
            result = amountOutMins[path.length - 1];
        } catch {}
        return result;
    }

    function searchArb(
        address[][] memory _routers,
        address[][] memory _tokens
    )
        external
        view
        returns (address[] memory, address[] memory, uint, uint, uint8)
    {
        address[] memory routers;
        address[] memory tokens;
        uint amountIn;
        uint amountOut;
        uint8 decimals;
        for (uint i = 0; i < _routers.length; i++) {
            address[] memory routerPath = _routers[i];
            for (uint j = 0; j < _tokens.length; j++) {
                address[] memory tokenPath = _tokens[j];
                uint8 dec = IERC20(tokenPath[0]).decimals();
                uint amount = 10 ** dec / 10000;
                uint amtBack = amount;
                for (uint ii = 0; ii < routerPath.length - 1; ii++) {
                    amtBack = getAmountOutMin(
                        routerPath[ii],
                        tokenPath[ii],
                        tokenPath[ii + 1],
                        amtBack
                    );
                }
                amtBack = getAmountOutMin(
                    routerPath[routerPath.length - 1],
                    tokenPath[routerPath.length - 1],
                    tokenPath[0],
                    amtBack
                );
                if (amtBack > amount) {
                    routers = routerPath;
                    tokens = tokenPath;
                    amountIn = amount;
                    amountOut = amtBack;
                    decimals = dec;
                    break;
                }
            }
        }
        return (routers, tokens, amountIn, amountOut, decimals);
    }

    function estimateCyclicArbTrade(
        address[] memory _routers,
        address[] memory _tokens,
        uint256 _amount
    ) external view returns (uint256) {
        uint amtBack = _amount;
        for (uint i = 0; i < _tokens.length - 1; i++) {
            amtBack = getAmountOutMin(
                _routers[i],
                _tokens[i],
                _tokens[i + 1],
                amtBack
            );
        }
        amtBack = getAmountOutMin(
            _routers[_tokens.length - 1],
            _tokens[_tokens.length - 1],
            _tokens[0],
            amtBack
        );
        return amtBack;
    }

    function triArbTrade(
        address[] memory _routers,
        address[] memory _tokens,
        uint256 _amount
    ) external onlyOwner {
        _triArbTrade(_routers, _tokens, _amount);
    }

    function _triArbTrade(
        address[] memory _routers,
        address[] memory _tokens,
        uint256 _amount
    ) private {
        uint[] memory initTokenBalances = new uint[](_tokens.length);
        uint[] memory tokenBalances = new uint[](_tokens.length);
        uint tradeableAmount = _amount;

        for (uint i = 0; i < _tokens.length - 1; i++) {
            initTokenBalances[i + 1] = IERC20(_tokens[i + 1]).balanceOf(
                address(this)
            );
            _swap(_routers[i], _tokens[i], _tokens[i + 1], tradeableAmount);
            tokenBalances[i + 1] = IERC20(_tokens[i + 1]).balanceOf(
                address(this)
            );
            tradeableAmount = tokenBalances[i + 1] - initTokenBalances[i + 1];
        }

        initTokenBalances[0] = IERC20(_tokens[0]).balanceOf(address(this));
        _swap(
            _routers[_tokens.length - 1],
            _tokens[_tokens.length - 1],
            _tokens[0],
            tradeableAmount
        );
        tokenBalances[0] = IERC20(_tokens[0]).balanceOf(address(this));
        tradeableAmount = tokenBalances[0] - initTokenBalances[0];

        // console.log("_amount: ", _amount);
        // console.log("tradeableAmount: ", tradeableAmount);

        require(tradeableAmount > _amount, "Trade Reverted, No Profit Made");
    }

    function getBalance(
        address _tokenContractAddress
    ) external view returns (uint256) {
        uint balance = IERC20(_tokenContractAddress).balanceOf(address(this));
        return balance;
    }

    function withdrawEth() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawTokens(address tokenAddress) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    receive() external payable {}

    /**
     * Flash loan based swap logic
     * flash loan from DODOEX
     * swap tokens on any routers
     */
    function startFlashSwap(
        address _flashLoanPool,
        uint256 _loanAmount,
        address[] memory _routers,
        address[] memory _tokens
    ) external onlyOwner {
        //Note: The data can be structured with any variables required by our logic. The following code is just an example
        bytes memory data = abi.encode(
            _flashLoanPool,
            _loanAmount,
            _routers,
            _tokens
        );
        address flashLoanBase = IDODO(_flashLoanPool)._BASE_TOKEN_();
        if (flashLoanBase == _tokens[0]) {
            IDODO(_flashLoanPool).flashLoan(
                _loanAmount,
                0,
                address(this),
                data
            );
        } else {
            IDODO(_flashLoanPool).flashLoan(
                0,
                _loanAmount,
                address(this),
                data
            );
        }
    }

    //Note: CallBack function executed by DODOV2(DVM) flashLoan pool
    function DVMFlashLoanCall(
        address sender,
        uint256 baseAmount,
        uint256 quoteAmount,
        bytes calldata data
    ) external {
        _flashLoanCallBack(sender, baseAmount, quoteAmount, data);
    }

    //Note: CallBack function executed by DODOV2(DPP) flashLoan pool
    function DPPFlashLoanCall(
        address sender,
        uint256 baseAmount,
        uint256 quoteAmount,
        bytes calldata data
    ) external {
        _flashLoanCallBack(sender, baseAmount, quoteAmount, data);
    }

    //Note: CallBack function executed by DODOV2(DSP) flashLoan pool
    function DSPFlashLoanCall(
        address sender,
        uint256 baseAmount,
        uint256 quoteAmount,
        bytes calldata data
    ) external {
        _flashLoanCallBack(sender, baseAmount, quoteAmount, data);
    }

    function _flashLoanCallBack(
        address sender,
        uint256,
        uint256,
        bytes calldata data
    ) internal {
        // abi.encode(_flashLoanPool, _loanAmount, _router1, _router2, _router3, _token1, _token2, _token3);
        (
            address flashLoanPool,
            uint256 loanAmount,
            address[] memory routers,
            address[] memory tokens
        ) = abi.decode(data, (address, uint256, address[], address[]));

        require(
            sender == address(this) && msg.sender == flashLoanPool,
            "DODO_FLASH_FAILED"
        );
        // console.log("routers %s, %s, %s", routers[0], routers[1], routers[2]);
        // console.log("tokens %s, %s, %s", tokens[0], tokens[1], tokens[2]);
        //Note: Implementing the logic for trade, using the token from flashLoan pool.
        _triArbTrade(routers, tokens, loanAmount);
        //Return funds
        IERC20(tokens[0]).transfer(flashLoanPool, loanAmount);
    }
}
