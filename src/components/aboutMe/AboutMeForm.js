import React, { Component } from 'react';

class AboutMeForm extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({
      text: value
    })
    this.props.addText(id, this.state.text)
  }

  handlClick = (event) => {
    this.props.removeParagraph(event.target.id);
  }

  render() {
    return (
      <div>
        <textarea 
          onChange={this.handleChange}
          value={this.state.text}
          id={this.props.id}
        />
        <button
          onClick={this.handlClick}
          id={this.props.id}
        >
          Remove Paragraph
        </button>
      </div>
    )
  }
}

export default AboutMeForm;