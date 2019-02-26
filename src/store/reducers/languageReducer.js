const languageReducer = (state = 'DE', action) => {
  switch(action.type) {
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        language: action.lang
      }
    default:
      return state;
  }
}

export default languageReducer;