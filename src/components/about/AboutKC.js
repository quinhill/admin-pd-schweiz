import React from 'react';
import About from './About';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { 
  saveAboutKCDe,
  saveAboutKCEn
} from '../../store/actions/aboutActions';
import { Redirect } from 'react-router-dom';
import AboutKCEnglish from './AboutKCEnglish';
import AboutKCGerman from './AboutKCGerman';

const AboutKC = (props) => {

  const {
    saveAboutKCDe,
    saveAboutKCEn,
    aboutKCEn,
    aboutKCDe
  } = props;

  console.log(aboutKCDe)
  
  const saveContent = (content) => {
    content.language === 'DE' ?
      saveAboutKCDe(content.texts) :
      saveAboutKCEn(content.texts);
  }

  if (!props.auth.uid) {
    return <Redirect to='/signin' />
  }
  
  return (
    <div>
      <About saveContent={saveContent} />
      <h3>Current About KC:</h3>
      <AboutKCEnglish text={aboutKCEn} />
      <AboutKCGerman text={aboutKCDe} />
    </div>
  )
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    aboutKCEn: state.firestore.ordered.about_kc_english,
    aboutKCDe: state.firestore.ordered.about_kc_german
  })

const mapDispatchToProps = (dispatch) => {
  return {
    saveAboutKCDe: (text) => dispatch(saveAboutKCDe(text)),
    saveAboutKCEn: (text) => dispatch(saveAboutKCEn(text))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { 
      collection: 'about_kc_english', 
      limit: 1, 
      orderBy: ['createdAt', 'desc'] 
    },
    {
      collection: 'about_kc_german',
      limit: 1,
      orderBy: ['createdAt', 'desc']
    }
  ])
)(AboutKC);