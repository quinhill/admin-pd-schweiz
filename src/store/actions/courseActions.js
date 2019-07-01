export const createCourse = (course) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const dateTime = `${course.date} ${course.timeStart}`
    const date = new Date(dateTime)

    firestore.collection('courses').add({
      ...course,
      date,
      createdAt: new Date()
    }).then((res) => {
      firestore.collection('course_participants').doc(res.id).set({'participants': []});
    }).then(() => {
      dispatch({ type: 'CREATE_COURSE', course });
    }).catch((err) => {
      dispatch({ type: 'CREATE_COURSE_ERROR', err});
    })
  }
};


export const updateCourse = (details) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    const dateTime = `${details.date} ${details.timeStart}`;

    firestore.collection('courses').doc(details.id).set({
      title: details.title,
      location: details.location,
      timeStart: details.timeStart,
      timeEnd: details.timeEnd,
      date: new Date(dateTime),
      cost: details.cost,
      description: details.description,
    }).then(() => {
      dispatch({ type: 'UPDATE_COURSE_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'UPDATE_COURSE_ERROR', err })
    })
  }
};

export const deleteCourse = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('courses').doc(id).delete().then(() => {
      dispatch({ type: 'DELETE_COURSE_SUCCESS', id })
    }).catch((err) => {
      dispatch({ type: 'DELETE_COURSE_ERROR', err })
    })
    firestore.collection('course_participants').doc(id).delete().then(() => {
      dispatch({ type: 'DELETE_COURSE_SUCCESS', id })
    }).catch((err) => {
      dispatch({ type: 'DELETE_COURSE_ERROR', err })
    })
  }
}

export const addExisting = () => {
  return (dispatch) => {
    dispatch({ type: 'ADD_EXISTING' })
  }
}

export const resetState = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_STATE' })
  }
}