const courseReducer = (state = {}, action) => {
  switch(action.type) {
    case 'CREATE_CLASS':
      return state;
    case 'CREATE_COURSE_ERROR':
      return state;
    case 'UPDATE_COURSE_SUCCESS':
      return {
        ...state,
        updateSuccess: 'The course details have been updated successfully',
        updateError: null
      }
    case 'UPDATE_COURSE_ERROR':
      return {
        ...state,
        updateSuccess: null,
        updateError: action.err.message
      }
    default:
      return state
  }
}

export default courseReducer;