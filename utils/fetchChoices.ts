import { Restaurant } from '@/types/restaurant'

export const createChoices = (categories: number[]) => { //Restaurant[] => {
    let data: Restaurant[] = [];
    let recent: Restaurant[] = [];

    const fetchLeastRecent = async () => {
        const res = await fetch('api/restaurants/date');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        recent = await res.json();
    }

    const fetchRestaurants = async () => {
        const res = await fetch(`api/restaurants`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        data = await res.json();
    };

    (async () => {
        await fetchRestaurants();

        for (const r of data) {
            console.log(r.restaurant_name);
            if (!categories.includes(r.category_id)) {
                console.log("\tnot correct category")
            }
        }
    })();

}

// let data: Restaurant[] = [];

// export const fetchRestaurants = async () => {
//     const res = await fetch(`api/restaurants`);
//     if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//     }
//     data = await res.json();

//     console.log('data');
// };

// (async () => {
//     await fetchRestaurants();

//     // let r: keyof Restaurant;

//     for (const r of data) {
//         console.log(r.restaurant_name);
//     }
// })();
