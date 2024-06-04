// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { TicketToken } from "../src/TicketToken.sol";
import { Script } from "forge-std/src/Script.sol";

contract MyScript is Script {
    function run() external returns (TicketToken) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        TicketToken ticketToken = new TicketToken(1000, 0.00001 ether);

        vm.stopBroadcast();

        return ticketToken;
    }
}
