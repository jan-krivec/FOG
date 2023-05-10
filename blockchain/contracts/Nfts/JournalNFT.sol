//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract JournalNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Journal {
        string title;
        string description;
        string[] keywords;
        address[] authors;
        address[] reviewers;
        address editor;
        mapping(address => bool) votes;
        bool published;
    }

    mapping(uint256 => Journal) private _journals;

    constructor() ERC721("JournalNFT", "JournalNFT") {}

    function mintNFT(
        string memory title,
        string memory description,
        string[] memory keywords,
        address[] memory authors,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenUri(newItemId, tokenURI);

        return newItemId;
    }
}
