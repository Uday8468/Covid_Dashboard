import React from 'react'
import { BtnText, HomeBtn, NotFoundPara, PageNotFoundText, TotalNotFoundCont } from './index.styled'
import icon from "./Images/NotFoundIcon.svg"
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const  navigate = useNavigate();
  return (
    <TotalNotFoundCont>
      <img src={icon} draggable={false}/>
      <PageNotFoundText>PAGE NOT FOUND</PageNotFoundText>
      <NotFoundPara>we’re sorry, the page you requested could not be found Please go back to the homepage</NotFoundPara>
      <HomeBtn onClick={() => {
        navigate("/home")
      }}>
        <BtnText>Home</BtnText>
      </HomeBtn>

    </TotalNotFoundCont>
  )
}

export default NotFound
