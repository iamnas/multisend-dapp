// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract Multisend {
    // error Multisend__TransactionFailed();

    function send(
        address payable[] calldata _address,
        uint256[] calldata _amount
    ) external payable {
        require(_address.length == _amount.length, "Should have same length");
        uint length = _address.length;
        for (uint i = 0; i < length; i++) {
            // _address[i].call(_amount[i]);
            (bool callSuccess, ) = _address[i].call{value: _amount[i]}("");

            require(callSuccess, "Multisend__TransactionFailed");
        }
    }
}
