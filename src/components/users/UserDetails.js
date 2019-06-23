import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserDetails extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    console.log(this.props)

    const {
      address,
      firstName,
      lastName,
      email,
      uid
    } = this.props.user;

    console.log(firstName)

    return (
      <div className='list-item'>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{email}</p>
        <p>{address}</p>
        <p>{uid}</p>
      </div>
    )
  }
}

export default UserDetails;