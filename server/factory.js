import { Meteor } from 'meteor/meteor';
import { ethers } from 'ethers';

export const Web3Factory = {
  settings: Meteor.settings.Ethers,
  provider() {
    return new ethers.providers.JsonRpcProvider(this.settings.rpcUrl);
  },
  signer() {
    return new ethers.Wallet(this.settings.key);
  },
};
