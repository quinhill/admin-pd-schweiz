export const createCourse = (course) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();

    firestore.collection('courses').add({
      ...course,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_COURSE', course });
    }).catch((err) => {
      dispatch({ type: 'CREATE_COURSE_ERROR', err});
    })
  }
};


export const updateCourse = (details) => {
  return (dispatch, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('courses').doc(details.id).set({
      title: details.title,
      location: details.location,
      time: details.time,
      date: details.date,
      cost: details.cost,
      description: details.description,
      participants: details.participants
    }).then(() => {
      dispatch({ type: 'UPDATE_COURSE_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'UPDATE_COURSE_ERROR', err })
    })
  }
};

export const deleteCourse = (id) => {
  console.log(id)
  return (dispatch, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('courses').doc(id).delete().then(() => {
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