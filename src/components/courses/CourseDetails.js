import React, { Component } from 'react'
import EditCourse from './EditCourse';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CourseDetails extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    }
  }

  hideDetails = (event) => {
    this.props.displayCourse(event.target.id)
  }

  editCourse = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  deleteCourse = (event) => {
    const { id } = event.target;
    this.props.deleteCourse(id);
  }

  render() {

    console.log(this.props.participants)

    const { course } = this.props;
    const date = moment(course.date.toDate()).format('dddd, LL');
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
            <p>
              <span className='description'>Date: </span>
              {date}
            </p>
            <p>
              <span className='description'>Time: </span>
              {course.time}
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
          </div>
        </div>
        { 
          this.state.edit ? 
            <EditCourse 
              course={course} 
              editCourse={this.editCourse} 
            /> : 
            null 
        }
        <button 
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

const mapStateToProps = (state) => ({
  participants: state.firestore.ordered.course_participants
})

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      { 
        collection: 'course_participants',
        doc: props.course.id
      }
    ]
  })
) (CourseDetails);