import React from 'react'
import logo from "../Header/Images/COVID19INDIA.svg"
import gitHubLogo from "../Home/Images/gitHubLogo.svg"
import twitterLogo from "../Home/Images/TwitterLogo.svg"
import instagramLogo from "../Home/Images/instagramLogo.svg"
import { FooterAlignCont, FooterTextCont, TotalFooterCont } from './Footer.styled'
const Footer = () => {
  return (
    <TotalFooterCont>
      <div>
        <img src = {logo} draggable={false}/>
      </div>
      <FooterTextCont>we stand with everyone fighting on the front lines</FooterTextCont>
      <FooterAlignCont>
      <img src = {gitHubLogo} draggable={false}/>
      <img src = {instagramLogo} draggable={false}/>
      <img src = {twitterLogo} draggable={false}/>
      </FooterAlignCont>
    </TotalFooterCont>
  )
}

export default Footer
