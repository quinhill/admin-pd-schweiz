import React, { Component } from 'react';

class EditUser extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      city: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      uid: '',
      zip: ''
    }
  }

  componentDidMount() {
    const {
      address,
      city,
      email,
      firstName,
      lastName,
      phone,
      uid,
      zip
    } = this.props.userDetails;

    this.setState({
      address,
      city,
      email,
      firstName,
      lastName,
      phone,
      uid,
      zip
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <form>
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.handleChange}
          name='firstName'
          value={this.state.firstName}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.handleChange}
          name='lastName'
          value={this.state.lastName}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.handleChange}
          name='email'
          value={this.state.email}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.handleChange}
          name='address'
          value={this.state.address}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.handleChange}
          name='zip'
          value={this.state.zip}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.handleChange}
          name='city'
          value={this.state.city}
        />
      </form>
    ) 
  }
}

export default EditUser;