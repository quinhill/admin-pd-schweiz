import React, { Component } from 'react';

class AboutMeForm extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handlClick = (event) => {
    this.props.removeParagraph(event.target.id);
  }

  render() {
    return (
      <div>
        <textarea 
          onChange={this.handleChange}
          value={this.props.text}
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