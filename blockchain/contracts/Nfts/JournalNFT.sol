//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; // IERC20 interface

contract JournalNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint public constant mintPrice = 1 ether;
    constructor() ERC721("JournalNFT", "JournalNFT") {}

    function mintNFT(string memory tokenURI, address author) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(author, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function buyNFT(string memory tokenURI, address payable author) public payable returns (uint256) {

        (bool sent, ) = author.call{value: 1 ether}("");
        require(sent, "Failed to send Ether");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
