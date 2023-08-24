import React from "react";
import MDEditor from "@uiw/react-md-editor";

function NoteEditor({ currentNote, updateNote, theme }) {
  return (
    <div data-color-mode={theme}>
      <MDEditor
        value={currentNote.body}
        className="min-h-[30rem] w-[25rem] xs:w-[20rem] md:min-w-[35rem] md:max-w-[40rem] sm:min-w-[25rem] lg:w-[80rem] lg:min-w-[50rem]"
        onChange={updateNote}
      />
    </div>
  );
}

export default NoteEditor;
