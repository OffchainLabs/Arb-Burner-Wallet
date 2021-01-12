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





const arbethv2 = new NativeAsset({
  id: 'ETH_L2(v2)',
  name: 'ETH',
  network: '152709604825713',
  priceSymbol: 'ETH',
  icon: 'https://static.burnerfactory.com/icons/eth.svg'
})

const arbethv3 = new NativeAsset({
  id: 'ETH_L2(v3)',
  name: 'ETH',
  network: '79377087078960',
  priceSymbol: 'ETH',
  icon: 'https://static.burnerfactory.com/icons/eth.svg'
})

const koveth = new NativeAsset({
  id: 'ETH_L1',
  name: 'ETH',
  network: '42',
  priceSymbol: 'ETH',
  icon: 'https://static.burnerfactory.com/icons/eth.svg',
})

const arbarbiv2 = new ERC20Asset({
    id: 'ARBI_L2(v2)',
    name: 'ARBI',
    network: '152709604825713',
    address: '0xf36d7a74996e7def7a6bd52b4c2fe64019dada25',
    icon: 'https://offchainlabs.com/af7bc2292c93e5b9edd216461350b1bf.png',
  });

  const arbarbiv3= new ERC20Asset({
    id: 'ARBI_L2(v3)',
    name: 'ARBI',
    network: '79377087078960',
    address: '0xf36d7a74996e7def7a6bd52b4c2fe64019dada25',
    icon: 'https://offchainlabs.com/af7bc2292c93e5b9edd216461350b1bf.png',

  });


  const kovarbi= new ERC20Asset({
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
     new HTTPGateway('https://kovan3.arbitrum.io/rpc', '79377087078960')

  ],
  // TODO use Sai
  assets: [
    arbethv3,
    arbarbiv3,
    koveth, 
    kovarbi,
    arbethv2, 
    arbarbiv2
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
