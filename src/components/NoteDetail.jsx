import PropTypes from "prop-types";
import React from "react";
import { showFormattedDate } from "../utils";
import ButtonArchive from "./ButtonArchive";
import ButtonDelete from "./ButtonDelete";
import ButtonUnarchive from "./ButtonUnarchive";
import parser from "html-react-parser";

function NoteDetail({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete = { onDelete },
  onArchive = { onArchive },
  onUnarchive = { onUnarchive },
}) {
  return (
    <div className="note-detail">
      <h1 className="note-detail-title">{title}</h1>
      <p className="note-detail-date">{showFormattedDate(createdAt)}</p>
      <p className="note-detail-body">{parser(body)}</p>

      {archived ? (
        <ButtonUnarchive id={id} onUnarchive={onUnarchive} />
      ) : (
        <ButtonArchive id={id} onArchive={onArchive} />
      )}
      <ButtonDelete id={id} onDelete={onDelete} />
    </div>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default NoteDetail;
