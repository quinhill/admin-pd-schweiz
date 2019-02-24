import React from 'react';
import About from './About';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { saveAboutPd } from '../../store/actions/aboutActions';
import { firestoreConnect } from 'react-redux-firebase';

const AboutPd = (props) => {
  
  const saveContent = (content) => {
    props.saveAboutPd(content)
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
    aboutPd: state.firestore.ordered.about_pd
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