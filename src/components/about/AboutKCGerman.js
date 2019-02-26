import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const AboutKCGerman = (props) => {

  const { aboutKCDe } = props;

  return (
    <div>
      <h4>German:</h4>
      { aboutKCDe ?
          aboutKCDe[0].content.map((paragraph, index) => {
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
    aboutKCDe: state.firestore.ordered.about_kc_english,
  })

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { 
      collection: 'about_kc_german', 
      limit: 1, 
      orderBy: ['createdAt', 'desc'] 
    },
  ])
)(AboutKCGerman);