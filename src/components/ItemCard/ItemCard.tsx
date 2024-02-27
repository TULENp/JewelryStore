import React from 'react';
import styles from './ItemCard.module.css';
import { TItem } from '../../types/types';

export function ItemCard({ data }: { data: TItem }) {
    const { brand, id, product, price } = data;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.itemRow}>
                <p className={styles.property}>ID:</p>
                <p className={styles.content}>
                    <span>{id || '-'}</span>
                </p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.property}>Название:</p>
                <p className={styles.content}>
                    <span>{product || '-'}</span>
                </p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.property}>Цена:</p>
                <p className={styles.content}>
                    <span>{price || '-'}</span> руб.
                </p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.property}>Бренд:</p>
                <p className={styles.content}>
                    <span>{brand || '-'}</span>
                </p>
            </div>
        </div>
    );
}
