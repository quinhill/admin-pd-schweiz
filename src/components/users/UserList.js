import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import UserDetails from './UserDetails';

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      sortBy: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  sortUsers = (event) => {
    const { value } = event.target;
    const sortBy = value;

    this.setState({ sortBy })
  }

  populateUsers = users => {
    this.setState({ users })
  }

  render() {

    const { users } = this.props;
    const { search, sortBy } = this.state;

    const filteredUsers = users ? users.filter(user => {
      const name = `${user.firstName}${user.lastName}`.toLowerCase()
      return name.includes(search);
    }) :
    null

    const sortedUsers = filteredUsers ? filteredUsers.sort((a, b) => {
      if (!sortBy) {
        return a;
      }
      return (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) ? 1 : -1;
    }) :
    null

    console.log(sortedUsers)

    return (
      <div className='user-container'>
        <input 
          type='text'
          onChange={this.handleChange}
          name='search'
          value={this.state.search}
        />
        <select
          defaultValue=''
          onChange={this.sortUsers}
        >
          <option value=''>Sort by...</option>
          <option value='firstName'>First Name</option>
          <option value='lastName'>Last Name</option>
          <option value='createdOn'>Date Created</option>
          <option value='email'>Email</option>
        </select>
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
          sortedUsers ? sortedUsers.map((user, index) => {
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