import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import "./NoteArea.css";

function Note(props) {
  const [editEnabled, setEditEnabled] = useState(false);
  const [titleInfo, setTitleInfo] = useState(props.title);
  const [contentInfo, setContentInfo] = useState(props.content);
  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  function handleEditClick() {
    setEditEnabled(!editEnabled);
    props.onEdit(props.id, titleInfo, contentInfo);
  }

  function handleCompleteClick() {
    props.onComplete(props.id);
  }

  function displayContent() {
    if (props.complete === true) {
      return (
        <>
          <h1 style={{ textDecoration: "line-through" }}>{props.title}</h1>
          <p style={{ textDecoration: "line-through" }}>{props.content}</p>
        </>
      );
    } else if (editEnabled === true) {
      return (
        <form>
          <input
            className="edit-notes"
            type="text"
            value={titleInfo}
            onChange={(event) => {
              setTitleInfo(event.target.value);
            }}
          />
          <textarea
            className="edit-notes"
            rows="4" cols="50"
            value={contentInfo}
            onChange={(event) => {
              setContentInfo(event.target.value);
            }}
          />
        </form>
      );
    } else {
      return (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
        </>
      );
    }
  }

  return (
    <div className="note">
      {displayContent()}
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
