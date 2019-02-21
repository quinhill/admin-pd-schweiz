import React from 'react';
import { connect } from 'react-redux';

const CourseTitle = ({course, displayCourse}) => {

  const handleClick = (event) => {
    displayCourse(event.target.id)
  }

  return (
    <div>
      <button 
        onClick={handleClick}
        id={course.id}
      >
        {course.title}
      </button>
    </div>
  )
}

export default CourseTitle;