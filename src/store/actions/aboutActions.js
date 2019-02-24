export const saveAboutKC = (content) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('about_kc').add({
      content,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'SAVE_ABOUT_KC_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SAVE_ABOUT_KC_ERROR', err })
    })
  }
};

export const saveAboutPd = (content) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('about_pd').add({
      content,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'SAVE_ABOUT_PD_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SAVE_ABOUT_PD_ERROR', err })
    })
  }
};