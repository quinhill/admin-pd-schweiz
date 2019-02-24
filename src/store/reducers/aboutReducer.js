const aboutReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SAVE_ABOUT_KC_SUCCESS':
      return {
        ...state,
        aboutError: null,
        aboutSuccess: 'About KC successfully updated'
      };
    case 'SAVE_ABOUT_KC ERROR':
      return {
        ...state,
        aboutError: action.err.message,
        aboutSuccess: null
      };
    case 'SAVE_ABOUT_PD_SUCCESS':
      return {
        ...state,
        aboutError: null,
        aboutSuccess: 'About PD was successfully updated'
      }
    case 'SAVE_ABOUT_PD_ERROR':
      return {
        ...state,
        aboutError: action.err.message,
        aboutSuccess: null
      };
    default:
      return state
  }
}

export default aboutReducer;