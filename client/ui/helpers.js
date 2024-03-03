import { Template } from 'meteor/templating';
import { Web3Accounts } from '../accounts';

Template.helpers({
  'Web3': () => ({
    'isConnected': () => Web3Accounts.isConnected,
    'connectedAccounts': () => Web3Accounts.connected,
    'currentAccount': () => Web3Accounts.current,
    'network': () => Web3Accounts.network,
  }),
  'shortHash'(hash, { size = 4 } = {}) {
    if (hash) {
      return `${hash.substr(0, size)}…${hash.substr(-size)}`;
    }
    return '';
  },
});
