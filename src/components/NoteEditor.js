import React from "react";
import MDEditor from "@uiw/react-md-editor";

function NoteEditor({ currentNote, updateNote, theme }) {
  return (
    <div className="w-[60rem] flex flex-col justify-center text-white">
      <div data-color-mode={theme}>
        <MDEditor value={currentNote.body} onChange={updateNote} />
      </div>
    </div>
  );
}

export default NoteEditor;
