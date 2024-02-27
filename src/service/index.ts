import axios from 'axios';
import { md5 } from 'js-md5';

import { BASE_URL, PAGE_SIZE, PASSWORD } from '../constants';
import { TItem } from '../types/types';

axios.defaults.baseURL = BASE_URL; // set request base url
axios.defaults.headers.common['X-Auth'] = generateAuthHeader(); // set X-Auth header

// generates md5 hash for X-Auth
function generateAuthHeader() {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const hash = md5(`${PASSWORD}_${timestamp}`);
    return hash;
}

// return items ids with pagination
export async function GetIds(page: number = 1) {
    return await axios
        .post('/', {
            action: 'get_ids',
            params: {
                offset: (page - 1) * PAGE_SIZE,
                limit: PAGE_SIZE,
            },
        })
        .then((response) => response.data.result)
        .catch((error) => error);
}

// return items data by ids
export async function GetItems(ids: string[]) {
    return await axios
        .post('/', {
            action: 'get_items',
            params: { ids },
        })
        .then((response) => response.data.result)
        .catch((error) => error);
}

// return item brands
export async function GetBrands() {
    return await axios
        .post('/', {
            action: 'get_fields',
            params: { field: 'brand' },
        })
        .then((response) => response.data.result)
        .catch((error) => error);
}

// return items ids filtered by name, brand, price
export async function GetFilteredIds(itemFields: Partial<Omit<TItem, 'id'>>) {
    return await axios
        .post('/', {
            action: 'filter',
            params: {
                ...itemFields,
                offset: (1) * PAGE_SIZE,
                limit: PAGE_SIZE,
            },
        })
        .then((response) => response.data.result)
        .catch((error) => error);
}

//* if '/filter' endpoint worked with offset and limit I would use this method instead of GetIds and GetFilteredIds
// export async function GetFilteredIds(
//     page: number = 1,
//     itemFields?: Partial<Omit<TItem, 'id'>>,
// ) {
//     const requestData = {
//         action: itemFields ? 'filter' : 'get_ids',
//         params: {
//             ...(itemFields || {}),
//             offset: (page - 1) * pageSize,
//             limit: pageSize,
//         },
//     };

//     return await axios
//         .post('/', requestData)
//         .then((response) => response.data.result)
//         .catch((error) => error);
// }
