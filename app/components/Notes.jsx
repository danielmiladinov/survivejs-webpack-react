import React from 'react';
import Editable from './Editable';

export default ({notes, onValueClick, onEdit, onDelete}) => {
  return (
    <ul className="notes">{notes.map(note =>
      <li className="note" key={note.id}>
        <Editable
          editing={note.editing}
          value={note.task}
          onValueClick={onValueClick.bind(undefined, note.id)}
          onEdit={onEdit.bind(undefined, note.id)}
          onDelete={onDelete.bind(undefined, note.id)} />
      </li>)}
    </ul>
  );
}
