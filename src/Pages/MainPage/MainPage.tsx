import React, { useEffect, useState } from 'react';
import { ItemCard } from '../../components/ItemCard';
import styles from './MainPage.module.css';
import { TItem } from '../../types/types';
import { GetItems, GetIds, GetFilteredIds } from '../../service';
import { Pagination } from '../../components/Pagination';
import { SearchBar } from '../../components/SearchBar';

//* Display search bar, filters, item cards list
export function MainPage() {
    const [storeItems, setStoreItems] = useState<TItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if (searchValue !== '') {
            getFilteredProducts();
        } else {
            getProducts();
        }
    }, [currentPage, searchValue]);

    async function getProducts() {
        setLoading(true);
        const res = await GetIds(currentPage);
        const items = await GetItems(res);
        setStoreItems(items);
        setLoading(false);
    }

    async function getFilteredProducts() {
        setLoading(true);
        const res = await GetFilteredIds({
            product: searchValue,
        });
        const items = await GetItems(res);
        setStoreItems(items);
        setLoading(false);
    }

    // increments currentPage state
    function incPage() {
        if (currentPage < 100) {
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
        <main className={styles.container}>
            <SearchBar onSearch={setSearchValue} />

            <div className={styles.content}>
                <Pagination dec={decPage} inc={incPage} page={currentPage} />

                {/* List of item cards */}
                <section className={styles.cardContainer}>
                    {loading ? (
                        <div className={styles.spinnerContainer}>
                            <div className={styles.spinner}></div>
                        </div>
                    ) : storeItems.length ? (
                        storeItems.map((item) => (
                            <ItemCard data={item} key={item.id} />
                        ))
                    ) : (
                        <h1>Ничего не найдено</h1>
                    )}
                </section>

                <Pagination dec={decPage} inc={incPage} page={currentPage} />
            </div>
        </main>
    );
}
