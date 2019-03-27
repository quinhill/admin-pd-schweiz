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
    case 'DELETE_COURSE_SUCCESS':
      return {
        ...state,
        updateSuccess: `The course with the ID: ${action.id} has been successfully deleted`,
        updateError: null,
      }
      case 'DELETE_COURSE_ERROR':
      return {
        ...state,
        updateSuccess: null,
        updateError: action.err.message
      }
      case 'ADD_EXISTING':
        return {
          ...state,
          updateSuccess: null,
          updateError: 'It appears you have already created a course on that day. Please edit that course or change the date of the new course you are trying to create.'
        }
      case 'RESET_STATE':
        return {};
    default:
      return state
  }
}

export default courseReducer;