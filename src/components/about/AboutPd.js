import React from 'react';
import About from './About';
import { connect } from 'react-redux';
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
    saveAboutPDEn
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
      <AboutPDEnglish />
      <AboutPDGerman />
    </div>
  )
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth
  })

const mapDispatchToProps = (dispatch) => {
  return {
    saveAboutPDDe: (text) => dispatch(saveAboutPDDe(text)),
    saveAboutPDEn: (text) => dispatch(saveAboutPDEn(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPD);