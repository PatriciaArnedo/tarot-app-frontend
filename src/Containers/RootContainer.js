import React from 'react'
import Header from '../Components/Header'
import MainContainer from './MainContainer'
import Welcome from '../Components/Welcome'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import ReadingCard from '../Components/ReadingCard'


function RootContainer(props){

  
  return(
    <div className="parent">
    
    <Header />
    <Switch>
    <Route path="/learn-more" render={() => <MainContainer />}/>
    <Route path="/welcome" render={() => <Welcome />} />
    <Route path="/home" render={(routerProps) => <MainContainer routerProps={routerProps}/>}/>
    <Route path="/new-reading" render={(routerProps) => <MainContainer routerProps={routerProps}/>}/>
    <Route path='/reading/:id' render={({ match }) => {
        let readingId = parseInt(match.params.id)
        let foundReading = props.readings.find(reading => reading.id === readingId)

        return (
          <>
          {props.readings.length === 0 ? <h1>Loading....</h1> : 
             <>
             <ReadingCard reading={foundReading} />
             <MainContainer/>
             
             </>
          }
          </>
        )
    }} />
    </Switch>

    {props.user ? <Redirect to="/home"/> : <Redirect to="/welcome"/>}

    </div>
    )
    
}

function msp(state) {
  return { user: state.user,
           readings: state.readings
  }
}

export default withRouter(connect(msp)(RootContainer))