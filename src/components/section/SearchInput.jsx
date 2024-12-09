import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
  // const [search, setSearch] = useState('');
  const searchRef = useRef('');
  const navigate = useNavigate();
  const handleChange = useCallback((e) => {
    searchRef.current = e.target.value;
    // setSearch(e.target.value);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = searchRef.current.trim();
    if (search.trim() !== '') {
      navigate(`/search/${search}`);
      // setSearch('');
      searchRef.current = ''; // clear input field after submit
      e.target.reset();
    }
  };

  return (
    <div id='search'>
      <div className='search__inner'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='searchInput'>
            <span className='ir'>검색</span>
          </label>
          <input
            type='text'
            id='searchInput'
            // value={search}
            onChange={handleChange}
            className='search__input '
            placeholder='Search...'
          />
        </form>
      </div>
    </div>
  );
}
