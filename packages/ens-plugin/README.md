# ENS Plugin for Burner Wallet

Allows sending funds to ENS addresses, as well as displaying ENS names in place of Ethereum addresses.

## Use

Install package:

```
yarn add @burner-wallet/ens-plugin
```

Add plugin to Burner Wallet

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { xdai, dai, eth } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway } from '@burner-wallet/core/gateways';
import ModernUI from '@burner-wallet/modern-ui';
import ENSPlugin from '@burner-wallet/ens-plugin';

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway(),
  ],
  assets: [xdai, dai, eth],
});


const BurnerWallet = () =>
  <ModernUI
    core={core}
    plugins={[new ENSPlugin()]}
  />

ReactDOM.render(<BurnerWallet />, document.getElementById('root'));

```

**Note:**

Since ENS runs on the Ethereum mainnet, a mainnet gateway must be available (such as InfuraGateway or RivetGateway).
