/* eslint-disable meteor/template-names */
import { Template } from 'meteor/templating';
import { Web3Accounts } from '../../accounts';
import './select.html';

Template['web3/accountSelect/default'].events({
  'change [data-action=selectAccount]'(event) {
    event.preventDefault();
    const select = event.currentTarget;
    Web3Accounts.current = select.value;
  },
});
