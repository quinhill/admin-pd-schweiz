import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { saveAboutMe } from '../../store/actions/aboutMeActions';
import { firestoreConnect } from 'react-redux-firebase';

class AboutMe extends Component {
  constructor() {
    super();
    this.state = {
      content: ['']
    }
  }

  addText = (event) => {
    const { id, value } = event.target;
    const newContent = this.state.content;
    newContent[id] = value;
    this.setState({
      content: newContent
    })
  }

  addParagraph = () => {
    this.setState({
      content: [...this.state.content, '']
    })
  }

  removeParagraph = (id) => {
    const newContent = this.state.content;
    if (newContent.length > 1) {
      newContent.splice(id, 1);
      this.setState({
        content: newContent
      })
    }
  }

  saveContent = () => {
    this.props.saveAboutMe(this.state.content)
  }

  render() {

    const { content } = this.state;

    const paragraphs = content.map((text, index) => {
      return (
        <div key={index}>
          <textarea
            text={text}
            id={index}
            value={content[index]}
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
        <button
          onClick={this.saveContent}
        >
          Save New Content
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAboutMe: (content) => dispatch(saveAboutMe(content))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'about_kc' }
  ])
)(AboutMe);