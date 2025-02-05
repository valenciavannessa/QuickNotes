import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import parser from "html-react-parser";

function NoteItem({ id, title, body, createdAt }) {
  return (
    <div className="note-item">
      <div className="note-item-content">
        <h2 className="note-item-title">
          <Link className="white-link" to={`/notes/${id}`}>
            {title}
          </Link>
        </h2>

        <p className="note-item-date">{createdAt}</p>
        <p className="note-item-body">{parser(body)}</p>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
