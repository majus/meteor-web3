import { ReactiveVar } from 'meteor/reactive-var';
import { Web3Factory } from './factory';

export const Web3Accounts = {
  provider: null,
  state: {
    connected: new ReactiveVar([]),
    account: new ReactiveVar(),
    network: new ReactiveVar(),
  },
  get isConnected() {
    return Boolean(this.connected.length > 0);
  },
  get connected() {
    return this.state.connected.get();
  },
  get current() {
    return this.state.account.get();
  },
  set current(account) {
    if (!this.connected.includes(account)) {
      throw new Error(`Account ${account} is not connected`);
    }
    this.state.account.set(account);
  },
  get network() {
    return this.state.network.get();
  },
  async init() {
    // Initialize once
    if (!this.provider) {
      const provider = Web3Factory.provider();
      const [network, accounts] = await Promise.all([
        provider.getNetwork(),
        provider.listAccounts(),
      ]);
      if (network) {
        this.state.network.set(network);
      }
      if (accounts) {
        this.state.connected.set(accounts);
        if (accounts.length > 0) {
          // Auto select the first account
          this.state.account.set(accounts[0]);
        }
      }
      provider.on('network', (network) => this.state.network.set(network));
      this.provider = provider;
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
