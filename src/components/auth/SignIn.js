import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import { makeAdmin } from '../../store/actions/userActions';

class SignIn extends Component {
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

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.signIn(this.state);
  }

  render() {

    const { authError, auth } = this.props;

    if (auth.uid) {
      return <Redirect to='/' />
    }

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
          <input 
            type='password'
            placeholder='password'
            name='password'
            value={this.state.password}
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
    signIn: (creds) => dispatch(signIn(creds)),
    makeAdmin: (email) => dispatch(makeAdmin(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);