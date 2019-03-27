import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from '../store/actions/authActions';
import { connect } from 'react-redux';

const Navbar = (props) => {

  const signOut = () => {
    props.signOut()
  }

  const { auth } = props;

  const links = auth.uid ? 
    <button 
      className='medium-button sign-out-button' 
      onClick={signOut}
    >
      Sign Out
    </button> :
    <NavLink to='/signin'>Sign In</NavLink>;

  return (
    <nav>
      <div className='nav-links'>
        <NavLink className='nav-link' to='/'>Home</NavLink>
        <NavLink className='nav-link' to='/courses'>Courses</NavLink>
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
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);