import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from '../store/actions/authActions';
import { connect } from 'react-redux';

const Navbar = (props) => {

  const handleClick = () => {
    props.signOut()
  }

  const { auth } = props;
  console.log(auth)

  const links = auth.uid ? 
    <a href='' onClick={handleClick}>Sign Out</a> :
    <NavLink to='/signin'>Sign In</NavLink>;

  return (
    <nav>
      <div className='nav-links'>
        <NavLink to='/'>Home</NavLink>
        { links }
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);