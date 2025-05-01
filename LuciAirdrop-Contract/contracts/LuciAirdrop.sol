// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LuciAirdrop {
    uint public unlockTime;
    address payable public owner;
    IERC20 public token;

    mapping(address => uint256) private rewards;

    event WithdrawalToken(address indexed to, uint256 amount);
    event Withdraw(address indexed to, uint256 amount);
    event UnlockTimeSet(uint time);
    event AddBatchRewards(address[] _addr, uint256[] _rewards);

    constructor(address tokenAddr, uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        token = IERC20(tokenAddr);
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function setUnlockTime(uint _unlockTime) public onlyOwner {
        unlockTime = _unlockTime;
        emit UnlockTimeSet(unlockTime);
    }

    function getRewardsAmount() public view returns (uint256) {
        return rewards[msg.sender];
    }

    function addBatchRewards(
        address[] memory _addr,
        uint256[] memory _rewards
    ) public onlyOwner {
        require(
            _addr.length == _rewards.length,
            "Length of address and rewards should be same"
        );
        for (uint i = 0; i < _addr.length; i++)
            rewards[_addr[i]] += _rewards[i];

        emit AddBatchRewards(_addr, _rewards);
    }

    function withdraw() public {
        require(rewards[msg.sender] != 0, "Rewards should be greater than 0");
        uint256 amount = rewards[msg.sender];
        rewards[msg.sender] = 0;

        bool sent = token.transfer(msg.sender, amount);
        require(sent, "Token transfer failed");
        emit Withdraw(msg.sender, amount);
    }

    function withdrawByOwner(uint256 amount) public onlyOwner {
        uint256 tokenBalance = token.balanceOf(address(this));
        require(
            tokenBalance >= amount,
            "Insufficient token balance in contract"
        );

        bool sent = token.transfer(owner, amount);
        require(sent, "Token transfer failed");
        emit WithdrawalToken(owner, amount);
    }
}
