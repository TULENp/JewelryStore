import axios, { AxiosError } from 'axios';
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
    return retryRequest(async () => {
        const response = await axios.post('/', {
            action: 'get_ids',
            params: {
                offset: (page - 1) * PAGE_SIZE,
                limit: PAGE_SIZE,
            },
        });

        return response.data.result;
    });
}

// return items data by ids
export async function GetItems(ids: string[]) {
    return retryRequest(async () => {
        const response = await axios.post('/', {
            action: 'get_items',
            params: { ids },
        });
        return response.data.result;
    });
}

// return item brands
export async function GetBrands(): Promise<string[]> {
    return retryRequest(async () => {
        const response = await axios.post('/', {
            action: 'get_fields',
            params: { field: 'brand' },
        });
        return response.data.result;
    });
}

// return items ids filtered by name OR brand OR price
export async function GetFilteredIds(itemField: Partial<Omit<TItem, 'id'>>) {
    return retryRequest(async () => {
        const response = await axios.post('/', {
            action: 'filter',
            params: {
                ...itemField,
            },
        });
        return response.data.result;
    });
}

// If request fails throw error message and retries request
async function retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
): Promise<T> {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            return await requestFn();
        } catch (error) {
            retries++;
            if (retries < maxRetries) {
                console.log(
                    `Идентификатор ошибки: ${
                        (error as AxiosError)?.response?.status
                    }. Повторная попытка... (${retries}/${maxRetries})`,
                );
            } else {
                throw error;
            }
        }
    }

    throw new Error('Достигнуто максимальное количество попыток');
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
