// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

pragma solidity >=0.7.0 <0.9.0;

contract ERC20FixedSupply is ERC20 {
    //@codeblock
    string constant contractName = "Fixed";
    //@codeblock
    string constant contractSymbol = "FIX";
    //@codeblock
    uint256 constant supply = 1000;

    constructor() ERC20(contractName, contractSymbol) {
        _mint(msg.sender, supply);
    }
}
