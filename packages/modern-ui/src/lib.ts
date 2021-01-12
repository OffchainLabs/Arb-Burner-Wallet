import { bufferToHex, privateToAddress, toBuffer } from 'ethereumjs-util';

export const SCAN_QR_DATAURI = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000000' d='M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z' /%3E%3C/svg%3E`;
export const SCAN_QR_DATAURI_WHITE = SCAN_QR_DATAURI.replace('%23000000', '%23FFFFFF');

export const pkToAddress = (pk: string) => bufferToHex(privateToAddress(toBuffer(pk)));

export const pkRegex = /^0x[0-9a-f]{64}$/i;

export const isAllZero = (arr: string[]) => arr.filter(val => val !== '0').length === 0;

export const randomHex = (length: number) => {
  let result = '';
  while (result.length < length) {
    result += Math.random().toString(16).substr(2);
  }
  return '0x' + result.substr(0, length);
};

	

export const networkIdToExplorerRoot =(networkId?: string) =>{
  switch (networkId) {
    case "152709604825713":
       return "https://explorer.offchainlabs.com/#/chain/0xc34fd04e698db75f8381bfa7298e8ae379bfda71/"    
    case "79377087078960":
        return "https://explorer.offchainlabs.com/#/chain/0x3B493fD1731528531471Cd18ea2f29f1463D6514/"    
    case "42":
        return "https://kovan.etherscan.io/"            
    default:
      return ""
  }
}

export const networkIdToName = (networkId: string)=>{
  switch (networkId) {
    case "152709604825713":
       return "ArbTestnet V2"
    case "79377087078960":
        return "ArbTestnet V3"    
    case "42":
        return "Kovan"            
    default:
      return networkId
  }
}
