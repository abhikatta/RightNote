import React from "react";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={
          note.id === props.currentNote().id
            ? " flex flex-col bg-slate-300 rounded-md text-[black] font-semibold hover:cursor-pointer "
            : "flex flex-col  hover:cursor-pointer"
        }
        onClick={() => props.setCurrentNoteId(note.id)}>
        <h4 className=" h-[2.25rem] max-w-[7rem] px-2 py-1.5 text-ellipsis overflow-hidden">
          {(note.body && note.body.split("\n")[0].split("#")) ||
            `Note${props.notes.length - index}`}
        </h4>
        <button onClick={(event) => props.deleteNote(event, note.id)}>D</button>
      </div>
    </div>
  ));

  return (
    <section className="flex flex-col justify-center text-center">
      <div className="flex flex-row pb-6 justify-center">
        <h3 className="text-4xl">Notes</h3>
        <img
          onClick={props.newNote}
          width={40}
          height={20}
          className={
            props.theme === "light"
              ? "bg-slate-300 hover:cursor-pointer hover:scale-105 transition-transform duration-200 rounded-[40%] ml-5"
              : "bg-slate-200 hover:cursor-pointer hover:scale-105 transition-transform duration-200 rounded-[40%] ml-5"
          }
          src={require("../assets/icons8-add-100.png")}></img>
      </div>
      <div className=" px-2 py-1">{noteElements}</div>
    </section>
  );
}
