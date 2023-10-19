import React, { useState } from 'react';

interface MovieSearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const MovieSearchBar: React.FC<MovieSearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by genre..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default MovieSearchBar;
