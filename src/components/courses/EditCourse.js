import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCourse } from '../../store/actions/courseActions'

class EditCourse extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      date: '',
      time: '',
      location: '',
      cost: '',
      participants: [],
      description: '',
      id: ''
    }
  }

  componentDidMount() {
    const { 
      title, 
      description,
      date,
      time,
      location,
      cost,
      participants,
      id
    } = this.props.course;
    this.setState({
      title,
      description,
      date,
      time,
      location,
      cost,
      participants,
      id
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const details = {
      ...this.state,
    };
    const existingValue = this.checkExisting(details)
    if (!existingValue) {
      return this.props.updateCourse(details)
    }
  }

  checkExisting = (updated) => {
    const course = this.props.courses.find(course => (
      course.id === this.state.id))
    const existing = Object.keys(updated).find((key) => {
      return updated[key] !== course[key]
    }) === undefined ? true : false;
    return existing;
  }

  resetState = () => {
    this.setState({
      title: '',
      date: '',
      location: '',
      description: '',
      cost: ''
    })
  }

  render() {

    const { 
      updateSuccess, 
      updateError,
    } = this.props;

    return (
      <div className='course-form-wrapper'>
        <form 
          className='course-form'
          onSubmit={this.handleSubmit}
          >
          <input
            className='course-input'
            type='text'
            onChange={this.handleChange}
            name='title'
            value={this.state.title}
            />
          <input
            className='course-input'
            type='text'
            onChange={this.handleChange}
            name='date'
            value={this.state.date}
            />
          <input
            className='course-input'
            type='text'
            onChange={this.handleChange}
            name='time'
            value={this.state.time}
          />
          <input
            className='course-input'
            type='text'
            onChange={this.handleChange}
            name='location'
            value={this.state.location}
            />
          <input
            className='course-input'
            type='text'
            onChange={this.handleChange}
            name='cost'
            value={this.state.cost}
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.firestore.ordered.courses,
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