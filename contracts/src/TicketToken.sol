// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TicketToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Ticket", "TIC") {
        _mint(msg.sender, initialSupply);
    }
}
