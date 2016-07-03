import React from 'react';
import Editable from './Editable';
import Note from './Note';

export default ({notes, onValueClick, onEdit, onDelete}) => {
  return (
    <ul className="notes">{notes.map(note =>
      <li className="note" key={note.id}>
        <Note className="note" id={note.id} key={note.id}
              onMove={({sourceId, targetId}) => console.log(`source: ${sourceId}, target: ${targetId}`)}>
          <Editable
            editing={note.editing}
            value={note.task}
            onValueClick={onValueClick.bind(undefined, note.id)}
            onEdit={onEdit.bind(undefined, note.id)}
            onDelete={onDelete.bind(undefined, note.id)} />
        </Note>
      </li>)}
    </ul>
  );
}
