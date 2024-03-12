import { ReactiveVar } from 'meteor/reactive-var';
import { Web3Factory } from './factory';
import { Config } from '../config';

export const Web3Accounts = {
  provider: null,
  state: {
    connected: new ReactiveVar([]),
    current: new ReactiveVar(null),
    network: new ReactiveVar(null),
  },
  get isConnected() {
    return Boolean(this.connected.length > 0);
  },
  get connected() {
    return this.state.connected.get();
  },
  get current() {
    return this.state.current.get();
  },
  set current(account) {
    if (!this.connected.includes(account)) {
      throw new Error(`Account ${account} is not connected`);
    }
    this.state.current.set(account);
  },
  get network() {
    return this.state.network.get();
  },
  async refresh() {
    const accounts = await this.provider.listAccounts();
    if (accounts) {
      this.state.connected.set(accounts);
      if (accounts.length > 0) {
        // Auto select the first account
        this.state.current.set(accounts[0]);
      }
    }
  },
  async init() {
    // Initialize once
    if (!this.provider) {
      const provider = Web3Factory.provider();
      /**
       * Events defined by Ethers v5
       * @see https://docs.ethers.org/v5/api/providers/provider/#Provider--events
       * @see https://github.com/ethers-io/ethers.js/blob/v5.7.2/packages/providers/src.ts/base-provider.ts
       */
      if (Config.debug) {
        provider.on('debug', (data) => Config.logger.debug(data));
      }
      provider.on('error', (err) => Config.logger.error(err));
      provider.on('network', (network) => this.state.network.set(network));
      /**
       * Events defined in EIP-1193
       * @see https://eips.ethereum.org/EIPS/eip-1193
       */
      //FIXME: Doesn't work with MetaMask
      provider.provider.on('connect', () => this.refresh());
      //FIXME: Doesn't work with MetaMask
      provider.provider.on('disconnect', () => {
        // this.state.current.set(null);
        // this.state.connected.set([]);
      });
      provider.provider.on('chainChanged', (chainId) =>
        this.state.network.set({ chainId }),
      );
      provider.provider.on('accountsChanged', () => this.refresh());
      // Keep a reference to the provider
      this.provider = provider;
      // Lastly, wait for the provider to be ready
      this.network = await provider.ready;
      // Initialize accounts
      await this.refresh();
    }
  },
  async connect() {
    const accounts = await this.provider.send('eth_requestAccounts', []);
    if (accounts) {
      this.state.connected.set(accounts);
      if (accounts.length > 0) {
        [this.current] = accounts;
        return this.current;
      }
    }
    return null;
  },
};
