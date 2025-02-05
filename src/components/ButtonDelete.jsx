import PropTypes from "prop-types";
import React from "react";

function ButtonDelete({ id, onDelete }) {
  return (
    <div>
      <button
        className="delete-floating-icon"
        type="button"
        onClick={() => onDelete(id)}
      >
        <img src="/delete.svg" />
      </button>
    </div>
  );
}

ButtonDelete.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ButtonDelete;
