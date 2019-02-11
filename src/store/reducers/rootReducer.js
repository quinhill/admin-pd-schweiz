import authReducer from './authReducer';
import courseReducer from './courseReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer
});

export default rootReducer;