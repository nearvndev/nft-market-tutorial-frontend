import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  window.account = window.walletConnection.account();

  // Initializing our contract APIs by contract name and configuration
  window.contractMarket = await new Contract(window.walletConnection.account(), nearConfig.marketContractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['storage_balance_of', 'storage_minimum_balance', 'get_sales_by_contract_id', 'get_sales'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['storate_deposit', "offer"],
  });

  window.contractNFT = await new Contract(window.walletConnection.account(), nearConfig.nftContractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['nft_tokens_for_owner', "nft_token"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['nft_mint', "nft_transfer", "nft_approve"],
  });

  window.contractFT = await new Contract(window.walletConnection.account(), nearConfig.ftContractName, {
    viewMethods: ['ft_metadata', 'ft_balance_of'],
    changeMethods: ['ft_transfer_call', 'storage_deposit']
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.marketContractName)
}

export function parseTokenWithDecimals(amount, decimals) {
  let amountD = amount / Math.pow(10, decimals);
  return Math.floor(amountD * 100 / 100);
}

export function parseTokenAmount(amount, decimals) {
  return amount * Math.pow(10, decimals);
}