import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { BurnerContext, withBurner, DataProviders } from '@burner-wallet/ui-core';
import { Asset, SendData } from '@burner-wallet/types';
import Address from '../../components/Address';
import Button from '../../components/Button';
import Page from '../../components/Page';
import LineItem from '../../components/LineItem';
const { TransactionDetails } = DataProviders;
import { networkIdToExplorerRoot } from "../../lib"
import { ERC20Asset, NativeAsset } from '@burner-wallet/assets';


interface MatchParams {
  asset: string;
  txHash: string;
  account: string;
}


const BigEmoji = styled.div`
  font-size: 106px;
`;

const formatDate = (timestamp: number) => (new Date(timestamp * 1000)).toLocaleString();

const ReceiptPage: React.FC<RouteComponentProps<MatchParams> & BurnerContext> = ({
  match, defaultAccount, assets, t
}) => (
  <Page title={t('Transaction Receipt')}>
    <TransactionDetails
      asset={match.params.asset}
      txHash={match.params.txHash}
      render={(tx: SendData) => {
        if (!tx) {
          return (
            <section>
              <BigEmoji>🔎</BigEmoji>
              <div>Transaction not found...</div>
              <div>The transaction may still be propogating</div>
            </section>
          );
        }
        const [_asset] = assets.filter((_asset: Asset) => _asset.id === tx.asset);
        const asset = _asset as (ERC20Asset | NativeAsset)
        const explorerRoot = networkIdToExplorerRoot(asset.network)
        const amtValue = asset
          ? `${asset.getDisplayValue(tx.value!)} ${asset.name}`
          // @ts-ignore
          : `${tx.displayValue} (unknown asset)`;
        // @ts-ignore
        const date = formatDate(tx.timestamp)
        const isSent = defaultAccount.toLowerCase() === tx.from!.toLowerCase();
        return (
          <section>
            <div>
              { explorerRoot ? <a href={explorerRoot + "tx/" + match.params.txHash} target="_blank"><LineItem name={t('View in explorer')} value={""}/></a> : null}
              <br/>
              <LineItem name={t('From')} value={<Address networkId={asset.network} address={tx.from!} />}/>
              <LineItem name={t('To')} value={<Address networkId={asset.network} address={tx.to!} />}/>
              {"address" in asset ? <LineItem name={t('Token Address')} value={ <a href={explorerRoot + 'address/' + asset.address} target="_blank">{asset.address}</a>}/>: null }
              <LineItem name={t('Date')} value={date}/>
            </div>

            <div>
              <h2>{isSent ? t('Sent') : t('Received')}</h2>
              <div>{amtValue}</div>
            </div>

            {tx.message && (
              <div>
                <h2>{t('Note')}</h2>
                <div>{tx.message}</div>
              </div>
            )}
          </section>
        );
      }}
    />
    <Button to="/">{t('Back')}</Button>
  </Page>
);

export default withBurner(ReceiptPage);
