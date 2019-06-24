const usersReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_USER_SUCCESS':
      return {
        updateSuccess: "The user's details have been successfully updated",
        updateError: null
      }
    case 'UPDATE_USER_ERROR':
      return {
        updateSuccess: null,
        updateError: action.err
      }
    default:
      return state;
  }
}

export default usersReducer;