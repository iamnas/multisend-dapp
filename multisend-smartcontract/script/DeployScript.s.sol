// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Multisend} from "../src/Multisend.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy the Multisend contract
        Multisend multisend = new Multisend();
        console.log("Multisend deployed at:", address(multisend));

        vm.stopBroadcast();
    }
}
