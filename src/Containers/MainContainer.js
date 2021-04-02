import React from 'react'
import ReadingForm from '../Components/ReadingForm'
import CardContainer from '../Containers/CardContainer'
import HomeCard from '../Components/HomeCard'
import ReadingContainer from '../Containers/ReadingContainer'
import { withRouter } from 'react-router-dom'
import Info from '../Components/Info'

// import { connect } from 'react-redux'

function MainContainer(props) {



  return (
    <>
      <ReadingContainer />

      {props.match.path === '/home' ?
        <HomeCard />
        :
        null
      }

      {props.match.path === '/new-reading' ?
        <>
          <ReadingForm />
          <CardContainer />
        </>
        :
        null
      }
      {props.match.path === '/learn-more' ?
        <Info />
        :
        null
      }
    </>
  )

}


export default withRouter(MainContainer)