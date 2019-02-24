export const saveAboutMe = (content) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const date = new Date().toString();

    firestore.collection('about_kc').doc(date).set({
      content
    }).then(() => {
      dispatch({ type: 'SAVE_ABOUT_ME_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'SAVE_ABOUT_ME_ERROR', err })
    })
  }
};