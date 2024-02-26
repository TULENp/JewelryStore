import React, { useEffect, useState } from 'react';
import { ItemCard } from '../../components/ItemCard';
import { TItem } from '../../types/types';
import { GetBrands, GetItems, GetFilteredIds } from '../../service';

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

    useEffect(() => {
        getIds();
    }, []);

    async function getIds() {
        // const res = await GetIds(1);
        // const items = await GetItems(res);
        // const fields = await GetBrands();
        const meow = await GetFilteredIds({
            price: 15500,
        });
        console.log(meow);
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
