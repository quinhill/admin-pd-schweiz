import React, { Component } from 'react';
import CourseTitle from './CourseTitle';
import CourseDetails from './CourseDetails';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import CreateCourse from './CreateCourse';

class CourseList extends Component {
  constructor() {
    super();
    this.state = {
      courseId: '',
    }
  }

  displayCourse = (id) => {
    if (this.state.courseId === id) {
      this.setState({
        courseId: ''
      })
    } else {
      this.setState({
        courseId: id
      })
    }
  }

  render() {

    const { courses } = this.props;
    const { courseId } = this.state;

    const selectedCourse = courseId ?
      courses.find(course => course.id === courseId) :
      null;

    return (
      <div className='coursepage-container'>
        <div className='courselist-container'>
          { 
            courses ? courses.map((course, index) => {
              if (course.id === courseId) {
                return (
                  <CourseDetails 
                    course={selectedCourse}
                    displayCourse={this.displayCourse}
                    key={index}
                  />
                )
              } else {
                return (
                  <CourseTitle 
                    course={course} 
                    displayCourse={this.displayCourse}
                    key={index}
                  />
                )
              }
            }) : null
          }
        </div>
        <CreateCourse />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.firestore.ordered.courses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'courses' }
  ])
)(CourseList);