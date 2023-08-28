import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "../index.css";
function NoteEditor({ currentNote, updateNote, theme }) {
  return (
    <div data-color-mode={theme}>
      <MDEditor
        value={currentNote.body}
        className="min-h-[30rem] absolute specialfont w-full xs:w-[20rem] md:min-w-[35rem] md:max-w-full sm:min-w-[25rem] lg:w-full lg:min-w-[50rem] lg:max-w-full"
        onChange={updateNote}
      />
    </div>
  );
}

export default NoteEditor;
