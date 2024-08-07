const { sumERC4626VaultsExport } = require("../helper/erc4626");
const { staking } = require("../helper/staking");
const config = {
  mantle: [
    "0xfa944c1996efBF9FbFF1a378903F4AD82C172D72",
    "0x945438ef559EFf400429DFb101e57a6299B5ceE2",
    "0xA25d1843eedE1E1D0631b979da605606412e64f7",
    "0xAa81F912D09Fd313Bbc1d5638632aB6bf59aB495",
    "0x0DB2BA00bCcf4F5e20b950bF954CAdF768D158Aa",
    "0x713C1300f82009162cC908dC9D82304A51F05A3E",
    "0xDc63179CC57783493DD8a4Ffd7367DF489Ae93BF",
    "0x5f247B216E46fD86A09dfAB377d9DBe62E9dECDA",
    "0xCbb95e8a63cd37D09c2948A22c12632469fb0BC7",
    "0x907a942ce79ca4Cf063d2e987024dc9E88C5ac98",
    "0xB2b593Ab057e99edbAA33258b5613227F64c80C6",
    "0x38B73D78c45b39B7658635fA753EfBE2d4077A33",
    "0x0ca817970d1Bf8789CCB26aC0a6b69d02b6dF34e",
    "0x16d6e3B2979C61D3fa399Cc7D65EFFaadd46682c",
  ],
  manta: [
    "0x713C1300f82009162cC908dC9D82304A51F05A3E",
    "0x0DB2BA00bCcf4F5e20b950bF954CAdF768D158Aa",
    "0xDc63179CC57783493DD8a4Ffd7367DF489Ae93BF",
    "0x5f247B216E46fD86A09dfAB377d9DBe62E9dECDA",
    "0x45C3BB1a0f0827bF03C089842334B861474e7714",
    "0x241d09eC72809C4C390BC81b81dEF4d1E0e88626",
  ],
  telos: [
    "0x67e07BFfce318ADbA7b08618CBf4B8E271499197",
    "0x70527810CB658FaDBe16845485fC79EC7722c860",
    "0xA0dD02ef78570a4d93b7eE334EA9c593F7A0ebc4",
    "0x4778CAAa0E52F0B58eAF5e947Ae81A0a10cDe707",
  ],
  arbitrum: [
    "0x8E99B66dE170b53b39D9B54f189a12D7c6AC0cd9"
  ],

  degen: [
    "0xA95417805d18d00844c3C6FB7742577Cd263fE05",
    "0x39dD79E8b1e74E8B514D7e133b3671435Ec3Da42",
    "0xE45F416eE25844281edF2780247E28569303c7Cd",
    "0xB9107C1Ad02bD2E20692499156F99411297d23F5",
    "0x17A6b417249D92A2F3F7a88384c5Aa88D0d95A28",
  ],

  bsquared: [
    "0xBC91a7a0eE37085af193C61747ecE693979Ec0C1",
    "0xD57a87a9101d567C4139247CdF149b1DA4c8604A"
  ],

  polygon: [
    "0x67e07BFfce318ADbA7b08618CBf4B8E271499197"
  ],

  core: [
    "0xBC91a7a0eE37085af193C61747ecE693979Ec0C1",
    "0x018BeE125A17D456E6dacE22A66E8B9aF3c69449",
  ],
}

const stakingDetails = {
  telos: {
    stakingContract: "0xC7c74fB5aa1b11d2e960B6cf9C057F67c8C602bc",
    stakingTokens: [
      "0x67e07BFfce318ADbA7b08618CBf4B8E271499197",
      "0xA0dD02ef78570a4d93b7eE334EA9c593F7A0ebc4",
      "0x4778CAAa0E52F0B58eAF5e947Ae81A0a10cDe707",
    ]
  },
  degen: {
    stakingContract: "0xA69D8E6995BF89BC0206a6C983874D8776dE0C4E",
    stakingTokens: [
      "0xA95417805d18d00844c3C6FB7742577Cd263fE05",
      "0x39dD79E8b1e74E8B514D7e133b3671435Ec3Da42",
      "0xE45F416eE25844281edF2780247E28569303c7Cd",
    ]
  },
  polygon: {
    stakingContract: "0x2c869eE61377290bbBE145b4f077113f2628Ce67",
    stakingTokens: [
      "0x67e07BFfce318ADbA7b08618CBf4B8E271499197",
    ]
  },
}


module.exports = {
  doublecounted: true,
};

Object.keys(config).forEach(chain => {
  const vaults = config[chain]
  const stakingC = stakingDetails[chain]
  if (stakingC) {
    module.exports[chain] = {
      tvl: sumERC4626VaultsExport({ vaults, tokenAbi: 'asset', balanceAbi: 'totalAssets' }),
      staking: staking(stakingC.stakingContract, stakingC.stakingTokens),
    };
  } else {
    module.exports[chain] = {
      tvl: sumERC4626VaultsExport({ vaults, tokenAbi: 'asset', balanceAbi: 'totalAssets' }),
    };
  }
}) 
