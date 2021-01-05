import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCards, saveCards, getReading } from '../redux/actions'
import CardCard from '../Components/CardCard'

class CardContainer extends React.Component {

  state = {
    readingCards: [],
    cardsDrawn: 0,
    cardsSaved: false,
    lastKnownReadingId: 0,
  }

  componentDidMount() {
    this.props.getCards()
  }

  dealCards = () => {
    // let cards = []
    let randomCard
    let n = 3
    for (let i = 0; i < n; ++i) {
      randomCard = this.props.cards[Math.floor(Math.random() * this.props.cards.length)]
      if (!this.state.readingCards.includes(randomCard)) {
        // cards.push(randomCard)
        // console.log("deal cards",cards)
        this.setState({
          readingCards: [...this.state.readingCards, randomCard]
        })
      } else {
        n++
      }
    }

  }

  // {this.state.beenSaved ? "render CardsCards and ReadingCard or readingObj": "render CardsCards (we'll conditionally hide readingForm separately? so we need another local this.state.beenSaved & ternary to toggle hide/show on the readingForm)" }

  renderCards = () => {
    let cardsArray = this.state.readingCards
    return (
      cardsArray.map(randomCard => <CardCard key={randomCard.id} cardObj={randomCard} />)
    )
  }

  clickHandler = () => {
    // let question = prompt("What Is Your Question?", "What lies in my future?")
    // console.log(question)
    if (this.state.cardsDrawn < 5) {
      this.dealCards()
      this.setState((prevState) => ({ cardsDrawn: prevState.cardsDrawn + 1 }))
    }
  }

  componentDidUpdate() {
    
    if (this.props.readingId !== this.state.lastKnownReadingId) {
      this.setState({lastKnownReadingId: this.props.readingId})
      this.props.saveCards(this.state.readingCards, this.props.readingId)
      this.props.getReading(this.props.readingId, this.props.history)
      console.log("in save cards function:", this.state.readingCards)
    }
  }

  render() {
    // console.log(this.props.cards)
    return (
      <div className="card-container">
        <h2>Consult the Cards</h2>
        {this.state.cardsDrawn < 5 && !this.props.readingId > 0 ? <button className="card-button" onClick={this.clickHandler}>Draw a Card</button> : null}
        {this.props.cards.length === 0 ? <h1>Loading</h1> : this.renderCards()}
      </div>
    )
  }
}

//Passing array of cards to state
const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    readingId: state.readingId
  }
}

//Passing function to get cards to props
const mapDispatchToProps = (dispatch) => {
  return {
    getCards: () => dispatch(getCards()),
    saveCards: (cardsArray, readingId) => dispatch(saveCards(cardsArray, readingId)),
    getReading: (readingId, history) => dispatch(getReading(readingId, history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardContainer))

