export const saveAboutKCEn = (content) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('about_kc_english').add({
      content,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'SAVE_ABOUT_KC_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SAVE_ABOUT_KC_ERROR', err })
    })
  }
};

export const saveAboutKCDe = (content) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('about_kc_german').add({
      content,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'SAVE_ABOUT_KC_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SAVE_ABOUT_KC_ERROR', err })
    })
  }
};

export const saveAboutPDEn = (content) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('about_pd_english').add({
      content,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'SAVE_ABOUT_PD_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SAVE_ABOUT_PD_ERROR', err })
    })
  }
};

export const saveAboutPDDe = (content) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('about_pd_german').add({
      content,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'SAVE_ABOUT_PD_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SAVE_ABOUT_PD_ERROR', err })
    })
  }
};