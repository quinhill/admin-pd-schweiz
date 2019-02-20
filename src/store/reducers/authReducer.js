const authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('login error')
      return {
        ...state,
        authError: 'login error'
      }
    case 'LOGIN_SUCCESS':
      console.log('sign in success')
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;
    default:
      return state;
  }
}

export default authReducer;