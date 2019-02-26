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

  removeParagraph = (id) => {
    const newContent = this.state.texts;
    if (newContent.length > 1) {
      newContent.splice(id, 1);
      this.setState({
        texts: newContent
      })
    }
  }

  saveContent = () => {
    const content = {
      ...this.state,
      createdAt: new Date()
    }
    this.props.saveContent(content)
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
        <div key={index}>
          <textarea
            text={text}
            id={index}
            value={texts[index]}
            onChange={this.addText}
          />
          <button
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
      <div>
        {paragraphs}
        <button
          onClick={this.addParagraph}
        >
          Add Paragraph
        </button>
        <form>
          <label htmlFor='german'>German</label>
          <input 
            id='german'
            type='radio'
            name='language'
            value='DE'
            checked={this.state.language === 'DE'}
            onChange={this.changeLang}
          />
          <label htmlFor='english'>English</label>
          <input 
            id='english'
            type='radio'
            name='language'
            value='EN'
            checked={this.state.language === 'EN'}
            onChange={this.changeLang}
          />
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