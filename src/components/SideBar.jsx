import React from "react";
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
        <svg
          version="1.0"
          onClick={() => props.deleteNote(note.id)}
          className={` hover:cursor-pointer mx-2 w-[1rem] sm:relative overflow-visible absolute right-1 sm:right-0 bg-none h-[1rem] hover:scale-110 transition-transform duration-200 rounded-[40%] 
            ${
              props.theme === "light"
                ? "bg-slate-300 "
                : "bg-slate-200 hover:cursor-pointer hover:scale-105 transition-transform duration-200 rounded-[40%] "
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
              d="M430 913 c-8 -3 -27 -14 -42 -24 -22 -16 -45 -19 -137 -19 -97 0
-111 -2 -120 -18 -7 -14 -6 -25 5 -40 15 -22 18 -22 364 -22 346 0 349 0 364
22 11 15 12 26 5 40 -9 16 -23 18 -120 18 -99 0 -114 2 -142 22 -24 17 -48 23
-97 25 -36 1 -72 0 -80 -4z"
            />
            <path
              d="M185 678 c2 -18 16 -136 30 -263 31 -276 36 -300 75 -320 42 -22 378
-22 420 0 39 20 44 44 75 320 14 127 28 245 30 263 l6 32 -321 0 -321 0 6 -32z"
            />
          </g>
        </svg>
      </div>
    </div>
  ));

  return (
    <section className="flex flex-col text-center items-center mr-10 pr-4">
      <div className="flex flex-row pb-6 justify-center ">
        <h3 className="text-4xl mr-5">Notes</h3>
        <svg
          version="1.0"
          onClick={props.newNote}
          className={`hover:cursor-pointer hover:scale-105 h-[2.5rem] w-[2.5rem] transition-transform duration-200 rounded-[40%]
            ${props.theme === "light" ? "bg-slate-300 " : "bg-slate-200 "}`}
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
              d="M467 864 c-4 -4 -7 -78 -7 -165 l0 -159 -162 -2 -163 -3 0 -35 0 -35
162 -3 163 -2 2 -163 3 -162 35 0 35 0 3 162 2 163 163 2 162 3 0 35 0 35
-162 3 -163 2 -2 163 -3 162 -30 3 c-17 2 -34 0 -38 -4z"
            />
          </g>
        </svg>
      </div>
      <div className=" py-1 w-[10rem] max-h-[500px] rounded-xl overflow-auto">
        {noteElements}
      </div>
    </section>
  );
}
