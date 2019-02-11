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