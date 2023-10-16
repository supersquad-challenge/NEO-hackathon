require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const NEO_PRIVATE_KEY = process.env.NEO_PRIVATE_KEY;

module.exports = {
  defaultNetwork: 'hardhat',
  solidity: '0.6.12',
  networks: {
    neoEvmTestnet: {
      url: 'https://evm.ngd.network:32332', // 네트워크 URL
      chainId: 2970385, // 체인 ID
      accounts: [NEO_PRIVATE_KEY], // 개인 키
    },
  },
};
