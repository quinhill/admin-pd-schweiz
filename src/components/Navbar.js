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
    <button onClick={signOut}>Sign Out</button> :
    <NavLink to='/signin'>Sign In</NavLink>;

  return (
    <nav>
      <div className='nav-links'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/courses'>Courses</NavLink>
        <NavLink to='/aboutkc'>About KC</NavLink>
        <NavLink to='/aboutpd'>About PD</NavLink>
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