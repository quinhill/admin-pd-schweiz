import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const AboutKCEnglish = (props) => {

  const { aboutKCEn } = props;

  return (
    <div>
      <h4>English:</h4>
      { aboutKCEn ?
          aboutKCEn[0].content.map((paragraph, index) => {
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
    aboutKCEn: state.firestore.ordered.about_kc_english,
  })

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { 
      collection: 'about_kc_english', 
      limit: 1, 
      orderBy: ['createdAt', 'desc'] 
    },
  ])
)(AboutKCEnglish);