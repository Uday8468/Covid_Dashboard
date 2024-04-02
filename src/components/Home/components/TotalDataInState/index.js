import React from 'react'
import { ConfirmedTextCont, ConfirmedTextCountCont, TotalContentCont, WholeTotalDataCont } from '../TotalDataComp/TotalDataComp.styled'
import confirmIcon from "../../Images/check-mark 1.svg"
import activeIcon from "../../Images/protection 1.svg"
import recoverIcon from "../../Images/recovered 1.svg"
import deceaseIcon from "../../Images/breathing 1.svg"
import { TotalContentContInState } from './index.styled'
const TotalDataInState = (props) => {
    const { totalData } = props
    let keys = Object.keys(totalData)
    return (
        <WholeTotalDataCont>
            {keys.map((eachKey) => (
                <>
                    {(eachKey !== "tested") && (
                        <TotalContentContInState style={{background:eachKey === "confirmed" && "#331427"}}>
                            <ConfirmedTextCont style={{ color: eachKey === "confirmed" ? "#FF073A" : eachKey === "active" ? "#007BFF" : eachKey === "deceased" ? "#6C757D" : "#28A745", }}>
                                {eachKey === "confirmed" ? "Confirmed" : eachKey === "active" ? "Active" : eachKey === "deceased" ? "Deceased" : "Recovered"}
                            </ConfirmedTextCont>
                            <img src={eachKey === "confirmed" ? confirmIcon : eachKey === "active" ? activeIcon : eachKey === "deceased" ? deceaseIcon : recoverIcon} draggable={false} />
                            <ConfirmedTextCountCont style={{ color: eachKey === "confirmed" ? "#FF073A" : eachKey === "active" ? "#007BFF" : eachKey === "deceased" ? "#6C757D" : "#28A745" }}>{totalData[eachKey]}</ConfirmedTextCountCont>
                        </TotalContentContInState>
                    )}

                </>

            ))}


        </WholeTotalDataCont>
    )
}

export default TotalDataInState
