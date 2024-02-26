import React from 'react';
import styles from './ItemCard.module.css';

//* Display card with item data: id, name, price, brand
export function ItemCard() {
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
                    <span>1</span>
                </p>
                <p className={styles.content}>
                    <span>Часы</span>
                </p>
                <p className={styles.content}>
                    <span>99999</span> руб.
                </p>
                <p className={styles.content}>
                    <span>Ролекс</span>
                </p>
            </div>
        </div>
    );
}
