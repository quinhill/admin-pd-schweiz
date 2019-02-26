import React from 'react';
import About from './About';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { saveAboutKC } from '../../store/actions/aboutActions';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

const AboutKC = (props) => {

  const { aboutKC } = props;
  
  const saveContent = (text) => {
    console.log(text)
    props.saveAboutKC(text)
  }

  if (!props.auth.uid) {
    return <Redirect to='/signin' />
  }

  if (aboutKC) {
    console.log(aboutKC)
  }
  
  return (
    <div>
      <About saveContent={saveContent} />
      <h3>Current About KC:</h3>
      { aboutKC ?
          aboutKC[0].texts.map((paragraph, index) => {
            return (
              <p key={index}>{paragraph}</p>
            )
          }) :
        null
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    aboutKC: state.firestore.ordered.about_kc,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAboutKC: (text) => dispatch(saveAboutKC(text))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'about_kc', limit: 1, orderBy: ['createdAt', 'desc'] }
  ])
)(AboutKC);