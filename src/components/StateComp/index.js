import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import Header from '../Header/header.index'

const StateComp = () => {
    const [loadStatus,setLoadStatus] = useState(true)
  return (
    <>
    <Header/>
      {loadStatus ? (
        <Loader/>
      ):(
        <>
        </>
      )}
    </>
  )
}

export default StateComp
