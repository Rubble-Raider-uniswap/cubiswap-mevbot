const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

module.exports = {

  // migrations_directory: "./migrations/cubi",
  
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    op_bnb: {
      provider: () => new HDWalletProvider(
        {
          privateKeys: [
            // process.env.PK_ETHW_MAINNET
            // process.env.PK_CUBI_MAINNET
            // process.env.PK_CUBI_TEST
            // process.env.PK_SAFE_MOON
            process.env.PK_DORK
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
    },
    op_bnb_test: {
      provider: () => new HDWalletProvider(
        {
          privateKeys: [
            // process.env.PK_ETHW_MAINNET
            process.env.CORE_TEST
          
          ],
          providerOrUrl:  `https://opbnb-testnet-rpc.bnbchain.org`
        }),
      networkCheckTimeout: 600000,
      network_id: 5611,       // Ropsten's id
      gasPrice: 2000000000,  // 20 gwei (in wei) (default: 100 gwei)
      confirmations: 0,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    goerli: {
      provider: () => new HDWalletProvider(
        {
          privateKeys: [
            // process.env.PK_ETHW_MAINNET
            process.env.CORE_TEST
          
          ],
          providerOrUrl:  `https://goerli.infura.io/v3/60c9046b933e4ddcb0de8e772b5b81df`
        }),
      networkCheckTimeout: 600000,
      network_id: 5,       // Ropsten's id
      gasPrice: 200000000000,  // 20 gwei (in wei) (default: 100 gwei)
      confirmations: 0,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    core: {
      provider: () => new HDWalletProvider(
        {
          privateKeys: [
            process.env.CORE_TEST
          ],
          providerOrUrl:  `https://rpc.coredao.org/`
        }),
      networkCheckTimeout: 600000,
      network_id: 1116,       // Ropsten's id
      gasPrice: 30000000000,  // 20 gwei (in wei) (default: 100 gwei)
      confirmations: 0,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    nuls_beta: {
      provider: () => new HDWalletProvider(
        {
          privateKeys: [
            process.env.PK_NULS_BETA
          ],
          providerOrUrl:  `https://beta.evmapi.nuls.io`
        }),
      network_id: 120,       // Ropsten's id
      gasPrice: 1000000000,  // 20 gwei (in wei) (default: 100 gwei)
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.12",
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       }
      //  evmVersion: "byzantium"
      }
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
    etherscan: '0d8a2688-a0df-40b0-beb8-548847857213',
    bscscan: process.env.BSCSCAN_API_KEY
  }
};
