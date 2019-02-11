import React, { Component } from 'react'

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
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div>
        <form>
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
        </form>
      </div>
    )
  }
}

export default SignIn;