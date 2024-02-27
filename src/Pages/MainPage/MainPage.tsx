import { useEffect, useState } from 'react';
import { ItemCard } from '../../components/ItemCard';
import styles from './MainPage.module.css';
import { TItem } from '../../types/types';
import { GetItems, GetIds, GetFilteredIds, GetBrands } from '../../service';
import { Pagination } from '../../components/Pagination';
import { SearchBar } from '../../components/SearchBar';
import { BrandSelector } from '../../components/BrandSelector';
import { PriceFilter } from '../../components/PriceFilter';

//* Display search bar, filters, item cards list
export function MainPage() {
    const [storeItems, setStoreItems] = useState<TItem[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    // const [searchValue, setSearchValue] = useState<string>('');
    // const [selectedBrand, setSelectedBrand] = useState<string | null>();

    useEffect(() => {
        getBrands();
    }, []);

    useEffect(() => {
        getProducts();
    }, [currentPage]);

    // get brands, without nulls and duplicates
    async function getBrands() {
        const res = await GetBrands();
        const uniqueBrands = Array.from(
            new Set(res.filter((item) => item !== null)),
        );
        setBrands(uniqueBrands);
    }

    // get unique items ids depends on current page then by this ids find items
    async function getProducts() {
        setLoading(true);
        const res = await GetIds(currentPage);
        const uniqueIds = Array.from(new Set<string>(res));
        const items = await GetItems(uniqueIds);
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

    async function FilterByProduct(searchValue: string) {
        setLoading(true);
        const res = await GetFilteredIds({
            product: searchValue,
        });
        const items = await GetItems(res);
        setStoreItems(items);
        setLoading(false);
    }

    async function FilterByPrice(priceValue: number) {
        setLoading(true);
        const res = await GetFilteredIds({
            price: priceValue,
        });
        const items = await GetItems(res);
        setStoreItems(items);
        setLoading(false);
    }

    async function FilterByBrand(brandsValue: string | null) {
        setLoading(true);
        let res = [];
        if (brandsValue) {
            res = await GetFilteredIds({
                brand: brandsValue,
            });
        } else {
            res = await GetIds();
        }
        const items = await GetItems(res);
        setStoreItems(items);
        setLoading(false);
    }

    return (
        <main>
            <SearchBar onSearch={FilterByProduct} />

            <div className={styles.container}>
                <aside className={styles.filter}>
                    <BrandSelector brands={brands} onSelect={FilterByBrand} />
                    <PriceFilter onFilter={FilterByPrice} />
                </aside>

                <div className={styles.content}>
                    <Pagination
                        dec={decPage}
                        inc={incPage}
                        page={currentPage}
                    />

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

                    <Pagination
                        dec={decPage}
                        inc={incPage}
                        page={currentPage}
                    />
                </div>
            </div>
        </main>
    );
}
