import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'react';
import AboutMeForm from './AboutMeForm';

class AboutMe extends Component {
  constructor() {
    super();
    this.state = {
      content: ['']
    }
  }

  addText = () => {

  }

  addParagraph = () => {
    this.setState({
      content: [...this.state.content, '']
    })
  }

  removeParagraph = (id) => {
    const newContent = this.state.content;
    newContent.splice(id, 1);
    this.setState({
      content: newContent
    })
  }

  render() {
    console.log(this.state)

    const { content } = this.state;

    const paragraphs = content.map((text, index) => {
      return (
        <AboutMeForm
          text={text}
          key={index}
          id={index}
          addText={this.addText}
          removeParagraph={this.removeParagraph}
        />
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
      </div>
    )
  }
}

export default AboutMe;