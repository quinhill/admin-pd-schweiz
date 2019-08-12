import React, { Component } from 'react'
import EditCourse from './EditCourse';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import EditOldCourse from './EditOldCourse';

class CourseDetails extends Component {
  constructor() {
    super();
    this.state = {
      editOld: false,
      editNew: false
    }
  }

  hideDetails = (event) => {
    this.props.displayCourse(event.target.id)
  }

  editCourse = (event) => {
    const { courses } = this.props;
    const { id } = event.target;
    const course = courses.find(course => course.id === id);
    if (course.timeStart) {
      this.setState({
        editNew: !this.state.editNew,
        editOld: false
      })
    } else if (course.time) {
      this.setState({
        editOld: !this.state.editOld,
        editNew: false
      })
    }
  }

  toggleEdit = id => {
    const { courses } = this.props;
    const course = courses.find(course => course.id === id);
    if (course.timeStart) {
      this.setState({
        editNew: !this.state.editNew,
        editOld: false
      })
    } else if (course.time) {
      this.setState({
        editOld: !this.state.editOld,
        editNew: false
      })
    }
  }

  deleteCourse = (event) => {
    const { id } = event.target;
    this.props.deleteCourse(id);
  }

  render() {

    moment.locale('de')

    const { course, list } = this.props;

    const courseDates = course.dates ? 
    course.dates.map((date) => {
      if (date.length) {
        const dateString = new Date(date);
        return moment(dateString).format('dddd, LL');
      } else {
        return null
      }
    }) :
    null;

    return (
      <div className='course-container'>
        <button
          className='medium-button course-button'
          onClick={this.hideDetails}
          id={course.id}
        >
          {course.title}
        </button>
        <h3>{course.title}</h3>
        <div className='course-details-wrapper'>
          <div className='course-details'>
            <p><span className='description'>Dates: </span></p>
            {
              courseDates ? 
                courseDates.map((date, index) => {
                  return (
                    <p 
                      className='card-p'
                      key={index}
                    >
                      {date}
                    </p>
                  )
                }) :
                null
            }
            <p>
              <span className='description'>Start Time: </span>
              {course.timeStart}
            </p>
            <p>
              <span className='description'>End Time: </span>
              {course.timeEnd}
            </p>
            <p>
              <span className='description'>Location: </span>
              {course.location}
            </p>
            <p>
              <span className='description'>Cost: </span>
              {course.cost}
            </p>
            <p>
              <span className='description'>Description: </span>
              {course.description}
            </p>
          </div>
          <div className='course-details'>
            <h3>Participants:</h3>
            {
              list ?
                list.participants.map((participant, index) => {
                  return(
                    <p key={index}>
                    {participant.firstName} {participant.lastName}
                    </p>
                  )
                }) :
                null
            }
          </div>
        </div>
        { 
          this.state.editNew ?
            <EditCourse
              course={course}
              toggleEdit={this.toggleEdit}
            /> :
            null
        }
        {
          this.state.editOld ?
            <EditOldCourse
              course={course}
              editCourse={this.toggleEdit}
            /> :
            null
        }
        <button 
          id={course.id}
          className='medium-button'
          onClick={this.editCourse}
        >
          Edit Course
        </button>
        <button
          className='medium-button delete-button'
          id={course.id}
          onClick={this.deleteCourse}
        >
          Delete Course
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courseList: state.firestore.data.course_participants,
    signedUp: state.firestore.ordered.users,
    courses: state.firestore.ordered.courses
  }
}


export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      { 
        collection: 'course_participants',
        doc: props.course.id
      },
      { collection: 'courses' }
    ]
  })
) (CourseDetails);