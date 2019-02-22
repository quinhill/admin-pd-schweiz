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

  render() {

    const { course } = this.props;

    return (
      <div className='course-container'>
        <button
          onClick={this.hideDetails}
          id={course.id}
        >
          {course.title}
        </button>
        <p>{course.date}</p>
        <p>{course.time}</p>
        <p>{course.location}</p>
        <p>{course.cost}</p>
        <p>{course.description}</p>
        { this.state.edit ? <EditCourse course={course} /> : null }
        <button onClick={this.editCourse}>
          Edit Course
        </button>
      </div>
    )
  }
}

export default CourseDetails;