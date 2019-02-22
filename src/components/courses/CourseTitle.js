import React from 'react';

const CourseTitle = ({course, displayCourse}) => {

  const handleClick = (event) => {
    displayCourse(event.target.id)
  }

  return (
    <div className='coursetitle-container'>
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