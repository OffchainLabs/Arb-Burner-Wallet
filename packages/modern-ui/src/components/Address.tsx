import React from 'react';
import { DataProviders } from '@burner-wallet/ui-core';
import styled from 'styled-components';
import { networkIdToExplorerRoot } from "../lib"

const AddressSegment = styled.span<{ hidden?: boolean }>`
  display: inline-block;
  overflow: hidden;
  font-family: monospace;

  ${props => props.hidden && `
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 6em;
  `}
`;

interface AddressProps {
  address: string;
  networkId?: string;
}
 
const Address: React.FC<AddressProps> = ({ address, networkId }) => {
  const explorerRoot = networkIdToExplorerRoot(networkId);
  return (
    <DataProviders.AddressName
      address={address}
      render={(name: string | null) => name ? (
        <span>{name}</span>
      ) : (
        explorerRoot ? <a href={explorerRoot + "address/" + address} target="_blank" >
          <AddressSegment hidden>{address.substr(0, 34)}</AddressSegment>
          <AddressSegment>{address.substr(-8)}</AddressSegment>
        </a> : <span>
          <AddressSegment hidden>{address.substr(0, 34)}</AddressSegment>
          <AddressSegment>{address.substr(-8)}</AddressSegment>
        </span> 
      )}
    />
  );
};

export default Address;