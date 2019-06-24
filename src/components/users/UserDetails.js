import React, { Component } from 'react';
import EditUser from './EditUser';

class UserDetails extends Component {
  constructor() {
    super()
    this.state = {
      edit: false
    }
  }

  openEdit = (id) => {
    this.setState({ edit: !this.state.edit })
  }

  render() {
    console.log(this.props)

    const {
      address,
      city,
      zip,
      firstName,
      lastName,
      email,
      uid
    } = this.props.user;

    return (
      <div className='user-list-container'>
        <div className='list-item'>
          <p className='user-detail'>{firstName}</p>
          <p className='user-detail'>{lastName}</p>
          <p className='user-detail'>{email}</p>
          <p className='user-detail'>{address}</p>
          <p id='short'>{zip}</p>
          <p className='user-detail'>{city}</p>
          <p id='long'>{uid}</p>
          <button
            className='edit-button'
            id={uid}
            onClick={this.openEdit}
            >
            Edit
          </button>
          <button

  >
            Delete
          </button>
        </div>
          {
            this.state.edit ?
            <EditUser userDetails={this.props.user} /> :
            null
          }
      </div>
    )
  }
}

export default UserDetails;