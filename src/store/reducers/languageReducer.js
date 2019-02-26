const initState = {
  language: 'DE'
}

const languageReducer = (state = initState, action) => {
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