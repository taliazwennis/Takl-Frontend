import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
function Note(props) {
  const [editEnabled, setEditEnabled] = useState(false);
  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  function handleEditClick() {
    setEditEnabled(!editEnabled);
    props.onEdit(props.id, props.title, props.content);
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
          <h1 contentEditable={editEnabled}>{props.title}</h1>
          <p contentEditable={editEnabled}>{props.content}</p>
        </>
      )}
      <button onClick={handleEditClick}>
        {editEnabled ? <SaveIcon /> : <EditIcon />}
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
