import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonSubmit from "../components/ButtonSubmit";
import { addNote } from "../utils/network-data";
import { LocaleConsumer } from "../contexts/LocaleContext";

function AddNotePageWrapper() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    await addNote(note);
  }

  return <AddNotePage navigate={navigate} addNote={onAddNoteHandler} />;
}

class AddNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.props.addNote) {
      this.props.addNote({
        id: `notes-${+new Date()}`,
        title: this.state.title,
        body: this.state.body,
        createdAt: new Date().toISOString(),
        archived: false,
      });
    }

    this.setState({ title: "", body: "" });

    this.props.navigate("/");
  }

  onTitleChangeHandler(event) {
    this.setState({ title: event.target.value });
  }

  onInputHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <div className="content">
              <h2 className="note-title">
                {locale === "EN" ? "Create Note" : "Buat Catatan"}
              </h2>
              <form onSubmit={this.onSubmit}>
                <input
                  id="title"
                  type="text"
                  placeholder={
                    locale === "EN" ? "Add Title Here" : "Masukan Judul"
                  }
                  value={this.state.title}
                  className="input-title"
                  onChange={this.onTitleChangeHandler}
                />
                <div
                  id="body"
                  type="text"
                  data-placeholder={
                    locale === "EN" ? "Fill Notes Here" : "Masukan Isi Catatan"
                  }
                  value={this.state.body}
                  className="input-body"
                  contentEditable
                  onInput={this.onInputHandler}
                />
                <ButtonSubmit />
              </form>
            </div>
          );
        }}
      </LocaleConsumer>
    );
  }
}

AddNotePage.propTypes = {
  navigate: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
};

export default AddNotePageWrapper;
