import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
  hover (targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.lane.notes.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Lane extends React.Component {
  render () {
    const {connectDropTarget, lane, ...props} = this.props;

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header" onClick={this.activateLaneEdit}>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <Editable className="lane-name" editing={lane.editing} value={lane.name} onEdit={this.editName}/>
          <div className="lane-delete">
            <button onClick={this.deleteLane}>x</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{ notes: () => NoteStore.getNotesByIds(lane.notes) }}>
          <Notes onValueClick={this.activateNoteEdit} onEdit={this.editNote} onDelete={this.deleteNote}/>
        </AltContainer>
      </div>
    );
  }

  addNote = (e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;
    const note = NoteActions.create({ task: 'New Task' });

    LaneActions.attachToLane({ laneId, noteId: note.id });
  };

  editNote (id, task) {
    let editedNote = { id, editing: false };

    if (task.trim()) {
      editedNote.task = task;
    }

    NoteActions.update(editedNote);
  }

  deleteNote = (noteId, e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;

    LaneActions.detachFromLane({ laneId, noteId });
    NoteActions.delete(noteId);
  };

  editName = (name) => {
    let editedLane = { id: this.props.lane.id, editing: false };

    if (name.trim()) {
      editedLane.name = name;
    }

    LaneActions.update(editedLane);
  };

  deleteLane = () => {
    LaneActions.delete(this.props.lane.id);
  };

  activateLaneEdit = () => {
    LaneActions.update({ id: this.props.lane.id, editing: true });
  };

  activateNoteEdit (id) {
    NoteActions.update({ id, editing: true });
  }
}

