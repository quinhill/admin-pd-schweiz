import firebase from '../../config/fbConfig';

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

export const deleteUser = (uid) => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const functions = firebase.functions();

    firestore.collection('users').doc(uid).delete()
    .then(() => {
      dispatch({ type: 'DELETE_USER_SUCCESS', uid })
    }).catch((err) => {
      dispatch({ type: 'DELETE_USER_ERROR', err})
    })

    const deleteUser = functions.httpsCallable('deleteUser');

    deleteUser({ uid }).then(result => {
      console.log(result);
    })
  }
}

export const makeAdmin = async (data) => {
  const functions = firebase.functions();

  const addAdminRole = functions.httpsCallable('addAdminRole');

  addAdminRole({email: data}).then(result => {
    console.log(result)
  })
}
