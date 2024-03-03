import { Meteor } from 'meteor/meteor';

const settings = Meteor.settings.packages
  ? Meteor.settings.packages['majus:web3']
  : {};

export const EthersSettings = settings.ethers;
