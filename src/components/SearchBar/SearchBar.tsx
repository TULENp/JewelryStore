import { useState, ChangeEvent, KeyboardEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (value: string) => void;
}

//* Display input and button "Find"
export function SearchBar({ onSearch }: SearchBarProps) {
    const [searchValue, setSearchTerm] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.searchBar}>
            <input
                className={styles.search}
                type='text'
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Найти</button>
        </div>
    );
}
