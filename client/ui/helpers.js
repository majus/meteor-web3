import { Template } from 'meteor/templating';
import { Web3Accounts } from '../accounts';
import { Config } from '../../config';
import './bootstrap4';
import './default';

function template(name) {
  return () => Template[`web3/${name}/${Config.template}`] ?? null;
}

Template.helpers({
  'Web3': () => ({
    'UI': () => ({
      'accountSelect': template('accountSelect'),
    }),
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
