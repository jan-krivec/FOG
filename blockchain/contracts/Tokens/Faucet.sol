// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    event Transfer(address indexed from, address to, uint256 value);
}

contract Faucet {
    address payable owner;
    IERC20 public dapoToken;

    uint256 public withdrawAmount = 100 * (10 ** 18);
    uint256 public lockTime = 1 minutes;

    event Withdraw(address indexed to, uint256 withdraw);
    event Deposit(address indexed from, uint256 amount);

    mapping(address => uint256) nextAccessTime;

    constructor(address tokenAddress) payable {
        dapoToken = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    function requestTokens() public {
        require(
            msg.sender != address(0),
            "Request must not originate from a zero address"
        );

        require(
            dapoToken.balanceOf(address(this)) >= withdrawAmount,
            "Insufficient balance in faucet for withdraw"
        );

        require(
            block.timestamp >= nextAccessTime[msg.sender],
            "Insufficient time elapsed since last withdraw -- try again in a minute"
        );

        nextAccessTime[msg.sender] = block.timestamp + lockTime;
        dapoToken.transfer(msg.sender, withdrawAmount);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external view returns (uint256) {
        return dapoToken.balanceOf(address(this));
    }

    function setWithdrawAmount(uint256 amount) public onlyOwner {
        withdrawAmount = amount * (10 ** 18);
    }

    function setLockTime(uint256 amount) public onlyOwner {
        lockTime = amount * 1 minutes;
    }

    function withdraw() external onlyOwner {
        emit Withdraw(msg.sender, dapoToken.balanceOf(address(this)));

        dapoToken.transfer(msg.sender, dapoToken.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function!"
        );
        _;
    }
}
