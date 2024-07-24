// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Multisend} from "../src/Multisend.sol";

contract MultiSendTest is Test {
    Multisend public multisend;

    function setUp() public {
        multisend = new Multisend();
    }

    function test_send() public {
        address payable[] memory recipients = new address payable[](2);
        uint[] memory amounts = new uint[](2);
        recipients[0] = payable(address(1));
        recipients[1] = payable(address(2));
        amounts[0] = 100;
        amounts[1] = 50;
        multisend.send{value: 150}(recipients, amounts);

        assertEq(recipients[0].balance, amounts[0]);
        assertEq(recipients[1].balance, amounts[1]);
    }

    function test_faildSend() public {
        address payable[] memory recipients = new address payable[](2);
        uint[] memory amounts = new uint[](1);
        recipients[0] = payable(address(1));
        recipients[1] = payable(address(2));
        amounts[0] = 100;
        vm.expectRevert("Should have same length");
        multisend.send{value: 150}(recipients, amounts);
    }
}
