import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor () {
    this.bindActions(NoteActions);
    this.notes = [];
  }

  create (note) {
    note.id = uuid.v4();
    this.setState({notes: this.notes.concat(note)});
  }

  update (updatedNote) {
    const notes = this.notes.map(note => note.id === updatedNote.id ? Object.assign({}, note, updatedNote) : note);
    this.setState({notes});
  }

  delete (id) {
    this.setState({ notes: this.notes.filter(note => note.id !== id) });
  }
}

export default alt.createStore(NoteStore, 'NoteStore');
