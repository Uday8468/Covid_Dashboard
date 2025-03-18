import React, { useEffect, useState } from 'react'
import Header from '../Header/header.index'
import { AboutText, FaqAlignCont, FaqAnswerCont, FaqHeadings, FaqQuestionCont, LastUpdatedText, TotalAboutContainer, TotalContentCont } from './About.styled'
import { getFAQList } from '../utils'
import Loader from '../Loader/Loader'
import Footer from '../Footer/Footer'
const About = () => {
  const [mainList, setMainList] = useState([]);
  const [loader, setLoader] = useState(true)
  const initialAPI = async () => {
    let result = await getFAQList();
    let faqList = result?.faq
    setMainList(faqList)
    setLoader(false)
  }
  useEffect(() => {
    initialAPI()
  }, [])

  return (
    <>
      <Header />
      {loader ? (
        <Loader />
      ) : (
        <TotalAboutContainer>
          <TotalContentCont>
            <AboutText>About</AboutText >
            <LastUpdatedText>Last update on march 28th 2021.</LastUpdatedText>
            <FaqHeadings>COVID-19 vaccines be ready for distribution</FaqHeadings>
              {mainList.length > 0 && (
                <>
                  {mainList.map((each, index) => (
                    <FaqAlignCont>
                      <FaqQuestionCont>{each?.question}</FaqQuestionCont>
                      <FaqAnswerCont>{each?.answer}</FaqAnswerCont>
                    </FaqAlignCont>
                  ))}


                </>
              )}
          </TotalContentCont >
        <Footer/>

        </TotalAboutContainer >
      )}


    </>
  )
}

export default About
