import React from 'react';
import { DataProviders, useBurner } from '@burner-wallet/ui-core';
import { Asset, AssetSelectorProps } from '@burner-wallet/types';
import styled from 'styled-components';
import Dropdown, { ItemComponentProps } from './Dropdown';
const { Assets, AccountBalance } = DataProviders;
import { utils } from 'ethers'
const AssetElementWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Balance = styled.div`
  margin-left: 8px;
`;

const AssetElement: React.FC<ItemComponentProps<Asset>> = ({ item }) => (
  <AssetElementWrapper>
    <div>{item.id}</div>

    <AccountBalance asset={item} render={(data: any/*AccountBalanceData | null*/) => data && (
      <Balance>
        {(+utils.formatEther(data.balance)).toFixed(item.name === "ETH" ? 4: 2)}
      </Balance>
    )} />
  </AssetElementWrapper>
);

const AssetSelector: React.FC<AssetSelectorProps> = ({ selected, assets, onChange, network, disabled }) => {
  const { assets: _assets } = useBurner();

  let filteredAssets = assets || _assets;
  if (network) {
    filteredAssets = filteredAssets.filter((asset: Asset) => asset.network === network);
  }

  return (
    <Dropdown<Asset>
      options={filteredAssets}
      selected={selected}
      onChange={onChange}
      disabled={disabled}
      itemComponent={AssetElement}
    />
  );
}

export default AssetSelector;
