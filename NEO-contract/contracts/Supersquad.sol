// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);
}

contract Challenge {
    IERC20 public usdc;
    ILendingPool public lendingPool;
    struct Pool {
        mapping(address => uint256) deposits;
        bool active;
    }
    mapping(uint256 => Pool) public pools;

    constructor(address _usdc, address _lendingPool) public {
        usdc = IERC20(_usdc);
        lendingPool = ILendingPool(_lendingPool);
    }

    function createPool(uint256 challengeId) external {
        pools[challengeId] = Pool({active: true});
    }

    function deposit(uint256 challengeId, uint256 amount) external {
        require(pools[challengeId].active, "Challenge is not active");
        usdc.transferFrom(msg.sender, address(this), amount);
        pools[challengeId].deposits[msg.sender] += amount;
    }

    function withdraw(uint256 challengeId, uint256 amount) external {
        require(
            pools[challengeId].deposits[msg.sender] >= amount,
            "Insufficient balance"
        );
        pools[challengeId].deposits[msg.sender] -= amount;
        usdc.transfer(msg.sender, amount);
    }

    function depositToAave(uint256 challengeId) external {
        uint256 amount = usdc.balanceOf(address(this));
        usdc.approve(address(lendingPool), amount);
        lendingPool.deposit(address(usdc), amount, address(this), 0);
    }

    function withdrawFromAave(uint256 challengeId, uint256 amount) external {
        lendingPool.withdraw(address(usdc), amount, address(this));
    }

    function endChallenge(uint256 challengeId) external {
        pools[challengeId].active = false;
    }
}
