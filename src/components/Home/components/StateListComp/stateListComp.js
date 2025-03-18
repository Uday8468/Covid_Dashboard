import React from 'react'
import { RemainingNameAlignCont, StateNameAlignCont, StateNameDiv, TotalStateDiv } from './stateListComp.styled'

const StateListComp = (props) => {
    const {stateDetails} = props
    const {active,confirmed,deceased,name,recovered,population} = stateDetails
  return (
    <TotalStateDiv>
       <StateNameAlignCont>
       <StateNameDiv>{name}</StateNameDiv>
       </StateNameAlignCont>
      <RemainingNameAlignCont>
      <StateNameDiv style={{color:"#FF073A"}}>
        <span>{confirmed}</span>
      </StateNameDiv>
      <StateNameDiv style={{color:"#007BFF"}}>
      <span>{active}</span>
      </StateNameDiv>
      <StateNameDiv style={{color:"#28A745"}}>
      <span>{recovered}</span>
      </StateNameDiv>
      <StateNameDiv style={{color:"#6C757D"}}>
      <span>{deceased}</span>
      </StateNameDiv>
      <StateNameDiv style={{color:"#94A3B8"}}>
      <span>{population}</span>
      </StateNameDiv>
      </RemainingNameAlignCont>
    </TotalStateDiv>
  )
}

export default StateListComp
