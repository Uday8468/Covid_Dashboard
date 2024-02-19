import React, { useEffect, useState } from 'react'
import Header from '../Header/header.index'
import searchIcon from "./Images/search.svg"
import { InputContainer, InputEl, SearchIconImg, TotalHomeContainer } from './Home.styled'
import { convertObjectsDataIntoListItemsUsingForInMethod, getTotalDataOfCovid } from '../utils'
import Loader from '../Loader/Loader'

const Home = () => {
  const [loadStatus, setLoadStatus] = useState(true)
  const [data,setData] = useState([])
  const [totalCount,setTotalCount] = useState([])
  const intialAPI = async () => {
    let deceased = 0;
    let confirmed = 0;
    let recovered = 0;
    let active = 0
    let result = await getTotalDataOfCovid()
    setLoadStatus(false)
    // setData(result)
    let data = convertObjectsDataIntoListItemsUsingForInMethod(result)

    data.map((each) => {
      deceased += each?.deceased
      confirmed += each?.confirmed
      recovered += each?.recovered
      active += each?.active
    })
    setTotalCount([{deceased,confirmed,active,recovered}])
    console.log(totalCount)
  }
  useEffect(() => {
    intialAPI()
  }, [])
  return (
    <>
      <Header />
      {loadStatus ? (
        <Loader />
      ) : (
        <TotalHomeContainer>
          <InputContainer>
            <SearchIconImg src={searchIcon} draggable={false} alt="search-icon" />
            <InputEl type='text' placeholder='Enter the State' />
          </InputContainer>
        </TotalHomeContainer>
      )}

    </>
  )
}

export default Home
