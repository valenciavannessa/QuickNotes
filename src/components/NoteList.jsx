import PropTypes from "prop-types";
import React from "react";
import { showFormattedDate } from "../utils";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={showFormattedDate(note.createdAt)}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
