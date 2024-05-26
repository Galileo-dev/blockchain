// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import { console2 } from "forge-std/src/console2.sol";
import { TicketToken } from "../src/TicketToken.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract TicketTokenTest is Test {
    TicketToken internal token;

    function setUp() public virtual {
        vm.deal(address(this), 1 ether);
        token = new TicketToken(1000, 0.00001 ether);
    }

    function invariantMetadata() public view {
        assertEq(token.name(), "Ticket");
        assertEq(token.symbol(), "TIC");
        assertEq(token.decimals(), 0);
    }

    function testBuyTicket() public {
        token.buyTicket{value: 0.00001 ether}();
        uint256 expectedTokenAmount = 1;
        assertEq(token.balanceOf(address(this)), expectedTokenAmount);
    }

    function testBuyMultipleTickets() public {
        token.buyTicket{value: 0.00002 ether}();
        uint256 expectedTokenAmount = 2;
        assertEq(token.balanceOf(address(this)), expectedTokenAmount);
    }

    function testBuyTicketWithInsufficientEther() public {
        vm.expectRevert("Not enough ether sent; check price!");
        token.buyTicket{value: 0.000009 ether}();
    }
}
