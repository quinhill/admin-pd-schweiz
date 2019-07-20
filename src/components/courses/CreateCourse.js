import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createCourse, addExisting, resetState } from '../../store/actions/courseActions';

const initialState = {
  title: 'Einführungskurs',
  date: [''],
  timeStart: '',
  timeEnd: '',
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
      timeStart: '',
      timeEnd: '',
      events: 1,
      date: [''],
      dates: [''],
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
      date: dates[0],
      dates
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
          <label htmlFor='course-title'>Course Title:</label>
          <input 
            className='course-input'
            id='course-title'
            type='text'
            placeholder='Course Title'
            name='title'
            onChange={this.handleChange}
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
          <label htmlFor='startTime'>
            Starts At:
          </label>
          <input 
            id='startTime'
            className='course-input'
            type='time'
            placeholder='Start time'
            name='timeStart'
            onChange={this.handleChange}
            value={this.state.timeStart}
          />
          <label htmlFor='endTime'>
            Ends at:
          </label>
          <input 
            id='endTime'
            className='course-input'
            type='time'
            placeholder='End time'
            name='timeEnd'
            onChange={this.handleChange}
            value={this.state.timeEnd}
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