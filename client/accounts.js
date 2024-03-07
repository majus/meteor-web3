import { ReactiveVar } from 'meteor/reactive-var';
import { Web3Factory } from './factory';

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
    const [network, accounts] = await Promise.all([
      this.provider.getNetwork(),
      this.provider.listAccounts(),
    ]);
    if (network) {
      this.state.network.set(network);
    }
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
      //FIXME: EIP-1193
      provider.on('connect', () => this.refresh());
      //FIXME: EIP-1193
      provider.on('disconnect', () => {
        this.state.current.set(null);
        this.state.connected.set([]);
      });
      //FIXME: EIP-1193
      provider.on('chainChanged', (chainId) =>
        this.state.network.set({ chainId }),
      );
      //FIXME: EIP-1193
      provider.on('accountsChanged', () => this.refresh());
      // ???
      provider.on('network', (network) => this.state.network.set(network));
      this.provider = provider;
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
