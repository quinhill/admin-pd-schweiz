import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { 
  updateCourse, 
  resetState, 
  createCourse 
} from '../../store/actions/courseActions'

class EditOldCourse extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      events: 1,
      date: '',
      dates: [''],
      timeStart: '',
      timeEnd: '',
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
      dates: [date],
      timeStart: time,
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

  handleQuantityChange = (event) => {
    const {dates} = this.state;
    let number = event.target.value;
    let eventsNumber = dates;
    for (let i = dates.length; i < number; i++) {
      eventsNumber.push('');
    }
    if (number < dates.length) {
      eventsNumber = eventsNumber.filter((date, index) => {
        return index < number
      })
    }
    this.setState({
      dates: eventsNumber,
      events: number
    });
  }

  handleDateChange = (event) => {
    let dates = this.state.dates;
    const {id} = event.target;
    dates[id] = event.target.value;
    this.setState({
      dates
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const details = {
      ...this.state,
    };
    const existingValue = this.checkExisting(details)
    if (!existingValue) {
      this.props.updateCourse(details)
      this.props.editCourse();
    }
  }

  saveAsNew = () => {
    const { courses } = this.props;
    const existing = courses.find(
      course => course.date === this.state.date
    )
    if (existing) {
      this.props.addExisting();
    } else {
      this.props.resetState();
      this.props.createCourse(this.state);
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
          <label htmlFor='event-quantity'>
            How many events will there be for this course?
          </label>
          <input
            type='number'
            min='1'
            id='event-quantity'
            name='events'
            onChange={this.handleQuantityChange}
            value={this.state.events}
          />
          <label htmlFor='dates'>Dates:</label>
          {
            this.state.dates.map((event, index) => {
              return (
                <input 
                  key={index}
                  className='course-input'
                  id={index}
                  type='date'
                  placeholder='Date'
                  name='date'
                  onChange={this.handleDateChange}
                  value={this.state.dates[index]}
                />
              )
            })
          }
          <input
            className='course-input'
            type='time'
            onChange={this.handleChange}
            name='timeStart'
            value={this.state.timeStart}
          />
          <input
            className='course-input'
            type='time'
            onChange={this.handleChange}
            name='timeEnd'
            value={this.state.timeEnd}
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
          <button
            onClick={this.saveAsNew}
            className='large-button'
          >
            Save as new course
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
    createCourse: (course) => dispatch(createCourse(course)),
    updateCourse: (details) => dispatch(updateCourse(details)),
    resetState: () => dispatch(resetState())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'courses' }
  ])
)(EditOldCourse);