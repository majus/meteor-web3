/* eslint-disable meteor/template-names */
import { Template } from 'meteor/templating';
import { Web3Accounts } from '../../accounts';
import './select.html';

Template['web3/accountSelect/bootstrap4'].events({
  'click [data-action=selectAccount]'(event) {
    event.preventDefault();
    Web3Accounts.current = String(this);
  },
});
