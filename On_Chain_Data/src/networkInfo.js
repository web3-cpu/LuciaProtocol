const compoundNetworkInfo = [
  { network: "mainnet", address: "0xc3d688B66703497DAA19211EEdff47f25384cdc3" },
  { network: "matic", address: "0xF25212E676D1F7F89Cd72fFEe66158f541246445" },
  {
    network: "arbitrum",
    address: "0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA",
  },
];

const aaveV3NetworkInfo = [
  { network: "mainnet", address: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2" },
  {
    network: "optimism",
    address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  },
  {
    network: "arbitrum",
    address: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
  },
];

const aaveV2NetworkInfo = [
  { network: "mainnet", address: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9" },
  {
    network: "matic",
    address: "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf",
  },
  {
    network: "avalanche",
    address: "0x4235E22d9C3f28DCDA82b58276cb6370B01265C2",
  },
];

const aaveABI = [
  "event LiquidationCall(address indexed collateralAsset, address indexed debtAsset, address indexed user, uint256 debtToCover, uint256 liquidatedCollateralAmount, address liquidator, bool receiveAToken)",
];

const compoundABI = [
  "event AbsorbCollateral(address indexed absorber, address indexed borrower, address indexed asset, uint collateralAbsorbed, uint usdValue)",
];

module.exports = {
  aaveABI,
  compoundABI,
  aaveV3NetworkInfo,
  compoundNetworkInfo,
};
