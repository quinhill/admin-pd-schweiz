import React from 'react';
import About from './About';
import { connect } from 'react-redux';
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
    saveAboutKCEn
  } = props;
  
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
      <AboutKCEnglish />
      <AboutKCGerman />
    </div>
  )
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth
  })

const mapDispatchToProps = (dispatch) => {
  return {
    saveAboutKCDe: (text) => dispatch(saveAboutKCDe(text)),
    saveAboutKCEn: (text) => dispatch(saveAboutKCEn(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutKC);