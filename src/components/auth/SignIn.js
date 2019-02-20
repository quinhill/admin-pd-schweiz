import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
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
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);