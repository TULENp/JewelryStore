import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (value: string) => void;
}

//* Display input and button "Find"
export function SearchBar({ onSearch }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.searchBar}>
            <input
                type='text'
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            <button onClick={handleSearch}>Найти</button>
        </div>
    );
}
