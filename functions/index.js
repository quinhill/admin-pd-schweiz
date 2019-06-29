const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin)
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin`
    }
  }).catch(err => {
    return err;
  });
});

exports.deleteUser = functions.https.onCall((data, context) => {
  return admin.auth().deleteUser(data.uid).then(() => {
    console.log('Successfully deleted user');
  }).catch((error) => {
    console.log('Error deleting user:', error);
  })
})