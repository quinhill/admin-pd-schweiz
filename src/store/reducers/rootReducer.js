import authReducer from './authReducer';
import courseReducer from './courseReducer';
import languageReducer from './languageReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  language: languageReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;