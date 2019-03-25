import React from 'react';
import About from './About';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { 
  saveAboutPDDe,
  saveAboutPDEn
} from '../../store/actions/aboutActions';
import { Redirect } from 'react-router-dom';
import AboutPDEnglish from './AboutPDEnglish';
import AboutPDGerman from './AboutPDGerman';

const AboutPD = (props) => {

  const {
    saveAboutPDDe,
    saveAboutPDEn,
    aboutPDDe,
    aboutPDEn
  } = props;
  
  const saveContent = (content) => {
    content.language === 'DE' ?
      saveAboutPDDe(content.texts) :
      saveAboutPDEn(content.texts);
  }

  if (!props.auth.uid) {
    return <Redirect to='/signin' />
  }
  
  return (
    <div>
      <About saveContent={saveContent} />
      <h3>Current About PD:</h3>
      <AboutPDEnglish text={aboutPDEn} />
      <AboutPDGerman text={aboutPDDe} />
    </div>
  )
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    aboutPDEn: state.firestore.ordered.about_pd_english,
    aboutPDDe: state.firestore.ordered.about_pd_german
  })

const mapDispatchToProps = (dispatch) => {
  return {
    saveAboutPDDe: (text) => dispatch(saveAboutPDDe(text)),
    saveAboutPDEn: (text) => dispatch(saveAboutPDEn(text))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'about_pd_english',
      limit: 1,
      orderBy: ['createdAt', 'desc']
    },
    {
      collection: 'about_pd_german',
      limit: 1,
      orderBy: ['createdAt', 'desc']
    }
  ])
)(AboutPD);