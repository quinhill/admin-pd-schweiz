import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { 
  updateCourse, 
  resetState, 
  createCourse,
  addExisting 
} from '../../store/actions/courseActions'

class EditCourse extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      date: '',
      dates: [''],
      timeStart: '',
      timeEnd: '',
      location: '',
      cost: '',
      participants: [],
      description: '',
      id: '',
    }
  }

  componentDidMount() {
    const { 
      title, 
      description,
      date,
      dates,
      timeStart,
      timeEnd,
      location,
      cost,
      participants,
      id
    } = this.props.course;
    this.setState({
      title,
      description,
      date,
      dates,
      timeStart,
      timeEnd,
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

  handleDateChange = (event) => {
    const {id} = event.target;
    const newDate = event.target.value;
    let dates = this.state.dates.map((date, index) => {
      if (index === parseInt(id)) {
        return newDate;
      } else {
        return date;
      }
    });
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
      course => {
        return course.date === this.state.dates[0]
      })
    if (existing) {
      console.log(this.state.date)
      this.props.addExisting();
    } else {
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
        >
          <input
            className='course-input'
            type='text'
            onChange={this.handleChange}
            name='title'
            value={this.state.title}
          />
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
            onClick={this.handleSubmit}
            id={this.props.course.id}
            className='medium-button'
          >
            Save Changes
          </button>
          <div>
            { updateSuccess ? <p>{updateSuccess}</p> : null }
            { updateError ? <p>{updateError}</p> : null }
          </div>
        </form>
        <button
          onClick={this.saveAsNew}
          className='large-button'
        >
          Save as new course
        </button>
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
    resetState: () => dispatch(resetState()),
    addExisting: () => dispatch(addExisting())

  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'courses' }
  ])
)(EditCourse);