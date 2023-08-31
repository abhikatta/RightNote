import React, { useState } from "react";
// import { nanoid } from "nanoid";
import { addDoc, deleteDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db, notesCollection } from "./Firebase/firebase";
import "./index.css";
import SideBar from "./components/SideBar";
import NoteEditor from "./components/NoteEditor";
import LightThemeIcon from "./icons/LightThemeIcon";
import DarkThemeIcon from "./icons/DarkThemeIcon";
import SideBarIcon from "./icons/SideBarIcon";
import Login from "./screens/Login";

function App() {
  const [notes, setNotes] = React.useState([]);
  const [sideBar, setSideBar] = useState(
    JSON.parse(localStorage.getItem("sidebar")) || false
  );
  const [currentNoteId, setCurrentNoteId] = React.useState("");

  const [theme, setTheme] = React.useState(
    JSON.parse(localStorage.getItem("theme")) || "light"
  );
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }
  function toggleSideBar() {
    setSideBar((prevSideBar) => !prevSideBar);
  }

  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      // Sync up our local notes array with the snapshot data
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes, currentNoteId]);
  React.useEffect(() => {
    // localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("sidebar", JSON.stringify(sideBar));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme, sideBar]);
  async function createNewNote() {
    const newNote = {
      body: `# Title`,
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }
  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(docRef, { body: text }, { merge: true });
  }
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];
  return <Login />;
  return notes.length > 0 ? (
    <div
      className={`flex flex-col specialfont items-center w-full h-full min-h-screen min-w-screen
        ${
          theme === "light"
            ? "text-slate-600 bg-slate-200"
            : "text-slate-200 bg-slate-600"
        }`}>
      <div className="flex specialfont flex-row mx-10 ">
        <h1 className=" lg:text-6xl md:text-6xl sm:text-5xl text-4xl font-bold my-10">
          RightNote
        </h1>

        {theme === "light" ? (
          <LightThemeIcon onClick={toggleTheme} theme={theme} />
        ) : (
          <DarkThemeIcon onClick={toggleTheme} theme={theme} />
        )}
      </div>
      <div className="flex sm:flex-row flex-col sm:items-baseline items-center sm:mx-10 mx-3">
        <SideBarIcon onClick={toggleSideBar} sideBar={sideBar} theme={theme} />
        <div
          className={`sm:flex flex-row sm:flex-col w-[10rem] max-w-[15rem] sm:mr-10
              ${
                !sideBar
                  ? "scale-0 transition-transform duration-500"
                  : "scale-100 transition-transform duration-500"
              }
              `}>
          {sideBar && (
            <SideBar
              newNote={createNewNote}
              setCurrentNoteId={setCurrentNoteId}
              notes={notes}
              theme={theme}
              deleteNote={deleteNote}
              currentNote={currentNote}
            />
          )}
        </div>
        <div className="">
          {currentNoteId && notes.length > 0 && (
            <NoteEditor
              theme={theme}
              currentNote={currentNote}
              updateNote={updateNote}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`flex flex-col specialfont items-center w-full h-full min-h-screen min-w-screen
      ${
        theme === "light"
          ? "text-slate-600 bg-slate-200"
          : "text-slate-200 bg-slate-600"
      }`}>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold absolute top-[35%] my-10">
          RightNote
        </h1>
        {theme === "light" ? (
          <LightThemeIcon onClick={toggleTheme} theme={theme} />
        ) : (
          <DarkThemeIcon onClick={toggleTheme} theme={theme} />
        )}
        <button
          className={`font-bold text-xl absolute top-[50%] rounded-md px-2 py-1
        ${
          theme === "light"
            ? "hover:bg-slate-600 bg-slate-300 text-slate-900 hover:text-slate-200"
            : "hover:bg-slate-200 bg-slate-700 text-slate-300 hover:text-slate-800"
        }
        `}
          onClick={createNewNote}>
          Create a new Note
        </button>
      </div>
    </div>
  );
}
export default App;
