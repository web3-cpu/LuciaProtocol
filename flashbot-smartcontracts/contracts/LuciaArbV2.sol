//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "./LuciaArb.sol";

contract LuciaArbV2 is LuciaArb {
    address[] public routers;
    address[] public tokens;
    address[] public stables;

    function addRouters(address[] calldata _routers) external onlyOwner {
        for (uint i = 0; i < _routers.length; i++) {
            routers.push(_routers[i]);
        }
    }

    function addTokens(address[] calldata _tokens) external onlyOwner {
        for (uint i = 0; i < _tokens.length; i++) {
            tokens.push(_tokens[i]);
        }
    }

    function addStables(address[] calldata _stables) external onlyOwner {
        for (uint i = 0; i < _stables.length; i++) {
            stables.push(_stables[i]);
        }
    }

    /*
    Base Asset > Altcoin > Stablecoin > Altcoin > Base Asset
  */
    function instaSearch(
        address _router,
        address _baseAsset,
        uint256 _amount
    ) external view returns (uint256, address, address, address) {
        uint256 amtBack;
        address token1;
        address token2;
        address token3;
        for (uint i1 = 0; i1 < tokens.length; i1++) {
            for (uint i2 = 0; i2 < stables.length; i2++) {
                for (uint i3 = 0; i3 < tokens.length; i3++) {
                    amtBack = getAmountOutMin(
                        _router,
                        _baseAsset,
                        tokens[i1],
                        _amount
                    );
                    amtBack = getAmountOutMin(
                        _router,
                        tokens[i1],
                        stables[i2],
                        amtBack
                    );
                    amtBack = getAmountOutMin(
                        _router,
                        stables[i2],
                        tokens[i3],
                        amtBack
                    );
                    amtBack = getAmountOutMin(
                        _router,
                        tokens[i3],
                        _baseAsset,
                        amtBack
                    );
                    if (amtBack > _amount) {
                        token1 = tokens[i1];
                        token2 = tokens[i2];
                        token3 = tokens[i3];
                        break;
                    }
                }
            }
        }
        return (amtBack, token1, token2, token3);
    }

    function instaTrade(
        address _router1,
        address _token1,
        address _token2,
        address _token3,
        address _token4,
        uint256 _amount
    ) external onlyOwner {
        uint startBalance = IERC20(_token1).balanceOf(address(this));
        uint token2InitialBalance = IERC20(_token2).balanceOf(address(this));
        uint token3InitialBalance = IERC20(_token3).balanceOf(address(this));
        uint token4InitialBalance = IERC20(_token4).balanceOf(address(this));
        _swap(_router1, _token1, _token2, _amount);
        uint tradeableAmount2 = IERC20(_token2).balanceOf(address(this)) -
            token2InitialBalance;
        _swap(_router1, _token2, _token3, tradeableAmount2);
        uint tradeableAmount3 = IERC20(_token3).balanceOf(address(this)) -
            token3InitialBalance;
        _swap(_router1, _token3, _token4, tradeableAmount3);
        uint tradeableAmount4 = IERC20(_token4).balanceOf(address(this)) -
            token4InitialBalance;
        _swap(_router1, _token4, _token1, tradeableAmount4);
        require(
            IERC20(_token1).balanceOf(address(this)) > startBalance,
            "Trade Reverted, No Profit Made"
        );
    }
}
