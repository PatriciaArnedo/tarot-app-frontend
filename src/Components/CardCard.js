import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

class CardCard extends React.Component {


  state = {
    cardClicked: false
  }

  cardClickHandler = () => {
    this.setState({ cardClicked: !this.state.cardClicked })
  }

  cardMsg = () => {
    switch (this.props.cardIdx) {
      case 0: return "The Current Situation"
      case 1: return "Events in the Past"
      case 2: return "Future Events"
      case 3: return "The Conscious Mind"
      case 4: return "The Subconscious Mind"
    }
    return "unexpected card idx"
  }

  render() {


    return (
      <>
      
      <Grid container direction='column' alignItems="flex-start" justify="center" >
        <Grid item style={{textAlign: "center"}}>
        {!this.state.cardClicked? null : this.cardMsg()}
        </Grid>
        <Grid item>
        <div >

          <div onClick={this.cardClickHandler} className={`flip-card ${!this.state.cardClicked ? "" : "flipped"}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={this.props.cardObj.img_url} alt="Card Front" style={{
                  height: "320px",
                  // display: "block",
                  // marginLeft: "auto",
                  // marginRight: "auto"
                }} />

              </div>
              <div className="flip-card-back">
                <img src={"https://i.imgur.com/AqaKQxv.png"} alt="Card Back" style={{
                  height: "320px",
            
                  // display: "block",
                  // marginLeft: "auto",
                  // marginRight: "auto"
                }} />
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop: 360}} />
        </Grid>
        <Grid item>
        <div className="meaning-div" >
          {!this.state.cardClicked? null :
          <>
          <h4 style={{ textAlign: "center", margin: "7px 7px" }}>{this.props.cardObj.name} </h4>
          <p>{this.props.cardObj.meaning}</p>
          </>
          }
        </div>
        </Grid>
        
        


        </Grid>
      </>
    )
  }
}

export default CardCard

