import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryChangeHandler = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.error('Enter your search term!');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}></button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={searchQueryChangeHandler}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = { searchQuery: PropTypes.string };
