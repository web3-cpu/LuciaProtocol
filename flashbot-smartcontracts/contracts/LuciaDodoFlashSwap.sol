//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

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

contract LuciaDodoFlashSwap is Ownable {
    address[] public routers;
    address[] public tokens;

    struct ArbOpp {
        address router1;
        address router2;
        address router3;
        address token1;
        address token2;
        uint256 amtBack;
        uint256 profitPercent;
    }

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

    function estimateTriArbTrade(
        address _router1,
        address _router2,
        address _router3,
        address _token1,
        address _token2,
        address _token3,
        uint256 _amount
    ) external view returns (uint256) {
        uint amtBack;
        amtBack = _token1 != _token2 ? getAmountOutMin(_router1, _token1, _token2, _amount) : _amount;
        amtBack = _token2 != _token3 ? getAmountOutMin(_router2, _token2, _token3, amtBack) : amtBack;
        amtBack = _token3 != _token1 ? getAmountOutMin(_router3, _token3, _token1, amtBack) : amtBack;
        return amtBack;
    }

    function triArbTrade(
        address _router1,
        address _router2,
        address _router3,
        address _token1,
        address _token2,
        address _token3,
        uint256 _amount
    ) external {
        _triArbTrade(
            _router1,
            _router2,
            _router3,
            _token1,
            _token2,
            _token3,
            _amount
        );
    }

    function _triArbTrade(
        address _router1,
        address _router2,
        address _router3,
        address _token1,
        address _token2,
        address _token3,
        uint256 _amount
    ) private {
        uint startBalance = IERC20(_token1).balanceOf(address(this));
        uint token2InitialBalance = IERC20(_token2).balanceOf(address(this));
        uint token3InitialBalance = IERC20(_token3).balanceOf(address(this));
        uint tradeableAmount;
        if(_token1 != _token2) {
            _swap(_router1, _token1, _token2, _amount);
            uint token2Balance = IERC20(_token2).balanceOf(address(this));
            tradeableAmount = token2Balance - token2InitialBalance;
        } else {
            tradeableAmount = _amount;
        }
        if (_token2 != _token3) {
            _swap(_router2, _token2, _token3, tradeableAmount);
            uint token3Balance = IERC20(_token3).balanceOf(address(this));
            tradeableAmount = token3Balance - token3InitialBalance;
        }
        if (_token3 != _token1) {
            _swap(_router3, _token3, _token1, tradeableAmount);
        }
        uint endBalance = IERC20(_token1).balanceOf(address(this));
        require(endBalance > startBalance, "Trade Reverted, No Profit Made");
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

    function addTokens(address[] calldata _tokens) external onlyOwner {
        for (uint i = 0; i < _tokens.length; i++) {
            tokens.push(_tokens[i]);
        }
    }

    function addRouters(address[] calldata _routers) external onlyOwner {
        for (uint i = 0; i < _routers.length; i++) {
            routers.push(_routers[i]);
        }
    }

    function _triCrossSearch(
        address _router1,
        address _router2,
        address _router3,
        address _baseToken,
        uint256 _amount
    ) private view returns (uint256, uint256, address, address) {
        uint256 amtBack;
        uint256 profitPercent;
        address token1;
        address token2;
        for (uint i1 = 0; i1 < tokens.length; i1++) {
            for (uint i2 = 0; i2 < tokens.length; i2++) {
                amtBack = getAmountOutMin(
                    _router1,
                    _baseToken,
                    tokens[i1],
                    _amount
                );

                amtBack = getAmountOutMin(
                    _router2,
                    tokens[i1],
                    tokens[i2],
                    amtBack
                );

                amtBack = getAmountOutMin(
                    _router3,
                    tokens[i2],
                    _baseToken,
                    amtBack
                );
                // console.log("amtBack: %s, tokens[i1]: %s, tokens[i2]: %s", amtBack, tokens[i1], tokens[i2]);

                if (amtBack > _amount) {
                    token1 = tokens[i1];
                    token2 = tokens[i2];
                    profitPercent = (amtBack * 100) / _amount;
                    console.log("profitPercentage: ", profitPercent);
                    break;
                }
            }
        }
        return (amtBack, profitPercent, token1, token2);
    }

    function triCrossSearch(
        address _baseToken,
        uint256 _amount
    ) external view returns (ArbOpp memory) {
        for (uint i1 = 0; i1 < routers.length; i1++) {
            for (uint i2 = 0; i2 < routers.length; i2++) {
                for (uint i3 = 0; i3 < routers.length; i3++) {
                    (
                        uint256 amtBack,
                        uint256 profitPercent,
                        address token1,
                        address token2
                    ) = _triCrossSearch(
                            routers[i1],
                            routers[i2],
                            routers[i3],
                            _baseToken,
                            _amount
                        );
                    if (profitPercent > 100) {
                        ArbOpp memory arbOpp = ArbOpp({
                            router1: routers[i1],
                            router2: routers[i2],
                            router3: routers[i3],
                            token1: token1,
                            token2: token2,
                            amtBack: amtBack,
                            profitPercent: profitPercent
                        });
                        return arbOpp;
                    }
                }
            }
        }
        return
            ArbOpp(
                address(0),
                address(0),
                address(0),
                address(0),
                address(0),
                0,
                0
            );
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
        address _router1,
        address _router2,
        address _router3,
        address _token1,
        address _token2,
        address _token3
    ) external {
        //Note: The data can be structured with any variables required by our logic. The following code is just an example
        bytes memory data = abi.encode(
            _flashLoanPool,
            _loanAmount,
            _router1,
            _router2,
            _router3,
            _token1,
            _token2,
            _token3
        );
        address flashLoanBase = IDODO(_flashLoanPool)._BASE_TOKEN_();
        if (flashLoanBase == _token1) {
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
            address router1,
            address router2,
            address router3,
            address token1,
            address token2,
            address token3
        ) = abi.decode(
                data,
                (
                    address,
                    uint256,
                    address,
                    address,
                    address,
                    address,
                    address,
                    address
                )
            );

        require(
            sender == address(this) && msg.sender == flashLoanPool,
            "DODO_FLASH_FAILED"
        );

        //Note: Implementing the logic for trade, using the token from flashLoan pool.
        _triArbTrade(
            router1,
            router2,
            router3,
            token1,
            token2,
            token3,
            loanAmount
        );
        //Return funds
        IERC20(token1).transfer(flashLoanPool, loanAmount);
    }
}
