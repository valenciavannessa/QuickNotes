import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";

import PropTypes from "prop-types";
import { getArchivedNotes } from "../utils/network-data";
import { LocaleConsumer } from "../contexts/LocaleContext";
import LoadingAnimation from "../components/LoadingAnimation";

function ArchivedPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  function changeSearchQuery(keyword) {
    setSearchParams({ search: keyword });
  }

  return (
    <ArchivedPage
      searchQuery={searchQuery}
      changeSearchQuery={changeSearchQuery}
    />
  );
}

class ArchivedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotes: [],
      notes: [],
      keyword: this.props.searchQuery || "",
      initializing: true,
    };
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();

    this.setState(() => {
      return {
        notes: data,
        allNotes: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.filterNotes(this.props.searchQuery);
    }
  }

  filterNotes(keyword) {
    const filteredNotes = this.state.allNotes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );

    this.setState({
      notes: filteredNotes,
      keyword: keyword,
    });
  }

  onKeywordChangeHandler = (searchValue) => {
    this.filterNotes(searchValue);
    this.props.changeSearchQuery(searchValue);
  };

  render() {
    if (this.state.initializing) {
      return <LoadingAnimation />;
    }

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div className="notes-app">
              <div className="content">
                <h2 className="note-title">
                  {locale === "EN" ? "Archived Notes" : "Catatan Terarsip"}
                </h2>
                <SearchBar
                  keyword={this.state.keyword}
                  onChange={this.onKeywordChangeHandler}
                />
                {this.state.notes.length === 0 ? (
                  <h4 className="notes-list-empty-message">
                    {locale === "EN" ? "Note Empty" : "Tidak Ada Catatan"}
                  </h4>
                ) : (
                  <NoteList notes={this.state.notes} />
                )}
              </div>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ArchivedPage.prototypes = {
  searchQuery: PropTypes.string.isRequired,
  changeSearchQuery: PropTypes.func.isRequired,
};

export default ArchivedPageWrapper;
