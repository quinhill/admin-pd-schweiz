import React from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from '../store/actions/authActions';
import { changeLanguage } from '../store/actions/languageActions';
import { connect } from 'react-redux';

const Navbar = (props) => {

  const handleClick = () => {
    props.signOut()
  }

  const { auth } = props;

  const makeEng = () => {
    props.changeLanguage('EN')
  }

  const makeGer = () => {
    props.changeLanguage('DE')
  }

  const links = auth.uid ? 
    <a href='auth' onClick={handleClick}>Sign Out</a> :
    <NavLink to='/signin'>Sign In</NavLink>;

  return (
    <nav>
      <div className='nav-links'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/courses'>Courses</NavLink>
        <NavLink to='/aboutkc'>About KC</NavLink>
        <NavLink to='/aboutpd'>About PD</NavLink>
        { links }
        <div>
          <button onClick={makeEng}>EN</button>
          <button onClick={makeGer}> DE</button>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    changeLanguage: (lang) => dispatch(changeLanguage(lang))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);