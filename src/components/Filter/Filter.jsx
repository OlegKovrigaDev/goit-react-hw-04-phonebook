import React from 'react';

export default function Filter({ filter, onFilterChange }) {
  return (
    <div>
      <label>
        Filter contacts by name:
        <input type="text" value={filter} onChange={onFilterChange} />
      </label>
    </div>
  );
}
