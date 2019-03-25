import React, { Component } from 'react';

class About extends Component {
  constructor() {
    super();
    this.state = {
      texts: [''],
      language: 'DE'
    }
  }

  addText = (event) => {
    const { id, value } = event.target;
    const newContent = this.state.texts;
    newContent[id] = value;
    this.setState({
      texts: newContent
    })
  }

  addParagraph = () => {
    this.setState({
      texts: [...this.state.texts, '']
    })
  }

  removeParagraph = (event) => {
    const { id } = event.target;
    const newContent = this.state.texts;
    if (newContent.length > 1) {
      newContent.splice(id, 1);
      this.setState({
        texts: newContent
      })
    }
  }

  saveContent = () => {
    this.props.saveContent(this.state)
  }

  changeLang = (event) => {
    const { value } = event.target;
    this.setState({
      language: value
    });
  }

  render() {

    const { texts } = this.state;

    const paragraphs = texts.map((text, index) => {
      return (
        <div className='textarea-wrapper' key={index}>
          <textarea
            text={text}
            id={index}
            value={texts[index]}
            onChange={this.addText}
          />
          <button
            className='medium-button'
            disabled={index < 1}
            onClick={this.removeParagraph}
            id={index}
          >
            Remove Paragraph
          </button>
        </div>
      )
    })

    return (
      <div className='about-wrapper'>
        {paragraphs}
        <button
          onClick={this.addParagraph}
        >
          Add Paragraph
        </button>
        <form className='lang-form'>
          <div className='radio-wrapper'>
            <label htmlFor='german'>German</label>
            <input 
              id='german'
              type='radio'
              name='language'
              value='DE'
              checked={this.state.language === 'DE'}
              onChange={this.changeLang}
            />
          </div>
          <div className='radio-wrapper'>
            <label htmlFor='english'>English</label>
            <input 
              id='english'
              type='radio'
              name='language'
              value='EN'
              checked={this.state.language === 'EN'}
              onChange={this.changeLang}
            />
          </div>
        </form>
        <button
          onClick={this.saveContent}
        >
          Save New Content
        </button>
      </div>
    )
  }
}

export default About;