const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

module.exports = {


  networks: {
    op_bnb: {
      provider: () => new HDWalletProvider(
        {
          privateKeys: [
            process.env.PK_CUBI_MAINNET
          ],
          providerOrUrl:  `https://opbnb-mainnet-rpc.bnbchain.org`
        }),
      networkCheckTimeout: 600000,
      network_id: 204,       // Ropsten's id
      gas: 5_000_000,  // 20 gwei (in wei) (default: 100 gwei)
      gasPrice: 1_000_000,  // 20 gwei (in wei) (default: 100 gwei)
      confirmations: 0,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
  },
  solc: {
    optimizer: { // Turning on compiler optimization that removes some local variables during compilation
      enabled: true,
      runs: 200
    }
  }
  ,
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.SCAN_API_KEY
  }
};
