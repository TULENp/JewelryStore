import React from 'react';
import styles from './ItemCard.module.css';
import { TItem } from '../../types/types';

//* Display card with item data: id, name, price, brand
export function ItemCard({ data }: { data: TItem }) {
    const { brand, id, name, price } = data;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.propertySection}>
                <p className={styles.property}>ID:</p>
                <p className={styles.property}>Название:</p>
                <p className={styles.property}>Цена:</p>
                <p className={styles.property}>Бренд:</p>
            </div>
            <div className={styles.contentSection}>
                <p className={styles.content}>
                    <span>{id}</span>
                </p>
                <p className={styles.content}>
                    <span>{name}</span>
                </p>
                <p className={styles.content}>
                    <span>{price}</span> руб.
                </p>
                <p className={styles.content}>
                    <span>{brand}</span>
                </p>
            </div>
        </div>
    );
}
