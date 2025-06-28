import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch?: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch?.(query);
      }}
      style={{ display: 'flex', gap: 8 }}
    >
      <input
        type="text"
        placeholder="Search properties..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ flex: 1, padding: 12, fontSize: 16, borderRadius: 8, border: '1px solid #ccc' }}
      />
      <button type="submit" style={{
        padding: '12px 24px',
        borderRadius: 8,
        border: 'none',
        background: '#2352b6',
        color: '#fff',
        fontWeight: 600
      }}>Search</button>
    </form>
  );
};

export default SearchBar;