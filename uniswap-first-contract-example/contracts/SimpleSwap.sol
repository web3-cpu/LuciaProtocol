pragma solidity =0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract SimpleSwap {
    ISwapRouter public immutable swapRouter;
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint24 public constant feeTier = 3000;

    // new tokens

    address public constant SHIB = 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE;
    address public constant RLB = 0x046EeE2cc3188071C02BfC1745A6b17c656e3f3d; //rollbit
    address public constant MKR = 0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2;
    // end new tokens
    mapping(string => address) private registry;

    
    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
        registry['SHIB'] = 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE;
        registry['RLB'] = 0x046EeE2cc3188071C02BfC1745A6b17c656e3f3d;
        registry['MKR'] = 0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2;
    }
    
    function swapWETHForDAI(uint amountIn) external returns (uint256 amountOut) {
        // Transfer the specified amount of WETH9 to this contract.
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        // Approve the router to spend WETH9.
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);
        // Create the params that will be used to execute the swap
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: WETH9,
                tokenOut: DAI,
                fee: feeTier,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
        return amountOut; 
    }

    // needs to have keyword memory for testing
    function getAddress(string memory str) public view returns (address) {
        return registry[str];
    }

    function swapXForY(uint amountIn) external returns (uint256 amountOut) {
        // I can write TransferHelper with any arbitrary supported token 

    }
}