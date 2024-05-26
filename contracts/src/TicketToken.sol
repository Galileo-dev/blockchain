// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import { ERC20 } from "./tokens/ERC20.sol";

contract TicketToken is ERC20 {
    uint256 public ticketPrice;

    constructor(uint256 initialSupply, uint256 _ticketPrice) ERC20("Ticket", "TIC", 0) {
        ticketPrice = _ticketPrice;
       _mint(address(this), initialSupply * 10 ** uint256(decimals));
    }

    function buyTicket() external payable {
        require(msg.value >= ticketPrice, "Not enough ether sent; check price!");

        uint256 tokenAmount = (msg.value / ticketPrice) * 10 ** uint256(decimals);

        _transfer(address(this), msg.sender, tokenAmount);
    }


     function owner() public view returns (address) {
        return msg.sender;
    }
    
    function _transfer(address from, address to, uint256 amount) internal virtual {
        balanceOf[from] -= amount;

        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(from, to, amount);
    }
}
