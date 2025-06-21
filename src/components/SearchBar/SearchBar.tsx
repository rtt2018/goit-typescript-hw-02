import styles from './SearchBar.module.css';
import { FcSearch } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';
import { SearchBarProps } from '../../types/types';
import { FormEvent } from 'react';

export default function SearchBar({ getRequestPhrase }: SearchBarProps) {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const searchphrase = (formData.get('searchField') as string).trim();
    if (searchphrase === '') {
      toast.error("Please, enter something!", { duration: 2000 })
    } else {
      getRequestPhrase(searchphrase)
    }
    form.reset();
  }

  return (
    <>
      <Toaster
        toastOptions={{
          error: {
            duration: 2000,
          }
        }}
        position="top-right"
      />
      <header className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            className={styles.searchField}
            name='searchField'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button aria-label='Search' type="submit" className={styles.searchButton}><FcSearch className={styles.findIcon} /></button>
        </form>
      </header>
    </>
  );
}
