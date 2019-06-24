import authReducer from './authReducer';
import courseReducer from './courseReducer';
import usersReducer from './usersReducer'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  users: usersReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;