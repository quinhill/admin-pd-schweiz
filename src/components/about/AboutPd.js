import React from 'react';
import About from './About';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { saveAboutPd } from '../../store/actions/aboutActions';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

const AboutPd = (props) => {
  
  const saveContent = (content) => {
    props.saveAboutPd(content)
  }
  
  if (!props.auth.uid) {
    return <Redirect to='/signin' />
  }

  return (
    <div>
      <About saveContent={saveContent} />
      <h3>Current About PD:</h3>
      { props.aboutPd ?
          props.aboutPd[0].content.map((paragraph, index) => {
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
    aboutPd: state.firestore.ordered.about_pd,
    auth: state.firebase.auth,
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAboutPd: (content) => dispatch(saveAboutPd(content))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'about_pd', limit: 1, orderBy: ['createdAt', 'desc'] }
  ])
)(AboutPd);