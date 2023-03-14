import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

function Note(props) {
  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  function handleEditClick() {
    props.onEdit(props.id);
  }

  function handleCompleteClick() {
    props.onComplete(props.id);
  }

  return (
    <div className="note">
      {props.complete ? (
        <>
          <h1 style={{ textDecoration: "line-through" }}>{props.title}</h1>
          <p style={{ textDecoration: "line-through" }}>{props.content}</p>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
        </>
      )}
      <button onClick={handleEditClick}>
        <EditIcon />
      </button>
      <button onClick={handleDeleteClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleCompleteClick}>
        <CheckIcon />
      </button>
    </div>
  );
}

export default Note;
