import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeAdmin } from '../../store/actions/userActions';

class AdminInput extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.makeAdmin(this.state.email);
  }

  render() {

    const { authError, auth } = this.props;

    return (
      <div className='form-container'>
        <form 
          onSubmit={this.handleSubmit}
          className='signin-form'
        >
          <input 
            type='email'
            placeholder='email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <button type='submit'>Sign In</button>
          <div>
            { authError ? <p>{authError}</p> : null }
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    firebase: state.firebase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeAdmin: (email) => dispatch(makeAdmin(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminInput);