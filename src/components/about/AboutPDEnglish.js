import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const AboutPDEnglish = (props) => {

  const { aboutPDEn } = props;

  return (
    <div>
      <h4>English:</h4>
      { aboutPDEn ?
          aboutPDEn[0].content.map((paragraph, index) => {
            return (
              <p key={index}>{paragraph}</p>
            )
          }) :
        null
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
    aboutPDEn: state.firestore.ordered.about_pd_english,
  })

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { 
      collection: 'about_pd_english', 
      limit: 1, 
      orderBy: ['createdAt', 'desc'] 
    },
  ])
)(AboutPDEnglish);