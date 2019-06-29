import React from 'react';

const DeletePrompt = (props) => {

  const prompt = `are you sure you want to delete ${props.user.firstName} from your user list?`

  const deleteUser = (event) => {
    const uid = event.target.id;
    props.deleteUser(uid);
    props.toggleDeletePrompt();
  }

  return (
    <div className='delete-prompt'>
      <p>{prompt}</p>
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