import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCourse } from '../../store/actions/courseActions'

class EditCourse extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: ''
    }
  }

  componentDidMount() {
    const { title, description } = this.props.course;
    this.setState({
      title,
      description
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id } = this.props.course;
    const details = {
      ...this.state,
      id
    }
    this.props.updateCourse(details)
    this.resetState();
  }

  resetState = () => {
    this.setState({
      title: '',
      date: '',
      location: '',
      description: ''
    })
  }

  render() {

    const { 
      updateSuccess, 
      updateError 
    } = this.props;

    return (
      <form 
        className='course-form'
        onSubmit={this.handleSubmit}
      >
        <input
          type='text'
          onChange={this.handleChange}
          name='title'
          value={this.state.title}
        />
        <input
          type='text'
          onChange={this.handleChange}
          name='date'
          value={this.state.date}
        />
        <input
          type='text'
          onChange={this.handleChange}
          name='location'
          value={this.state.location}
        />
        <textarea
          onChange={this.handleChange}
          name='description'
          value={this.state.description}
        />
        <button 
          type='submit'
          className='medium-button'
        >
          Save Changes
        </button>
        <div>
          { updateSuccess ? <p>{updateSuccess}</p> : null }
          { updateError ? <p>{updateError}</p> : null }
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    updateSuccess: state.courses.updateSuccess,
    updateError: state.courses.updateError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCourse: (details) => dispatch(updateCourse(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);