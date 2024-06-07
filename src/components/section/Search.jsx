import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      navigate(`/search/${search}`);
      setSearch('');
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
            value={search}
            onChange={handleChange}
            className='search__input '
            placeholder='Search...'
          />
        </form>
      </div>
    </div>
  );
}
