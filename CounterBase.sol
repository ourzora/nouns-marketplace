// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CounterBase {
    uint256 private _count;

    event Increment(address indexed caller, uint256 newValue);
    event Decrement(address indexed caller, uint256 newValue);

    function current() external view returns (uint256) {
        return _count;
    }

    function inc() external {
        unchecked { _count += 1; }
        emit Increment(msg.sender, _count);
    }

    function dec() external {
        require(_count > 0, "Counter: underflow");
        unchecked { _count -= 1; }
        emit Decrement(msg.sender, _count);
    }
}
