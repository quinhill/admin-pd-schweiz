import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createCourse, addExisting, resetState } from '../../store/actions/courseActions';

const initialState = {
  title: 'Einführungskurs',
  location: 'Schule Pfrundmatte, 1. Stock (Bibliothek), Meiringen',
  cost: '150Fr. pro Person. Babysitter Rabatt: 240Fr. für beide Eltern',
  description: 'Zum Wohlergehen der ganzen Familie mit der Positiven Disziplin'
}

class CreateCourse extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      location: '',
      time: '',
      date: '',
      cost: '',
      description: ''
    }
  }

  componentDidMount() {
    this.setState(initialState)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { courses } = this.props;
    const existing = courses.find(course => course.date === this.state.date)
    if (existing) {
      this.props.addExisting();
    } else {
      this.props.resetState();
      this.props.createCourse(this.state);
      this.setState(initialState);
    }
  }

  render() {

    const { updateMessage } = this.props;

    return(
      <div className='course-form-wrapper'>
        <form 
          className='course-form'
          onSubmit={this.handleSubmit}
        >
          { 
            updateMessage ? 
              <p className='error-message'>{updateMessage}</p> :
              null
          }
          <input 
            className='course-input'
            type='text'
            placeholder='Course Title'
            name='title'
            onChange={this.handleChange}
            value={this.state.title}
          />
          <input 
            className='course-input'
            type='date'
            placeholder='Date'
            name='date'
            onChange={this.handleChange}
            value={this.state.date}
          />
          <input 
            className='course-input'
            type='time'
            placeholder='Time'
            name='time'
            onChange={this.handleChange}
            value={this.state.time}
          />
          <input 
            className='course-input'
            type='text'
            placeholder='Location'
            name='location'
            onChange={this.handleChange}
            value={this.state.location}
          />
          <input 
            className='course-input'
            type='text'
            placeholder='Cost'
            name='cost'
            onChange={this.handleChange}
            value={this.state.cost}
          />
          <textarea 
            placeholder='Description of course...'
            name='description'
            onChange={this.handleChange}
            value={this.state.description}
          />
          <button 
            type='submit'
            className='medium-button'
          >
            Submit Course
          </button>
        </form>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  courses: state.firestore.ordered.courses,
  updateMessage: state.courses.updateError
})

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse: (course) => dispatch(createCourse(course)),
    addExisting: () => dispatch(addExisting()),
    resetState: () => dispatch(resetState())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'courses' }
  ])
)(CreateCourse);