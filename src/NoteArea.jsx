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
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get(`https://takl-backend.onrender.com/user/${user.id}`)
      .then(function (response) {
        setNotes(response.data.notes || []);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateDatabase(notes) {
    console.log("updating notes: ", notes);
    const configuration = {
      method: "put",
      url: `https://takl-backend.onrender.com/user/${user.id}`,
      data: { notes },
    };

    axios(configuration)
      .then((result) => {
        console.log("Result from MongoDB: ", result.data.notes);
      })
      .catch((error) => {
        error = new Error();
      });

    setNotes(notes);
  }

  function addNote(newNote) {
    updateDatabase([...notes, newNote]);
  }

  function completeNote(index) {
    const newNotes = [...notes];
    newNotes[index].complete === false
      ? (newNotes[index].complete = true)
      : (newNotes[index].complete = false);
    updateDatabase(newNotes);
  }

  function editNote(index, newTitle, newContent) {
    const newNotes = [...notes];
    const item = newNotes[index];
    let todoObj = { title: newTitle, content: newContent, complete: false };
    newNotes.splice(index, 1, todoObj);
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
    updateDatabase(newNotes);
  }

  function deleteNote(id) {
    updateDatabase(notes.filter((_, index) => {
      return index !== id;
    }));
  }

  return (
    <div className="area">
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
