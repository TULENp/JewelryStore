import React, { useEffect, useState } from 'react';
import { ItemCard } from '../../components/ItemCard';
import { TItem } from '../../types/types';
import { GetBrands, GetItems, GetFilteredIds, GetIds } from '../../service';

//* Display search bar, filters, item cards list
export function MainPage() {
    const [storeItems, setStoreItems] = useState<TItem[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const res = await GetIds(1);
        const items = await GetItems(res);
        setStoreItems(items);
    }

    return (
        <main>
            {/* List of item cards */}
            <section>
                {storeItems.map((item) => (
                    <ItemCard data={item} key={item.id} />
                ))}
            </section>
        </main>
    );
}
