import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createReading } from '../redux/actions'


class ReadingForm extends React.Component {

    state = {
        ["user_id"]: this.props.userId,
        name: "",
        question: this.props.question,
        ["user_comment"]: "",
        beenClicked: false
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        let readingObj = {
            ["user_id"]: this.state["user_id"],
            name: this.state.name,
            question: this.state.question,
            ["user_comment"]: this.state["user_comment"]
        }
        this.props.submitHandler(readingObj, this.props.history)
        this.setState({
            name: "",
            question: "",
            ["user_comment"]: ""
        })

    }

    clickHandler = () => {
        this.setState({ beenClicked: !this.state.beenClicked })

        // if(this.state.beenClicked){
        //     this.setState({beenClicked: false})
        // } else {
        //     this.setState({beenClicked: true})
        // }
    }


    render() {


        return (

            <div className="reading-form">
                <button className="submit-button" onClick={this.clickHandler}>{this.state.beenClicked ? "Hide Form" : "Save This Reading"}</button>
                {this.state.beenClicked ?

                    <form onSubmit={this.submitHandler}>
                        <input
                            type="text"
                            value={this.state.name}
                            name="name"
                            onChange={this.changeHandler}
                            placeholder="Name This Reading..."
                        /> <br></br><br></br>
                        <input
                            type="text"
                            value={this.state.question}
                            name="question"
                            onChange={this.changeHandler}
                            placeholder="hmm. What Is My Question...."
                        /><br></br><br></br>
                        <textarea
                            value={this.state["user_comment"]}
                            name="user_comment"
                            onChange={this.changeHandler}
                            placeholder="Reflections on This Reading"
                        /><br></br><br></br>
                        <button className="submit-button">Save Reading</button>
                    </form>
                    :
                    null
                }
            </div>
        )
    }


}

function mdp(dispatch) {
    return {
        submitHandler: (readingObj, history) => dispatch(createReading(readingObj, history))
    }
}

function msp(state) {
    return {
        userId: state.userId,
        question: state.question
    }
}

export default withRouter(connect(msp, mdp)(ReadingForm))