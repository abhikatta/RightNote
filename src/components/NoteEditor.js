import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "../index.css";
function NoteEditor({ currentNote, updateNote, theme }) {
  return (
    // min-h-[30rem] absolute specialfont
    // w-full xs:w-[19rem] md:min-w-[35rem] md:max-w-full
    // sm:min-w-[25rem] lg:w-full lg:min-w-[40rem] lg:max-w-full
    <div data-color-mode={theme}>
      <MDEditor
        value={currentNote.body}
        onChange={updateNote}
        className={`
        mx-2 my-2
        sm:min-h-[40rem] md:min-h-[40rem] lg:min-h-[40rem] min-h-[40rem]
        sm:min-w-[35rem] md:min-w-[45rem] lg:min-w-[60rem] min-w-[10rem]

        `}
      />
    </div>
  );
}

export default NoteEditor;
