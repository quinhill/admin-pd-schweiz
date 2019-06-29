import React, { Component } from 'react';
import EditUser from './EditUser';
import DeletePrompt from './DeletePrompt';
import { connect } from 'react-redux';
import { deleteUser } from '../../store/actions/userActions';

class UserDetails extends Component {
  constructor() {
    super()
    this.state = {
      edit: false,
      shouldDelete: false,
    }
  }

  openEdit = (id) => {
    this.setState({ edit: !this.state.edit })
  }

  toggleDeletePrompt = (event) => {
    this.setState({ shouldDelete: !this.state.shouldDelete})
  }

  deleteUser = (uid) => {
    this.props.deleteUser(uid)
  }

  render() {

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
            className='delete-button'
            id={uid}
            onClick={this.toggleDeletePrompt}
          >
            Delete
          </button>
        </div>
          {
            this.state.edit ?
            <EditUser userDetails={this.props.user} /> :
            null
          }
          {
            this.state.shouldDelete ?
              <DeletePrompt 
                user={this.props.user}
                toggleDeletePrompt={this.toggleDeletePrompt}
                deleteUser={this.deleteUser}
              /> :
              null
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  deleteMessage: state.users
})

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (uid) => dispatch(deleteUser(uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);