const initState = {};

const courseReducer = (state = initState, action) => {
  switch(action.type) {
    case 'CREATE_CLASS':
      console.log('created project', action.course)
      return state;
    case 'CREATE_COURSE_ERROR':
      console.log('create project error', action.err)
      return state;
    default:
      return state
  }
}

export default courseReducer;