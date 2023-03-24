import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDz-CnKtdpTBqu5Kk-P2wz3MYpls-MZGQU",
  authDomain: "memo-cho.firebaseapp.com",
  projectId: "memo-cho",
  storageBucket: "memo-cho.appspot.com",
  messagingSenderId: "534639778420",
  appId: "1:534639778420:web:76e76cf3f8533c91764f21",
  measurementId: "G-BYWVCX0JKL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref('memo-cho');

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    db.on('value', snapshot => {
      const notes = [];
      snapshot.forEach((childSnapshot) => {
        notes.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setNotes(notes);
    });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleNoteAdd = (event) => {
    event.preventDefault();
    db.push({ title, content });
    setTitle("");
    setContent("");
  };

  const handleNoteDelete = (id) => {
    db.child(id).remove();
  };

  return (
    <div className="App">
      <h1>momo-cho</h1>
      <form onSubmit={handleNoteAdd}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleNoteDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
