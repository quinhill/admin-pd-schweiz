import React, { Component } from 'react';
import CourseTitle from './CourseTitle';
import CourseDetails from './CourseDetails';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { deleteCourse, resetState } from '../../store/actions/courseActions';

class CourseList extends Component {
  constructor() {
    super();
    this.state = {
      courseId: '',
      showPrev: false
    }
  }

  displayCourse = (id) => {
    if (this.state.courseId === id) {
      this.setState({
        courseId: ''
      })
      this.props.resetState();
    } else {
      this.setState({
        courseId: id
      })
      this.props.resetState();
    }
  }

  deleteCourse = (id) => {
    this.props.deleteCourse(id)
  }

  showPrev = () => {
    this.setState({showPrev: !this.state.showPrev})
  }

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to='/signin' />
    }

    const { courses, participants } = this.props;
    const { courseId, showPrev } = this.state;

    const selectedCourse = courseId ?
      courses.find(course => course.id === courseId) :
      null;
    
    const selectedParticipants = courseId ?
      participants.find(list => list.id === courseId) :
      null;

    const current = new Date().getTime();

    const upcoming = courses ?
      courses.filter((course) => {
        const dateTime = parseInt(`${course.date.seconds}000`)
        return dateTime > current;
    }) :
    null;

    const previous = courses ?
      courses.filter((course) => {
        const dateTime = parseInt(`${course.date.seconds}000`)
        return dateTime <= current;
    }) :
    null;

    const buttonText = showPrev ?
      'Hide previous courses' :
      'Show previous coursese'

    return (
      <div className='courselist-container'>
        { 
          upcoming ? upcoming.map((course, index) => {
            if (course.id === courseId) {
              return (
                <CourseDetails 
                  course={selectedCourse}
                  list={selectedParticipants}
                  displayCourse={this.displayCourse}
                  deleteCourse={this.deleteCourse}
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
        {
          showPrev ?
            <div>
              <p>Previous courses:</p> 
              {
                previous.map((course, index) => {
                  if (course.id === courseId) {
                    return (
                      <CourseDetails
                        course={selectedCourse}
                        list={selectedParticipants}
                        displayCourse={this.displayCourse}
                        deleteCourse={this.deleteCourse}
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
                })
              }
            </div>:
            null
        }
        <button
          onClick={this.showPrev}
        >
          {buttonText}
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.firestore.ordered.courses,
    participants: state.firestore.ordered.course_participants,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCourse: (id) => dispatch(deleteCourse(id)),
    resetState: () => dispatch(resetState())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { 
      collection: 'courses',
      orderBy: ['date', 'asc']
    },
    { collection: 'course_participants' }
  ])
)(CourseList);