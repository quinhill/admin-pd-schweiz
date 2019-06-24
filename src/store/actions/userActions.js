export const updateUser = (details) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    const dets = Object.keys(details).reduce((dets, key) => {
      if (details[key] === undefined) {
        dets[key] = ''
      } else {
        dets[key] = details[key]
      }
      return dets;
    }, {})

    firestore.collection('users').doc(details.uid).set({
      firstName: dets.firstName,
      lastName: dets.lastName,
      email: dets.email,
      address: dets.address,
      zip: dets.zip,
      city: dets.city,
      phone: dets.phone,
      uid: dets.uid
    }).then(() => {
      dispatch({ type: 'UPDATE_USER_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'UPDATE_USER_ERROR', err })
    })
  }
};