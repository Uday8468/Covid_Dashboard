import React from 'react'
import { LoaderContainer } from './Loader.styled'
import loader from "../Home/Images/Loading.svg"
const Loader = () => {
  return (
    <LoaderContainer>
      <img src={loader} draggable={false} />
    </LoaderContainer>
  )
}

export default Loader
