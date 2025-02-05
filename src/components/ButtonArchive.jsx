import PropTypes from "prop-types";
import React from "react";

function ButtonArchive({ id, onArchive }) {
  return (
    <div>
      <button
        className="archive-floating-icon"
        type="button"
        onClick={() => onArchive(id)}
      >
        <img src="/archive.svg" />
      </button>
    </div>
  );
}

ButtonArchive.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ButtonArchive;
