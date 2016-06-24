import React from 'react';
import Note from './Note';

export default ({notes, onEdit, onDelete}) => {
  return (
    <ul>{notes.map(note =>
      <li key={note.id}>
        <Note
          task={note.task}
          onEdit={onEdit.bind(undefined, note.id)}
          onDelete={onDelete.bind(undefined, note.id)} />
      </li>)}
    </ul>
  );
}
