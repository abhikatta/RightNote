import React from "react";
import deleteNoteIcon from "../assets/icons8-delete-100 (1).png";
import addNewNoteIcon from "../assets/icons8-add-100.png";
export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`flex flex-row sm:justify-between justify-center items-center hover:cursor-pointer
          ${
            note.id === props.currentNote.id
              ? "bg-slate-300 rounded-md text-[black] font-semibold"
              : ""
          }`}
        onClick={() => props.setCurrentNoteId(note.id)}>
        <h4 className=" h-[2.25rem] max-w-[9rem] px-2 py-1.5 text-ellipsis overflow-hidden">
          {(note.body && note.body.split("\n")[0].split("#")) ||
            `Note ${props.notes.length - index}`}
        </h4>

        <img
          onClick={(event) => props.deleteNote(event, note.id)}
          height={1}
          width={2}
          className={` hover:cursor-pointer mx-2 w-[1rem] sm:relative absolute right-2 sm:right-0 bg-none h-[1rem] hover:scale-110 transition-transform duration-200 rounded-[40%] 
            ${
              props.theme === "light"
                ? "bg-slate-300 "
                : "bg-slate-200 hover:cursor-pointer hover:scale-105 transition-transform duration-200 rounded-[40%] "
            }`}
          alt="Delete this note icon"
          src={deleteNoteIcon}
        />
      </div>
    </div>
  ));

  return (
    <section className="flex flex-col text-center ">
      <div className="flex flex-row pb-6 px-5 justify-center ">
        <h3 className="text-4xl mr-5">Notes</h3>

        <img
          onClick={props.newNote}
          width={40}
          height={20}
          alt="Add new note"
          className={`hover:cursor-pointer hover:scale-105 transition-transform duration-200 rounded-[40%]
            ${props.theme === "light" ? "bg-slate-300 " : "bg-slate-200 "}`}
          src={addNewNoteIcon}
        />
      </div>
      <div className=" px-2 py-1">{noteElements}</div>
    </section>
  );
}
