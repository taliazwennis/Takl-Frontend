import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./NoteArea.css";

export default function NoteArea() {
  const [notes, setNotes] = useState([]);
  const user = useParams();

  useEffect(() => {
    axios
      .get(`https://takl-backend.onrender.com/user/${user.id}`)
      .then(function (response) {
        console.log("from NoteArea: ", response);
        setNotes(response.data.notes);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const configuration = {
      method: "put",
      url: `https://takl-backend.onrender.com/user/${user.id}`,
      data: { notes },
    };

    axios(configuration)
      .then((result) => {})
      .catch((error) => {
        error = new Error();
      });
  }, [notes]);

  function addNote(newNote) {
    console.log("Notes: ", newNote);
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function completeNote(id) {
    const newNotes = [...notes];
    newNotes[id].complete === false
      ? (newNotes[id].complete = true)
      : (newNotes[id].complete = false);
    setNotes(newNotes);
  }

  function editNote(id, newTitle, newContent) {
    const newNotes = [...notes];
    const item = newNotes[id];
    let todoObj = { title: newTitle, content: newContent, complete: false };
    newNotes.splice(id, 1, todoObj);
    if (
      newTitle === null ||
      newContent === null ||
      newTitle === "" ||
      newContent === ""
    ) {
      return;
    } else {
      item.title = newTitle;
      item.content = newContent;
    }
    setNotes(newNotes);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <h1 className="note-area">GET THINGS DONE, ONE TASK AT A TIME</h1>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            complete={noteItem.complete}
            onDelete={deleteNote}
            onEdit={editNote}
            onComplete={completeNote}
          />
        );
      })}
    </div>
  );
}