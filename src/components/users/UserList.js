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
      <div>
        <h1>Users</h1>
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