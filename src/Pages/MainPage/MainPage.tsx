import React, { useState } from 'react';
import { ItemCard } from '../../components/ItemCard';
import { TItem } from '../../types/types';

//* Display search bar, filters, item cards list
export function MainPage() {
    const data: TItem[] = [
        {
            brand: 'Ролекс',
            id: 1,
            name: 'Часы',
            price: 99999,
        },
        {
            brand: 'Ролекс',
            id: 2,
            name: 'Часы',
            price: 99999,
        },
        {
            brand: 'Ролекс',
            id: 3,
            name: 'Часы',
            price: 99999,
        },
    ];
    const [storeItems, setStoreItems] = useState<TItem[]>(data);

    return (
        <main>
            {/* List of item cards */}
            <section>
                {storeItems.map((item) => (
                    <ItemCard data={item} />
                ))}
            </section>
        </main>
    );
}
