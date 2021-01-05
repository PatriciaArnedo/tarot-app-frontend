import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../redux/actions'

class SignUpForm extends React.Component {

    state ={
        ["user_name"]: "",
        password: ""
    }

    changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
      e.preventDefault()
      this.props.submitHandler(this.state)
      this.setState({
        ["user_name"]: "",
        password: ""
      })
  
    }

    render(){
        return(
            <>
            <form className="card-container" onSubmit={this.submitHandler}>
                <input
                    type="text"
                    value={this.state["user_name"]}
                    name={["user_name"]}
                    onChange={this.changeHandler}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={this.state.password}
                    name="password"
                    onChange={this.changeHandler}
                    placeholder="Password"
                />
                <button className="logout-button" >Sign Up</button>
            </form>

            </>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
  return { submitHandler: (userObj) => dispatch(signUp(userObj)) }
}

export default connect(null, mapDispatchToProps)(SignUpForm)