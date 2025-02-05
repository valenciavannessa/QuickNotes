import PropTypes from "prop-types";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import {
  archiveNote,
  deleteNote,
  getNote,
  unarchiveNote,
} from "../utils/network-data";
import LoadingAnimation from "../components/LoadingAnimation";

function DetailNotePageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <DetailNotePage id={id} navigate={navigate} />;
}

class DetailNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      initializing: true,
    };

    this.delete = this.delete.bind(this);
    this.archived = this.archived.bind(this);
    this.unarchived = this.unarchived.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const { data } = await getNote(id);
    this.setState({
      note: data,
      initializing: false,
    });
  }

  async delete(id) {
    const updatedNotes = await deleteNote(id);

    this.setState({ notes: updatedNotes });
    this.props.navigate("/");
  }

  async archived(id) {
    const updatedNotes = await archiveNote(id);
    this.setState({ notes: updatedNotes });
    this.props.navigate("/");
  }

  async unarchived(id) {
    const updatedNotes = await unarchiveNote(id);
    this.setState({ notes: updatedNotes });
    this.props.navigate("/");
  }

  render() {
    if (this.state.initializing) {
      return <LoadingAnimation />;
    }

    return (
      <section>
        <NoteDetail
          {...this.state.note}
          onDelete={this.delete}
          onArchive={this.archived}
          onUnarchive={this.unarchived}
        />
      </section>
    );
  }
}

DetailNotePage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailNotePageWrapper;
