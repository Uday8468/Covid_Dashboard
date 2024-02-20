import React from 'react'
import { ConfirmedTextCont, ConfirmedTextCountCont, TotalContentCont, WholeTotalDataCont } from './TotalDataComp.styled'
import confirmIcon from "../../Images/check-mark 1.svg"
import activeIcon from "../../Images/protection 1.svg"
import recoverIcon from "../../Images/recovered 1.svg"
import deceaseIcon from "../../Images/breathing 1.svg"

const TotalDataComp = (props) => {
  const {totalData} = props
  let keys = Object.keys(totalData)
  return (
    <WholeTotalDataCont>
      {keys.map((eachKey) => (
        <>
        <TotalContentCont>
        <ConfirmedTextCont style={{color:eachKey=== "confirmed" ? "#FF073A" : eachKey === "active" ? "#007BFF" : eachKey === "deceased" ? "#6C757D" : "#28A745"}}>
        {eachKey=== "confirmed" ? "Confirmed" : eachKey === "active" ? "Active" : eachKey === "deceased" ? "Deceased" : "Recovered"}
        </ConfirmedTextCont>
        <img src = {eachKey=== "confirmed" ? confirmIcon : eachKey === "active" ? activeIcon : eachKey === "deceased" ? deceaseIcon : recoverIcon } draggable={false}/>
        <ConfirmedTextCountCont style={{color:eachKey=== "confirmed" ? "#FF073A" : eachKey === "active" ? "#007BFF" : eachKey === "deceased" ? "#6C757D" : "#28A745"}}>{totalData[eachKey]}</ConfirmedTextCountCont>
       </TotalContentCont>
       </>

      ))}
       
       
    </WholeTotalDataCont>
  
  )
}

export default TotalDataComp
