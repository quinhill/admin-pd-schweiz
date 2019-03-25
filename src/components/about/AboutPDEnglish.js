import React from 'react';

const AboutPDEnglish = (props) => {

  const { text } = props;

  console.log(text)

  return (
    <div>
      <h4>English:</h4>
      { text ?
          text[0].content.map((paragraph, index) => {
            return (
              <p key={index}>{paragraph}</p>
            )
          }) :
        null
      }
    </div>
  )
}

export default AboutPDEnglish;