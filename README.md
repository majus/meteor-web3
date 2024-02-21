## Overview

Basic Web3 API toolkit for Meteor application development.

## Usage (client)

Web3 API wraps Ethers API for convenience:

```js
import { Web3Factory } from 'meteor/majus:web3';

/**
 * Get an instance of Web3Provider
 * @see https://docs.ethers.org/v5/api/providers/other/#Web3Provider
 */
const provider = Web3Factory.provider();

/**
 * Get an instance of Web3Provider signer (essentially JsonRpcSigner)
 * @see https://docs.ethers.org/v5/api/providers/jsonrpc-provider/#JsonRpcSigner
 */
const signer = Web3Factory.signer();

/**
 * Create smart contract API from ABI representation.
 * @see https://docs.ethers.org/v5/api/contract/contract/#Contract--creating
 */
export const TokenContract = Web3Factory.contract(address, abi);
const balance = await TokenContract.balanceOf('<account-address>');
```

The client-size Accounts API works with [Web3Provider](https://docs.ethers.org/v5/api/providers/other/#Web3Provider) compatible browser wallets:

```js
import { Web3Accounts } from 'meteor/majus:web3';

/**
 * Restores connected accounts if the web3 wallet was already connected before.
 * Usually called just after the page is loaded or in the router's before/onWait hooks.
 * @see https://docs.ethers.org/v5/api/providers/jsonrpc-provider/#JsonRpcProvider-listAccounts
 */
await Web3Accounts.init();

/**
 * Causes the web3 wallet to request user to connect one or more accounts with the site.
 * @see https://eips.ethereum.org/EIPS/eip-1102
 */
await Web3Accounts.connect();

/**
 * Select current account among connected.
 */
Web3Accounts.current = '<account-address>';

/**
 * Various methods to get a state of connection.
 */
Web3Accounts.isConnected; // Boolean
Web3Accounts.connected; // Array of strings
Web3Accounts.current; // String
Web3Accounts.network; // Object
```

## Usage (server)

Firstly, you need to provide required settings:

```json
{
  "pacakges": {
    "majus:web3": {
      "rpcUrl": "http://chain-rpc-server",
      "key": "your-eoa-private-key"
    }
  }
}
```

Then, you may use the API as follows:

```js
import { Web3Factory } from 'meteor/majus:web3';

/**
 * Get an instance of JsonRpcProvider
 * @see https://docs.ethers.org/v5/api/providers/jsonrpc-provider/
 */
const provider = Web3Factory.provider();

/**
 * Get an instance of Wallet signer
 * @see https://docs.ethers.org/v5/api/signer/#Wallet
 */
const signer = Web3Factory.signer();
```
