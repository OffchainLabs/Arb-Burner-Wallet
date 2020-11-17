import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { xdai, dai, eth, NativeAsset, ERC20Asset } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway,HTTPGateway } from '@burner-wallet/core/gateways';
import Exchange, { Uniswap, XDaiBridge } from '@burner-wallet/exchange';
import ModernUI from '@burner-wallet/modern-ui';
import ENSPlugin from '@burner-wallet/ens-plugin';
import MetamaskPlugin from '@burner-wallet/metamask-plugin';
import { BurnerConnectPlugin } from '@burner-wallet/burner-connect-wallet';
import 'worker-loader?name=burnerprovider.js!./burnerconnect'; // eslint-disable-line import/no-webpack-loader-syntax


const networkIdToName = (networkId: string)=>{
  switch (networkId) {
    case "152709604825713":
       return "ArbTestnet V2"
    case "215728282823301":
        return "ArbTestnet V1"    
    case "42":
        return "Kovan"            
    default:
      return networkId
  }
}


class NativeAssetExt extends NativeAsset {
  networkName()  {
      return networkIdToName(this.network)
  }
}

class ERC20AssetExt extends ERC20Asset {
  networkName()  {
    return networkIdToName(this.network)
  }
}
const arbethv2 = new NativeAssetExt({
  id: 'ETH_L2(v2)',
  name: 'ETH',
  network: '152709604825713',
  priceSymbol: 'ETH',
  icon: 'https://static.burnerfactory.com/icons/eth.svg'
})

const arbethv1 = new NativeAssetExt({
  id: 'ETH_L2(v1)',
  name: 'ETH',
  network: '215728282823301',
  priceSymbol: 'ETH',
  icon: 'https://static.burnerfactory.com/icons/eth.svg'
})

const koveth = new NativeAssetExt({
  id: 'ETH_L1',
  name: 'ETH',
  network: '42',
  priceSymbol: 'ETH',
  icon: 'https://static.burnerfactory.com/icons/eth.svg',
})

const arbarbiv2 = new ERC20AssetExt({
    id: 'ARBI_L2(v2)',
    name: 'ARBI',
    network: '152709604825713',
    address: '0xf36d7a74996e7def7a6bd52b4c2fe64019dada25',
    icon: 'https://offchainlabs.com/af7bc2292c93e5b9edd216461350b1bf.png',
  });

  const arbarbiv1= new ERC20AssetExt({
    id: 'ARBI_L2(v1)',
    name: 'ARBI',
    network: '215728282823301',
    address: '0xf36d7a74996e7def7a6bd52b4c2fe64019dada25',
    icon: 'https://offchainlabs.com/af7bc2292c93e5b9edd216461350b1bf.png',

  });


  const kovarbi= new ERC20AssetExt({
    id: 'ARBI_L1',
    name: 'ARBI',
    network: '42',
    address: '0xf36d7a74996e7def7a6bd52b4c2fe64019dada25',
    icon: 'https://offchainlabs.com/af7bc2292c93e5b9edd216461350b1bf.png',
  });
  


export const core = new BurnerCore({
  signers: [new LocalSigner(),  new InjectedSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
     new HTTPGateway('https://kovan2.arbitrum.io/rpc', '152709604825713'),
     new HTTPGateway('https://kovan1.arbitrum.io/rpc', '215728282823301')

  ],
  // TODO use Sai
  assets: [
    arbethv2, 
    arbarbiv2,
     koveth, 
     kovarbi,
     arbethv1,
     arbarbiv1
     ],
});

// const exchange = new Exchange([new XDaiBridge(), new Uniswap('dai')]);
const BurnerWallet = () =>
  <ModernUI
    title="Arbitrum Burner Wallet"
    core={core}
  />

    // plugins={[exchange]}

ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
