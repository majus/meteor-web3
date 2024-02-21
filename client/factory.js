import { ethers } from 'ethers';

export const Web3Factory = {
  provider() {
    return new ethers.providers.Web3Provider(window.ethereum, 'any');
  },
  signer() {
    return this.provider()?.getSigner();
  },
  contract(address, abi) {
    return new ethers.Contract(address, abi, this.signer());
  },
};
