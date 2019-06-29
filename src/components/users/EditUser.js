import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../store/actions/userActions';

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
      zip,
    })
  }

  editChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitEdit = (event) => {
    event.preventDefault();
    const details = { ...this.state }
    this.props.updateUser(details);
  }

  render() {
    return (
      <form
        onSubmit={this.submitEdit}
      >
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.editChange}
          name='firstName'
          value={this.state.firstName}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.editChange}
          name='lastName'
          value={this.state.lastName}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.editChange}
          name='email'
          value={this.state.email}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.editChange}
          name='address'
          value={this.state.address}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.editChange}
          name='zip'
          value={this.state.zip}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.editChange}
          name='city'
          value={this.state.city}
        />
        <input 
          className='edit-user-input'
          type='text'
          onChange={this.handleChange}
          name='phone'
          value={this.state.phone}
        />
        <button
          type='submit'
        >
          Save Changes
        </button>
      </form>
    ) 
  }
}

const mapStateToProps = (state) => ({
  user: state.users
})

const mapDispatchToProps = (dispatch) => ({
  updateUser: (details) => dispatch(updateUser(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);