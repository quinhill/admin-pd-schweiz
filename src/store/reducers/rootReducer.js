import authReducer from './authReducer';
import courseReducer from './courseReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;