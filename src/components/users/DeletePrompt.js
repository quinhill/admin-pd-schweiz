import React from 'react';

const DeletePrompt = (props) => {
  console.log(props)

  const deleteUser = (event) => {
    const uid = event.target.id;
    props.deleteUser(uid);
    props.toggleDeletePrompt();
  }

  return (
    <div className='delete-prompt'>
      <p>Are you sure you want to delete?</p>
      <button
        id={props.user.uid}
        onClick={deleteUser}
      >
        Yes, confirm
      </button>
      <button
        onClick={props.toggleDeletePrompt}
      >
        No, don't delete
      </button>
    </div>
  )
}

export default DeletePrompt;