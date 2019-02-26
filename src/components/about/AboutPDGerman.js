import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const AboutPDGerman = (props) => {

  const { aboutPDDe } = props;

  return (
    <div>
      <h4>German:</h4>
      { aboutPDDe ?
          aboutPDDe[0].content.map((paragraph, index) => {
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
    aboutPDDe: state.firestore.ordered.about_pd_german,
  })

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { 
      collection: 'about_pd_german', 
      limit: 1, 
      orderBy: ['createdAt', 'desc'] 
    },
  ])
)(AboutPDGerman);