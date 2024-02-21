import React, { useEffect, useState } from 'react'
import Header from '../Header/header.index'
import searchIcon from "./Images/search.svg"
import ascendingIcon from "./Images/ascendingIcon.svg"
import descendingIcon from "./Images/descendingIcon.svg"
import { ColumnContainer, InputContainer, InputEl, SearchIconImg, TotalColumnContainer, TotalHomeContainer, TotalStateListCont, StatesAlignCont, RemainingAlignCont, SortIcon, HorizonatlLine } from './Home.styled'
import { convertObjectsDataIntoListItemsUsingForInMethod, getTotalDataOfCovid } from '../utils'
import Loader from '../Loader/Loader'
import TotalDataComp from './components/TotalDataComp/TotalDataComp'
import StateListComp from './components/StateListComp/stateListComp'
import Footer from '../Footer/Footer'
let columnArray = [
  "Confirmed",
  "Active",
  "Recovered",
  "Deceased",
  "Population"
]
let originalData;
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
    originalData = data
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
  const searchFunction = (e) => {
    let text = e.target.value;
    if (text.length > 0) {
      let newArray = data.filter((value) => value?.name?.toLowerCase().includes(text.toLowerCase()))
      setData(newArray)
    } else {
      setData(originalData)
    }

  }
  return (
    <>
      <Header />
      {loadStatus ? (
        <Loader />
      ) : (
        <TotalHomeContainer>
          <InputContainer>
            <SearchIconImg src={searchIcon} draggable={false} alt="search-icon" />
            <InputEl type='text' placeholder='Enter the State' onInput={searchFunction} />
          </InputContainer>
          {totalCount.length > 0 && (
            totalCount.map((eachData, index) =>
              <TotalDataComp totalData={eachData} key={index} />
            )
          )}
          <TotalStateListCont>
            <TotalColumnContainer>
              <StatesAlignCont>
                <ColumnContainer>States/UT</ColumnContainer>
                <SortIcon src={ascendingIcon} draggable={false} onClick={() => {
                   const sortedData = [...data].sort((a, b) => {
                    // Convert names to lowercase for case-insensitive sorting
                    const nameA = a?.name?.toLowerCase();
                    const nameB = b?.name?.toLowerCase();

                    return nameA?.localeCompare(nameB)
                  });
                  setData(sortedData)
                }} />
                <SortIcon src={descendingIcon} draggable={false} onClick={() => {
                  const sortedData = [...data].sort((a, b) => {
                    // Convert names to lowercase for case-insensitive sorting
                    const nameA = a?.name?.toLowerCase();
                    const nameB = b?.name?.toLowerCase();

                    return nameB?.localeCompare(nameA)
                  });
                  setData(sortedData)
                }} />
              </StatesAlignCont>
              <RemainingAlignCont>
                {columnArray.map((each, index) => (
                  <ColumnContainer>{each}</ColumnContainer>
                ))}
              </RemainingAlignCont>
            </TotalColumnContainer>
            <HorizonatlLine></HorizonatlLine>
            {data.map((each, index) => (
              <StateListComp stateDetails={each} key={index} />
            ))}
          </TotalStateListCont>
          <Footer />
        </TotalHomeContainer>
      )}

    </>
  )
}

export default Home
