import React, { useEffect, useState } from 'react'
import Header from '../Header/header.index'
import searchIcon from "./Images/search.svg"
import ascendingIcon from "./Images/ascendingIcon.svg"
import descendingIcon from "./Images/descendingIcon.svg"
import optionIcon from "./Images/Line.svg"
import { ColumnContainer, InputContainer, InputEl, SearchIconImg, TotalColumnContainer, TotalHomeContainer, TotalStateListCont, StatesAlignCont, RemainingAlignCont, SortIcon, HorizonatlLine, TotalOptionIconDiv, OptionIconText, TotalOptionDiv } from './Home.styled'
import { convertObjectsDataIntoListItemsUsingForInMethod, getTotalDataOfCovid } from '../utils'
import Loader from '../Loader/Loader'
import TotalDataComp from './components/TotalDataComp/TotalDataComp'
import StateListComp from './components/StateListComp/stateListComp'
import Footer from '../Footer/Footer'
import Select from 'react-select';
import "./React-select.css"

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
  const [totalCount, setTotalCount] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectOptionData, setSelectOptionData] = useState([]);
  const [focused, setFocused] = useState(false)
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
    let optionsData = [...data];
    let newArray = optionsData.map((each) => {
      let obj = {
        label:
          <TotalOptionDiv>
            <div>{each?.name}</div>
            <TotalOptionIconDiv>
              <OptionIconText>{each?.stateCode}</OptionIconText>
              <img src={optionIcon} draggable={false} />
            </TotalOptionIconDiv>
          </TotalOptionDiv>
        , value: each?.stateCode
      }
      return { ...obj }
    })
    setSelectOptionData(newArray)
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
  const handleChange = (selectedOption) => {
    // this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  const formatOptionLabel = ({ label }) => {
    return label;
  };
  const handleFocus = () => {
    setFocused(true)
  }
  const handleBlur = () => {
    setFocused(false)
  }
  return (
    <>
      <Header />
      {loadStatus ? (
        <Loader />
      ) : (
        <TotalHomeContainer status={focused}>
          <InputContainer>
            <SearchIconImg src={searchIcon} draggable={false} alt="search-icon" />
            {/* <InputEl type='text' placeholder='Enter the State' onInput={searchFunction} /> */}
            {selectOptionData?.length > 0 && (
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={selectOptionData}
                placeholder={""}
                blurInputOnSelect={true}
                closeMenuOnSelect={true}                
                formatOptionLabel={formatOptionLabel}
                onFocus={handleFocus}
                onBlur={handleBlur}
                styles={{
                  input: (baseStyles) => ({
                    ...baseStyles,
                    color: "#64748B",
                    outline: "none",
                  }),
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "#2F2F43",
                    border: "none",
                    outline: "none"
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    border: `1px solid #64748B`,
                    height: '64px',
                    background: isFocused ? "#1F1F30" : "#161625",
                    color: "#64748B",
                    fontSize: "16px",
                    fontFamily: "Roboto400",
                    borderLeft: !isFocused && "none",
                    borderTop: "none",
                    borderRight: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    cursor: "pointer"

                  }),
                }}
              // theme={(theme) => ({
              //   ...theme,
              //   borderRadius: 0,
              //   colors: {
              //     ...theme.colors,
              //     primary25: 'red',
              //     primary: '#161625',
              //   },
              // })}
              />
            )}



          </InputContainer>

          {!focused && (
            <>
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
            </>
          )}

        </TotalHomeContainer>
      )}

    </>
  )
}

export default Home
