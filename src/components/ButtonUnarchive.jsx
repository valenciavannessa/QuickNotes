import PropTypes from "prop-types";
import React from "react";

function ButtonUnarchive({ id, onUnarchive }) {
  return (
    <div>
      <button
        className="archive-floating-icon"
        type="button"
        onClick={() => onUnarchive(id)}
      >
        <img src="/unarchive.svg" />
      </button>
    </div>
  );
}

ButtonUnarchive.propTypes = {
  id: PropTypes.string.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default ButtonUnarchive;
