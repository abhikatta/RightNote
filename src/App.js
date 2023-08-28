import React, { useState } from "react";
import { nanoid } from "nanoid";
import { addDoc, deleteDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db, notesCollection } from "./Firebase/firebase";
import "./index.css";
import SideBar from "./components/SideBar";
import NoteEditor from "./components/NoteEditor";
function App() {
  const [notes, setNotes] = React.useState([]);
  const [toggleSideBar, setToggleSideBar] = useState(
    JSON.parse(localStorage.getItem("sidebar")) || false
  );
  const [currentNoteId, setCurrentNoteId] = React.useState("");

  const [theme, setTheme] = React.useState(
    JSON.parse(localStorage.getItem("theme")) || "light"
  );
  const lightThemeIcon = (
    <svg
      version="1.0"
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
      className={`h-[2.5rem] w-[2.5rem] transition-colors p-1 absolute md:top-[3.5rem] top-[2.5rem] md:right-[5rem] right-[2rem] duration-200 rounded-[40%]
      ${
        theme === "light"
          ? "hover:bg-slate-400 bg-slate-300"
          : "hover:bg-slate-300 bg-slate-400"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      width="100.000000pt"
      height="100.000000pt"
      viewBox="0 0 100.000000 100.000000"
      preserveAspectRatio="xMidYMid meet">
      <g
        transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none">
        <path d="M460 935 l0 -65 40 0 40 0 0 65 0 65 -40 0 -40 0 0 -65z" />
        <path d="M147 852 l-27 -28 43 -42 43 -42 27 28 27 28 -43 42 -43 42 -27 -28z" />
        <path d="M782 837 l-42 -43 28 -27 28 -27 42 43 42 43 -28 27 -28 27 -42 -43z" />
        <path
          d="M407 776 c-94 -35 -164 -110 -188 -201 -34 -125 27 -266 143 -331 47
          -26 62 -29 138 -29 96 0 143 18 205 80 62 62 80 109 80 205 0 76 -3 91 -29
          138 -31 55 -74 95 -136 127 -46 24 -163 30 -213 11z m157 -78 c87 -26 157
          -136 143 -224 -20 -123 -140 -206 -254 -176 -160 43 -214 232 -98 347 59 60
          127 77 209 53z"
        />
        <path d="M0 500 l0 -40 65 0 65 0 0 40 0 40 -65 0 -65 0 0 -40z" />
        <path d="M870 500 l0 -40 65 0 65 0 0 40 0 40 -65 0 -65 0 0 -40z" />
        <path d="M162 217 l-42 -43 28 -27 28 -27 42 43 42 43 -28 27 -28 27 -42 -43z" />
        <path d="M767 232 l-27 -28 43 -42 43 -42 27 28 27 28 -43 42 -43 42 -27 -28z" />
        <path d="M460 60 l0 -60 40 0 40 0 0 60 0 60 -40 0 -40 0 0 -60z" />
      </g>
    </svg>
  );
  const darkThemeIcon = (
    <svg
      version="1.0"
      className={`h-[2.5rem] w-[2.5rem] transition-colors p-1 absolute md:top-[3.5rem] top-[2.5rem] md:right-[5rem] right-[2rem] duration-200 rounded-[40%]
            ${
              theme === "light"
                ? "hover:bg-slate-400 bg-slate-300"
                : "hover:bg-slate-300 bg-slate-400"
            }`}
      xmlns="http://www.w3.org/2000/svg"
      width="100.000000pt"
      height="100.000000pt"
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
      viewBox="0 0 100.000000 100.000000"
      preserveAspectRatio="xMidYMid meet">
      <g
        transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none">
        <path
          d="M373 850 c-66 -33 -140 -105 -171 -166 -89 -176 -19 -388 160 -485
          60 -32 68 -34 163 -34 93 0 105 2 167 33 70 34 124 87 159 154 34 67 20 98
          -33 72 -130 -66 -293 -18 -362 106 -27 48 -31 65 -31 131 0 66 4 84 32 136 23
          45 29 63 20 72 -17 17 -39 13 -104 -19z"
        />
      </g>
    </svg>
  );
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
  }, [notes]);
  React.useEffect(() => {
    // localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("sidebar", JSON.stringify(toggleSideBar));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme, toggleSideBar]);
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
        {theme === "light" ? lightThemeIcon : darkThemeIcon}
      </div>
      <div className="flex sm:flex-row flex-col sm:items-baseline items-center sm:mx-10 mx-3">
        <svg
          onClick={() => setToggleSideBar((prevSetSideBar) => !prevSetSideBar)}
          version="1.0"
          className={`h-[2.5rem] w-[2.5rem] transition-colors p-1 absolute md:top-[3.5rem] top-[2.5rem] md:left-[5rem] left-[2rem] duration-200 rounded-[40%]
          ${
            toggleSideBar
              ? "md:rotate-0 rotate-90 transition-transform duration-300"
              : "md:rotate-180 -rotate-90 transition-transform duration-300"
          }  
          ${
            theme === "light"
              ? "hover:bg-slate-400 bg-slate-300"
              : "hover:bg-slate-300 bg-slate-400"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="100.000000pt"
          height="100.000000pt"
          viewBox="0 0 100.000000 100.000000"
          preserveAspectRatio="xMidYMid meet">
          <g
            transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none">
            <path
              d="M347 692 c-97 -97 -177 -184 -177 -192 0 -8 80 -95 178 -193 179
-178 200 -193 217 -149 4 11 -40 62 -157 179 l-163 163 163 163 c89 89 162
165 162 169 0 9 -29 38 -38 38 -4 0 -87 -80 -185 -178z"
            />
            <path
              d="M578 693 c-98 -98 -178 -184 -178 -193 0 -17 350 -370 366 -370 15 0
34 22 34 39 0 8 -71 86 -157 173 l-157 158 157 158 c86 87 157 165 157 173 0
17 -19 39 -34 39 -5 0 -90 -80 -188 -177z"
            />
          </g>
        </svg>
        <div
          className={`sm:flex flex-row sm:flex-col w-[10rem] max-w-[15rem] sm:mr-10
              ${
                !toggleSideBar
                  ? "scale-0 transition-transform duration-500"
                  : "scale-100 transition-transform duration-500"
              }
              `}>
          {toggleSideBar && (
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
        {theme === "light" ? lightThemeIcon : darkThemeIcon}
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
