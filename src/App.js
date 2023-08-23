import React from "react";
import "./index.css";
import { nanoid } from "nanoid";
import SideBar from "./components/SideBar";
import NoteEditor from "./components/NoteEditor";
import darkIcon from "./assets/icons8-dark-theme-100.png";
import lightIcon from "./assets/icons8-sun-100.png";
import deleteAllIcon from "./assets/icons8-delete-100.png";
function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );
  const [theme, setTheme] = React.useState("light");
  const [themeIcon, setThemeIcon] = React.useState(darkIcon);
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: `# Title`,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }
  function updateNote(text) {
    setNotes((oldnotes) => {
      const newNotes = [];
      for (let i = 0; i < oldnotes.length; i++) {
        const oldNote = oldnotes[i];
        if (oldNote.id === currentNoteId) {
          newNotes.unshift({ ...oldNote, body: text });
        } else {
          newNotes.push(oldNote);
        }
      }
      return newNotes;
    });
  }

  function deleteNote(event, noteId) {
    /* below line of colde works in this way:
     * whenever a note is deleted, it is set to current note but since it
     * doesnt exist in the array, it throws an error, hence this line of code is used
     */
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    return notes.find((note) => {
      return note.id === currentNoteId;
    });
  }

  return notes.length > 0 ? (
    <div
      className={
        theme === "light"
          ? "flex flex-col items-center  text-slate-600 bg-slate-200 w-full h-full min-h-screen"
          : "flex flex-col items-center  text-slate-200 bg-slate-600 w-full h-full min-h-screen"
      }>
      <h1 className="text-6xl font-bold my-10">ThotThoughts</h1>
      <img
        width={40}
        height={20}
        className={
          theme === "light"
            ? "hover:bg-slate-400 bg-slate-300 absolute top-10 right-[15%] transition-colors p-1 duration-200 rounded-lg"
            : "hover:bg-slate-300 bg-slate-400 absolute top-10 right-[15%] transition-colors p-1 duration-200 rounded-lg"
        }
        src={themeIcon}
        onClick={() =>
          theme === "light"
            ? (setTheme("dark"), setThemeIcon(lightIcon))
            : (setTheme("light"), setThemeIcon(darkIcon))
        }></img>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div className=" mr-[5%]">
            <SideBar
              newNote={createNewNote}
              setCurrentNoteId={setCurrentNoteId}
              notes={notes}
              theme={theme}
              deleteNote={deleteNote}
              currentNote={findCurrentNote}
            />
          </div>
          <div className="">
            {currentNoteId && notes.length > 0 && (
              <NoteEditor
                theme={theme}
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            )}
          </div>
          <div>
            <img
              onClick={() => (
                localStorage.clear(), console.log("deleted all notes")
              )}
              src={deleteAllIcon}
              height={20}
              width={40}
              className={
                theme === "light"
                  ? "hover:bg-slate-400 bg-slate-300 absolute top-10 right-[10%] transition-colors p-1 duration-200 rounded-lg"
                  : "hover:bg-slate-300 bg-slate-400 absolute top-10 right-[10%] transition-colors p-1 duration-200 rounded-lg"
              }
              //
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="justify-center text-white bg-slate-700 h-screen w-screen flex flex-col items-center">
      <h1 className="text-6xl font-bold  items-center top-10 absolute">
        ThotThoughts
      </h1>
      <button
        className="font-bold text-xl border-slate-400 hover:border-slate-600 hover:bg-slate-600 border-2 rounded-md px-2 py-1"
        onClick={createNewNote}>
        Create a new ThotThought
      </button>
    </div>
  );
}
export default App;
