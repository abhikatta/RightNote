import { useState, useEffect } from "react";

import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, notesCollection } from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./index.css";
import SideBar from "./components/SideBar";
import NoteEditor from "./components/NoteEditor";
import LightThemeIcon from "./icons/LightThemeIcon";
import DarkThemeIcon from "./icons/DarkThemeIcon";
import SideBarIcon from "./icons/SideBarIcon";
import Login from "./screens/Login";
import EmbeddedFrame from "./spotify_thing/Top10Today";
import { decryptText, encryptText } from "./utils/cryption";
import SpotifyEmbedIcon from "./icons/SpotifyEmbedIcon";

function App() {
  const [notes, setNotes] = useState([]);

  const [sideBar, setSideBar] = useState(
    JSON.parse(localStorage.getItem("sidebar")) || false
  );

  const [currentNoteId, setCurrentNoteId] = useState("");
  const [userID, setUserID] = useState(auth.currentUser || null);
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "light"
  );
  const [spotifyEmbed, SetSpotifyEmbed] = useState(true);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSideBar = () => {
    setSideBar((prevSideBar) => !prevSideBar);
  };

  // A bit modified Solution from the stackoverflow gods for fixing the
  // local state changes freezing:

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user);
        toggleSideBar();
      } else {
        auth.signOut();
        setUserID(null);
      }
    });
    return unsubscribe;
  }, [userID]);

  useEffect(() => {
    try {
      if (userID) {
        const q = query(
          notesCollection,
          where("id", "==", auth.currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, function (snapshot) {
          // Sync up our local notes array with the snapshot data
          const notesArr = snapshot.docs.map((doc) => {
            const decryptedBody = decryptText(doc.data().body); // Decrypt the body property
            return {
              body: decryptedBody,
              id: doc.id,
            };
          });
          setNotes(notesArr);
        });
        return unsubscribe;
      }
    } catch (error) {
      console.log(error);
    }
  }, [userID]);

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes, currentNoteId]);

  useEffect(() => {
    // localStorage.setItem(`notes`, JSON.stringify(notes));
    localStorage.setItem("sidebar", JSON.stringify(sideBar));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme, sideBar]);

  // Function to create a new note for the authenticated user
  const createNewNote = async () => {
    const newNote = {
      body: encryptText("Write your note here..".toString()),
      id: userID.uid,
    };
    try {
      await addDoc(notesCollection, newNote);
      setCurrentNoteId(newNote.id);
    } catch (error) {
      console.log(error);
    }
  };
  function handleSpotifyEmbed() {
    SetSpotifyEmbed((prevToggle) => !prevToggle);
  }
  async function updateNote(text) {
    try {
      const encryptedText = encryptText(text); // Encrypt the updated text
      const docRef = doc(notesCollection, currentNoteId);
      await updateDoc(docRef, {
        body: encryptedText,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(noteId) {
    try {
      const docRef = doc(notesCollection, noteId);
      await deleteDoc(docRef);
      console.log("Journal deleted successfully.");
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  }

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];
  return !userID ? (
    <Login theme={theme} toggleTheme={toggleTheme} setUserID={setUserID} />
  ) : notes.length > 0 ? (
    <div
      className={`flex flex-col specialfont items-center w-full h-full min-h-screen min-w-screen
        ${
          theme === "light"
            ? "text-slate-600 bg-slate-200"
            : "text-slate-200 bg-slate-600"
        }`}>
      <div className="flex specialfont flex-row mx-10 ">
        <h1 className="lg:text-6xl md:text-6xl sm:text-5xl text-6xl font-bold my-10">
          RightNote
        </h1>
      </div>

      {userID && (
        <div
          className={`w-[90%] rounded-xl h-[3rem]  flex flex-row justify-evenly items-center
          ${theme === "light" ? "bg-slate-300" : "bg-slate-400"}
          `}>
          <div title={`Toggle side bar ${sideBar ? "off" : "on"}`}>
            <SideBarIcon
              onClick={toggleSideBar}
              sideBar={sideBar}
              theme={theme}
            />
          </div>
          <div title={`Turn on ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? (
              <LightThemeIcon onClick={toggleTheme} theme={theme} />
            ) : (
              <DarkThemeIcon onClick={toggleTheme} theme={theme} />
            )}
          </div>
          <div title={`Toggle spotify player ${spotifyEmbed ? "off" : "on"}`}>
            <SpotifyEmbedIcon
              toggledOff={spotifyEmbed}
              onClick={handleSpotifyEmbed}
              theme={theme}
            />
          </div>

          <div>
            <p
              title="Your username"
              className={`text-center rounded-lg px-3 py-2 hover:cursor-pointer              
            ${theme === "dark" ? "text-slate-900 " : "text-slate-700 "}
            `}>
              {userID && userID.displayName
                ? userID.displayName
                : userID.email.split("@")[0]}
            </p>
          </div>
          <div>
            <button
              title="Logout of the current account"
              className={`text-center rounded-lg px-3 py-2 hover:cursor-pointer              
              hover:scale-110 duration-200 transition-transform
                  text-slate-200 bg-slate-800
            `}
              onClick={() => auth.signOut()}>
              Logout
            </button>
          </div>
        </div>
      )}

      {spotifyEmbed && <EmbeddedFrame />}

      <div className="flex md:flex-row flex-col md:items-baseline items-center  ">
        <div
          className={`sm:flex flex-row sm:flex-col max-w-[15rem] mr-10
              ${
                !sideBar
                  ? "w-0 transition-all duration-500"
                  : "w-28 transition-all duration-500"
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
        {currentNoteId && notes.length > 0 && (
          <div>
            <NoteEditor
              theme={theme}
              currentNote={currentNote}
              updateNote={updateNote}
            />
          </div>
        )}
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
