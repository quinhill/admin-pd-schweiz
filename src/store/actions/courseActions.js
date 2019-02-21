export const createCourse = (course) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('courses').add({
      ...course,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_CLASS', course });
    }).catch((err) => {
      dispatch({ type: 'CREATE_COURSE_ERROR', err});
    })
  }
};


export const updateCourse = (details) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('courses').doc(details.id).set({
      title: details.title,
      description: details.description
    }).then(() => {
      dispatch({ type: 'UPDATE_COURSE_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'UPDATE_COURSE_ERROR', err})
    })
  }
};