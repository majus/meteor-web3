import { Template } from 'meteor/templating';
import { Web3Accounts } from '../accounts';
import './select.html';

Template.web3AccountsSelect.events({
  'click [data-action=selectAccount]'(event) {
    event.preventDefault();
    Web3Accounts.current = this;
  },
});
