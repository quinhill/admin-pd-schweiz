import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../store/actions/courseActions';

class CreateCourse extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCourse(this.state)
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            placeholder='Course Title'
            name='title'
            onChange={this.handleChange}
            value={this.state.title}
          />
          <textarea 
            placeholder='Description of course...'
            name='description'
            onChange={this.handleChange}
            value={this.state.description}
          />
          <button type='submit'>Submit Course</button>
        </form>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse: (course) => dispatch(createCourse(course))
  }
}

export default connect(null, mapDispatchToProps)(CreateCourse);