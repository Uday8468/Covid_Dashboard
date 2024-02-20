import React, { useEffect, useState } from 'react'
import Header from '../Header/header.index'
import searchIcon from "./Images/search.svg"
import ascendingIcon from "./Images/ascendingIcon.svg"
import descendingIcon from "./Images/descendingIcon.svg"
import { ColumnContainer, InputContainer, InputEl, SearchIconImg, TotalColumnContainer, TotalHomeContainer, TotalStateListCont,StatesAlignCont,RemainingAlignCont, SortIcon, HorizonatlLine } from './Home.styled'
import { convertObjectsDataIntoListItemsUsingForInMethod, getTotalDataOfCovid } from '../utils'
import Loader from '../Loader/Loader'
import TotalDataComp from './components/TotalDataComp/TotalDataComp'
import StateListComp from './components/StateListComp/stateListComp'
let columnArray = [
  "Confirmed",
  "Active",
  "Recovered",
  "Deceased",
  "Population"
]
const Home = () => {
  const [loadStatus, setLoadStatus] = useState(true)
  const [data, setData] = useState([])
  const [totalCount, setTotalCount] = useState([])
  const intialAPI = async () => {
    let deceased = 0;
    let confirmed = 0;
    let recovered = 0;
    let active = 0
    let result = await getTotalDataOfCovid()
    setLoadStatus(false)
    let data = convertObjectsDataIntoListItemsUsingForInMethod(result)
    setData(data)
    data.map((each) => {
      confirmed += each?.confirmed
      active += each?.active
      recovered += each?.recovered
      deceased += each?.deceased
    })
    setTotalCount([{ confirmed, active, recovered, deceased }])
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
          {totalCount.length > 0 && (
            totalCount.map((eachData,index) => 
              <TotalDataComp totalData={eachData} key={index}/>
            )
          )}
          <TotalStateListCont>
            <TotalColumnContainer>
              <StatesAlignCont>
                <ColumnContainer>States/UT</ColumnContainer>
                <SortIcon src={ascendingIcon} draggable={false}/>
                <SortIcon src={descendingIcon} draggable={false}/>
              </StatesAlignCont>
              <RemainingAlignCont>
              {columnArray.map((each,index) => (
                <ColumnContainer>{each}</ColumnContainer>
              ))}
              </RemainingAlignCont>
            </TotalColumnContainer>
            <HorizonatlLine></HorizonatlLine>
            {data.map((each,index) => (
              <StateListComp stateDetails={each} key={index}/>
            ))}
          </TotalStateListCont>
        </TotalHomeContainer>
      )}

    </>
  )
}

export default Home
