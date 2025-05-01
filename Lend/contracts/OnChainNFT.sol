// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.21;

// import {ERC721Upgradeable} from "openzeppelin-contracts-upgradeable/contracts/token/ERC721/ERC721Upgradeable.sol";
// import {PausableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/utils/PausableUpgradeable.sol";
// import {OwnableUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
// import {UUPSUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
// import {NoncesUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/utils/NoncesUpgradeable.sol";
// import {MessageHashUtils} from "openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";
// import {Initializable} from "openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
// import {ECDSA} from "openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";

// // import {CountersUpgradeable} from "openzeppelin-contracts-upgradeable/contracts/utils/CountersUpgradeable.sol";

// contract OnChainNFT is
//     Initializable,
//     ERC721Upgradeable,
//     PausableUpgradeable,
//     OwnableUpgradeable,
//     UUPSUpgradeable,
//     NoncesUpgradeable
// {
//     function initialize() public initializer {
//         __ERC721_init("OnChainNFT", "OCNFT");
//         __Pausable_init();
//         __UUPSUpgradeable_init();
//         __Nonces_init();
//         __Ownable_init(msg.sender);
//     }

//     /**
//      * @notice sets the address of the new logic contract
//      * @ This function MUST be included in each iteration of this contract, otherwise upgradeability will be lost!
//      */
//     function _authorizeUpgrade(address newImplementation) internal override {}

//     using ECDSA for bytes32;
//     using MessageHashUtils for bytes32;

//     // Event emitted when a new token is minted
//     event TokenMinted(
//         uint256 timestamp,
//         address indexed _recipient,
//         uint256 indexed _tokenId,
//         address[] _addressBundle
//     );

//     event BundleUpdate(
//         uint256 timestamp,
//         address indexed executor,
//         uint256 indexed tokenId,
//         address[] bundle
//     );

//     //  Mapping from tokenId to address array (bundle)
//     mapping(uint256 => address[]) private _addressBundle;

//     // mapping that connects all addresses of bundle (including primary)
//     // to primary address for which NFCS token was minted
//     mapping(address => address) private secondaryToPrimary;

//     // Mapping from tokenId to address array (bundle)
//     mapping(uint256 => address[]) private _tokenBundle;

//     //base URI for NFT Token
//     string baseUri;

//     uint private _tokenIdCounter;

//     bytes32 private constant _DOMAIN_TYPE_HASH =
//         keccak256("EIP712Domain(string name,string version)");

//     string private constant _PRIMARY_TYPE =
//         "PrimaryAddressSignature(address[] bundle)";
//     string private constant _SECONDARY_TYPE =
//         "SecondaryAddressSignature(address primary)";

//     /**
//      * @dev base URI setter
//      * @param uri URI string
//      */
//     function setBaseURI(string memory uri) external onlyOwner {
//         baseUri = uri;
//     }

//     /**
//      * @notice Pauses the whole contract; used as emergency response
//      */
//     function pause() external onlyOwner {
//         _pause();
//     }

//     /**
//      * @notice unpauses the contract; resumes functionality.
//      */
//     function unpause() external onlyOwner {
//         _unpause();
//     }

//     function mintToken(
//         address[] calldata bundle,
//         bytes[] calldata signatures
//     ) external {
//         require(bundle.length > 0 && bundle.length == signatures.length, "ll");

//         address primaryAddress = bundle[0];

//         require(secondaryToPrimary[primaryAddress] == address(0), "l");

//         secondaryToPrimary[primaryAddress] = primaryAddress;

//         uint256 tokenId = _tokenIdCounter;

//         _tokenBundle[tokenId].push(primaryAddress);

//         verifyAdd(bundle, signatures, tokenId);

//         _tokenIdCounter++;

//         _safeMint(primaryAddress, tokenId);

//         emit TokenMinted(block.timestamp, primaryAddress, tokenId, bundle);
//     }

//     /**
//      * @dev Add new address to existing bundle.
//      * @param bundle array of new addresses; first address is a primary address
//      * @param signatures signatures of bundle;
//      * @notice first signature is from primary address that confirms bundle addresses
//      * @notice other signatures are from bundle addresses which confirm primary address
//      * @param version version of NFCS contract
//      */
//     function addAddressToBundle(
//         address[] memory bundle,
//         bytes[] memory signatures
//     ) external {
//         require(bundle.length > 1 && bundle.length == signatures.length);
//         // uint256 tokenId = tokenOfOwnerByIndex(bundle[0], 0);

//         verifyAdd(bundle, signatures, 0);

//         emit BundleUpdate(block.timestamp, bundle[0], 0, bundle);
//     }

//     /**
//      * @dev Returns primary address for secondary address of bundle.
//      * @param user secondary address in bundle
//      * @return address primary address of bundle
//      */
//     function getPrimaryAddress(address user) external view returns (address) {
//         return secondaryToPrimary[user];
//     }

//     function _baseURI() internal view override returns (string memory) {
//         return baseUri;
//     }

//     /**
//      * @notice returns true if a given interface is supported
//      */
//     function supportsInterface(
//         bytes4 interfaceId
//     ) public view override(ERC721Upgradeable) returns (bool) {
//         return super.supportsInterface(interfaceId);
//     }

//     /**
//    * @notice Removing some ERC721 functionality not yet needed.-----------------
//      @dev the functions below are all impotent and all revert when called.
//    */

//     function approve(
//         address,
//         uint256
//     ) public virtual override(ERC721Upgradeable) {
//         revert("ModifiedApprove: cannot approve other addresses");
//     }

//     function getApproved(
//         uint256
//     ) public view virtual override(ERC721Upgradeable) returns (address) {
//         revert("ModifiedGetApproved: cannot get approved address");
//     }

//     function setApprovalForAll(
//         address,
//         bool
//     ) public virtual override(ERC721Upgradeable) {
//         revert(
//             "ModifiedSetApprovedForAll: cannot set approved address for all owned tokens"
//         );
//     }

//     function isApprovedForAll(
//         address,
//         address
//     ) public view virtual override(ERC721Upgradeable) returns (bool) {
//         revert("ModifiedIsApprovedForAll: cannot check approval");
//     }

//     function transferFrom(
//         address,
//         address,
//         uint256
//     ) public virtual override(ERC721Upgradeable) {
//         revert("ModifiedTransferFrom: transferFrom not supported");
//     }

//     function safeTransferFrom(
//         address,
//         address,
//         uint256,
//         bytes memory
//     ) public virtual override(ERC721Upgradeable) {
//         revert("ModifiedSafeTransferFrom: safeTransferFrom not supported");
//     }

//     function verifyAdd(
//         address[] calldata bundle,
//         bytes[] calldata signatures,
//         uint256 tokenId
//     ) internal {
//         require(hash(bundle[0], signatures[0]), "lk");

//         for (uint256 i = 1; i < bundle.length; i++) {
//             require(hash(bundle[i], signatures[i]), "li");

//             secondaryToPrimary[bundle[i]] = bundle[0];
//             _tokenBundle[tokenId].push(bundle[i]);
//         }
//     }

//     function hash(
//         address signer,
//         bytes calldata signature
//     ) internal returns (bool) {
//         bytes32 signedMessageHash = keccak256(
//             abi.encode(signer, _useNonce(signer))
//         ).toEthSignedMessageHash();

//         address recoveredSigner = signedMessageHash.recover(signature);
//         return signer == recoveredSigner;
//     }
// }
