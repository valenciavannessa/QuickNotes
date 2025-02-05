import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

function NavigationBar({ name }) {
  return (
    <div className="navbar-container">
      <Link className="white-link" to="/">
        <h1>QUICKNOTES</h1>
      </Link>

      {name ? (
        <div className="profile-name">
          <img src="/profile.svg" />
          <p>{name}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

NavigationBar.propTypes = {
  name: PropTypes.string,
};

export default NavigationBar;
