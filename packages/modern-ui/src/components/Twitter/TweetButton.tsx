import React from 'react'
import styled from 'styled-components'
import useTwitter  from './useTwitter'



const TweetLink = styled.a`
  position: relative;
  box-sizing: border-box;
  padding: 6px;
  background-color: #1b95e0;
  color: #e5f9fb;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  font-family: Helvetica;
  border-radius: 8px;
  margin-left: 5px;
  font-size: 13px;
  display: flex;
  min-width: 110px;
`
const TweetButton = ({account}={account:""}) => {
  const handleClick = useTwitter(account)
  return (
    <TweetLink target="_blank" onClick={handleClick}>
      Request Tokens
    </TweetLink>
  )
}

export default TweetButton
