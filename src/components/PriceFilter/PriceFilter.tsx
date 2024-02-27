import React, { useState } from 'react';
import styles from './PriceFilter.module.css';

interface PriceFilterProps {
    onFilter: (minPrice: number) => void;
}

export function PriceFilter({ onFilter }: PriceFilterProps) {
    const [price, setPrice] = useState<number | ''>('');

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setPrice(value === '' ? '' : parseFloat(value));
    }

    function handleFilterClick() {
        if (typeof price === 'number' && !isNaN(price)) {
            onFilter(price);
        }
    }

    return (
        <div className={styles.searchBar}>
            <input
                className={styles.search}
                type='number'
                value={price}
                onChange={handleInputChange}
                placeholder='Введите цену'
            />
            <button onClick={handleFilterClick}>Ок</button>
        </div>
    );
}
