import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import UserDetails from './UserDetails';

class UserList extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    const { users } = this.props;


    return (
      <div className='user-container'>
        <h1>Users</h1>
        <div className='user-list-header-container'>
          <h4 className='user-detail'>First Name</h4>
          <h4 className='user-detail'>Last Name</h4>
          <h4 className='user-detail'>Email</h4>
          <h4 className='user-detail'>Address</h4>
          <h4 className='user-detail' id='short'>Zip</h4>
          <h4 className='user-detail'>City</h4>
          <h4 className='user-detail' id='long'>User ID</h4>
        </div>
        {
          users ? users.map((user, index) => {
            return (
              <UserDetails
                user={user}
                key={index}
              />
            )
          })
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.firestore)
  return {
    users: state.firestore.ordered.users,
  }
}

const mapDispatchToProps = (dispatch) => ({

})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'users',
      orderBy: ['lastName', 'asc']
    }
  ])
)(UserList);