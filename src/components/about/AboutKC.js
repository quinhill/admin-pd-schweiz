import React from 'react';
import About from './About';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { saveAboutKC } from '../../store/actions/aboutActions';
import { firestoreConnect } from 'react-redux-firebase';

const AboutKC = (props) => {

  const { aboutKC } = props;
  
  const saveContent = (content) => {
    props.saveAboutKC(content)
  }
  
  return (
    <div>
      <About saveContent={saveContent} />
      <h3>Current About KC:</h3>
      { aboutKC ?
          aboutKC[0].content.map((paragraph, index) => {
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
    aboutKC: state.firestore.ordered.about_kc
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAboutKC: (content) => dispatch(saveAboutKC(content))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'about_kc', limit: 1, orderBy: ['createdAt', 'desc'] }
  ])
)(AboutKC);