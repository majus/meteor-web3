import { ethers } from 'ethers';
import { EthersSettings } from '../settings';

export const Web3Factory = {
  settings: EthersSettings,
  provider() {
    return new ethers.providers.JsonRpcProvider(this.settings.rpcUrl);
  },
  signer() {
    return new ethers.Wallet(this.settings.key);
  },
};
