import React, { useEffect, useState } from 'react';
import { ItemCard } from '../../components/ItemCard';
import styles from './MainPage.module.css';
import { TItem } from '../../types/types';
import { GetBrands, GetItems, GetFilteredIds, GetIds } from '../../service';
import { Pagination } from '../../components/Pagination';

//* Display search bar, filters, item cards list
export function MainPage() {
    const [storeItems, setStoreItems] = useState<TItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        getProducts();
    }, [currentPage]);

    async function getProducts() {
        const res = await GetIds(currentPage);
        const items = await GetItems(res);
        setStoreItems(items);
    }

    // increments currentPage state
    function incPage() {
        if (currentPage < 10) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    // decrements currentPage state
    function decPage() {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    return (
        <main>
            <Pagination dec={decPage} inc={incPage} page={currentPage} />
            {/* List of item cards */}
            <section className={styles.cardContainer}>
                {storeItems.map((item) => (
                    <ItemCard data={item} key={item.id} />
                ))}
            </section>
            <Pagination dec={decPage} inc={incPage} page={currentPage} />
        </main>
    );
}
