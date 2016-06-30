import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor () {
    this.bindActions(NoteActions);
    this.notes = [];

    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this)
    });
  }

  create (note) {
    note.id = uuid.v4();
    this.setState({notes: this.notes.concat(note)});
    return note;
  }

  update (updatedNote) {
    const notes = this.notes.map(note => note.id === updatedNote.id ? Object.assign({}, note, updatedNote) : note);
    this.setState({notes});
  }

  delete (id) {
    this.setState({ notes: this.notes.filter(note => note.id !== id) });
  }

  getNotesByIds (ids) {
    return (ids || [])
      .map(id => this.notes.filter(note => note.id === id))
      .filter(a => a.length).map(a => a[0]);
  }
}

export default alt.createStore(NoteStore, 'NoteStore');
