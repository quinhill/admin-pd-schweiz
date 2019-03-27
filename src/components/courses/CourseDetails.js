import React, { Component } from 'react'
import EditCourse from './EditCourse';

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

    const { course } = this.props;

    return (
      <div className='course-container'>
        <button
          className='medium-button'
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
              {course.date}
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
            {/* {
              course.participants.map((participant, index) => {
                return (
                  <p
                    key={index}
                  >
                    {participant.lastName}, {participant.firstName}
                  </p>
                )
              })
            } */}
          </div>
        </div>
        { 
          this.state.edit ? 
            <EditCourse course={course} /> : 
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

export default CourseDetails;