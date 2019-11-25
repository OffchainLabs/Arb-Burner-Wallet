import React from 'react';
import styled from 'styled-components';
import { withBurner, BurnerContext } from '@burner-wallet/ui-core';
import QRCode from 'qrcode.react';
import Clipboard from '../../components/Clipboard';
import Button from '../../components/Button';
import Page from '../../components/Page';

const QRContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  flex: 1;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

const AddressInputContainer = styled.div`
  display: flex;
  background-color: white;
  border: 1px;
  border-color: grey;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  margin: 8px 0;
  align-items: center;
`;

const CopyButton = styled(Button)`
  height: 38px;
  margin: 4px;
`;

const StyledInput = styled.input`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 16px 0 16px 16px;
  font-family: sans-serif;
  font-size: 1rem;
  min-width: 0;
  background: transparent;
  border: none;
  flex: 1;
`;

const ReceivePage: React.FC<BurnerContext> = ({ defaultAccount }) => {
  return (
    <Page title="Your Address">
      <div>Scan this code with your wallet to send money to it.</div>

      <QRContainer>
        <QRCode value={defaultAccount} renderAs="svg"/>
      </QRContainer>

      <AddressInputContainer>
        <StyledInput
          readOnly
          value={defaultAccount}
          onClick={(e: React.MouseEvent) => (e.target as HTMLInputElement).setSelectionRange(0, 42)}
        />
        <Clipboard text={defaultAccount}>
          {isCopied => (
            <CopyButton disabled={isCopied}>Copy</CopyButton>
          )}
        </Clipboard>
      </AddressInputContainer>

      <Button disabled>Create Request</Button>
    </Page>
  );
};

export default withBurner(ReceivePage);
