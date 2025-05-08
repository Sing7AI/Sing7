// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title MusicNFT
 * @dev ERC721 contract for minting music as NFTs with royalty functionality
 */
contract MusicNFT is ERC721URIStorage, ERC721Royalty, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) private _creators;
    
    // Events
    event MusicMinted(uint256 indexed tokenId, address indexed creator, string uri);
    event RoyaltySet(uint256 indexed tokenId, address indexed receiver, uint96 feeNumerator);
    
    // Constructor
    constructor() ERC721("Sing7 Music NFT", "SING7") {}
    
    /**
     * @dev Mints a new music NFT
     * @param recipient The address that will own the minted NFT
     * @param uri The IPFS URI containing music metadata
     * @param royaltyReceiver The address that will receive royalties
     * @param royaltyFeeNumerator The royalty fee numerator (e.g., 1000 for 10%)
     * @return tokenId The ID of the newly minted NFT
     */
    function mintMusic(
        address recipient, 
        string memory uri, 
        address royaltyReceiver, 
        uint96 royaltyFeeNumerator
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, uri);
        _setTokenRoyalty(newTokenId, royaltyReceiver, royaltyFeeNumerator);
        _creators[newTokenId] = msg.sender;
        
        emit MusicMinted(newTokenId, msg.sender, uri);
        emit RoyaltySet(newTokenId, royaltyReceiver, royaltyFeeNumerator);
        
        return newTokenId;
    }
    
    /**
     * @dev Burns a music NFT
     * @param tokenId The ID of the NFT to burn
     */
    function burnMusic(uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _burn(tokenId);
    }
    
    /**
     * @dev Gets the creator of a music NFT
     * @param tokenId The ID of the NFT
     * @return creator The address of the creator
     */
    function getCreator(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Token does not exist");
        return _creators[tokenId];
    }
    
    /**
     * @dev Updates the royalty information for a token
     * @param tokenId The ID of the NFT to set royalty info for
     * @param receiver The address that should receive royalties
     * @param feeNumerator The royalty fee numerator (e.g., 1000 for 10%)
     */
    function setTokenRoyalty(
        uint256 tokenId, 
        address receiver, 
        uint96 feeNumerator
    ) public {
        require(_isApprovedOrOwner(msg.sender, tokenId) || msg.sender == _creators[tokenId], 
                "Caller is not owner, approved, or creator");
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
        emit RoyaltySet(tokenId, receiver, feeNumerator);
    }
    
    // Override required functions due to multiple inheritance
    function _burn(uint256 tokenId) internal override(ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Royalty)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 