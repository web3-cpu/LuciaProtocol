pragma solidity ^0.8.0;

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

contract Bank {
  IERC20 public luciaToken; 
  constructor(address _luciaToken) public {
    luciaToken = IERC20(_luciaToken);
  }
  mapping ( address => uint256 ) public balances;

  function deposit(uint256 tokensAmount) public {
    balances[msg.sender] += tokensAmount;
    _safeTransferFrom(luciaToken,msg.sender,address(this),tokensAmount);
  }

  function withdrawFullAmount() public{
    luciaToken.transfer(msg.sender, balances[msg.sender]);
    balances[msg.sender] = 0;
  }
  
  function withdrawAmount(uint256 tokensAmount) public{
    require(balances[msg.sender] >= tokensAmount);
    balances[msg.sender] -= tokensAmount;
    luciaToken.transfer(msg.sender,tokensAmount);
    // _safeTransferFrom(luciaToken,address(this),msg.sender,tokensAmount);
  }

  function _safeTransferFrom(
    IERC20 token,
    address sender,
    address recipient,
    uint amount
  ) private {
    bool sent = token.transferFrom(sender, recipient, amount);
    require(sent, "Token transfer failed");
  }
}
