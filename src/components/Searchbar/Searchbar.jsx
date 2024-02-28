import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  // state = {
  //   searchQuery: '',
  // };

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!e || searchQuery.trim() === '') {
      toast.warn('Please, enter your search query');
      return;
    }

    onSubmit(searchQuery);
  };

  // const { searchQuery } = this.state;

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}
