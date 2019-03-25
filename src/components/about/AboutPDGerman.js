import React from 'react';

const AboutPDGerman = (props) => {

  const { text } = props;

  console.log(text)

  return (
    <div>
      <h4>German:</h4>
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

export default AboutPDGerman;