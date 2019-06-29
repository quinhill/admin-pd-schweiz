import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from '../store/actions/authActions';
import { connect } from 'react-redux';
import firebase from '../config/fbConfig';

const Navbar = (props) => {

  const signOut = () => {
    props.signOut()
  }

  const { authStatus } = props;

  const links = authStatus.uid ? 
    <button 
      className='medium-button sign-out-button' 
      onClick={signOut}
    >
      Sign Out
    </button> :
    <NavLink to='/signin'>Sign In</NavLink>;

  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (user) {
      user.getIdTokenResult().then(IdTokenResult => {
        console.log(IdTokenResult.claims)
      })
    }
  })

  return (
    <nav>
      <div className='nav-links'>
        <NavLink className='nav-link' to='/courses'>Courses</NavLink>
        <NavLink className='nav-link' to='/users'>Users</NavLink>
        <NavLink className='nav-link' to='/aboutkc'>About KC</NavLink>
        <NavLink className='nav-link' to='/aboutpd'>About PD</NavLink>
        { links }
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    authStatus: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);