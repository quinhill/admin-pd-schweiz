import React from 'react';
import CourseList from './CourseList';
import CreateCourse from './CreateCourse';

const Courses = () => {
  return (
    <div className='coursepage-container'>    
      <CourseList />
      <CreateCourse />
    </div>
  )
}

export default Courses;