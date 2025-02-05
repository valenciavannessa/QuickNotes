import PropTypes from "prop-types";
import React from "react";
import { LocaleConsumer } from "../contexts/LocaleContext";

function SearchBar({ keyword, onChange }) {
  const onSearchHandler = (event) => {
    onChange(event.target.value);
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="search-bar">
            <form>
              <input
                id="searchNoteTitle"
                type="text"
                placeholder={
                  locale === "EN"
                    ? "Search by Title (Ex : Babel)"
                    : "Cari Berdasarkan Judul (Contoh : Babel)"
                }
                value={keyword}
                onChange={onSearchHandler}
              />
            </form>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
