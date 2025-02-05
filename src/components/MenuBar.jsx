import React from "react";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function MenuBar({ logout }) {
  return (
    <aside>
      <div className="menu-bar">
        <ul>
          <li>
            <Link to="/">
              <img src="/home.svg" alt="Home" />
            </Link>
          </li>
          <li>
            <Link to={"/add-note"}>
              <img src="/add.svg" alt="Add Note" />
            </Link>
          </li>
          <li>
            <Link to={"/archived-notes"}>
              <img src="/archive.svg" alt="Archive Note" />
            </Link>
          </li>
          <li>
            <ThemeConsumer>
              {({ theme, toggleTheme }) => {
                return (
                  <button
                    id="themeToggle"
                    onClick={toggleTheme}
                    className="button-mode"
                  >
                    <img src={theme === "light" ? "/dark.svg" : "/light.svg"} />
                  </button>
                );
              }}
            </ThemeConsumer>
          </li>
          <li>
            <LocaleConsumer>
              {({ locale, toggleLocale }) => {
                return (
                  <button
                    className="btn-switch-language"
                    onClick={toggleLocale}
                  >
                    {locale === "EN" ? "ID" : "EN"}
                  </button>
                );
              }}
            </LocaleConsumer>
          </li>
          <li>
            <button id="themeToggle" onClick={logout} className="button-mode">
              <img src="/logout.svg" />
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

MenuBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default MenuBar;
