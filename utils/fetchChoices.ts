import { Restaurant } from '@/types/restaurant'

type JSON = {
    restaurant_id: number;
    restaurant_name: string;
    last_visit: string;
    categories_id: string;  // Assumed to be a string of comma-separated values
    categories: string;     // Assumed to be a string of comma-separated values
}

export const createChoices = (categories: number[]) => { //Restaurant[] => {
    let data: Restaurant[] = [];

    const fetchRestaurants = async () => {
        const res = await fetch(`api/restaurants`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json()
        data = json.map((item: JSON) => ({
            restaurant_id: item.restaurant_id,
            restaurant_name: item.restaurant_name,
            last_visit: item.last_visit,
            categories_id: item.categories_id.split(', ').map((id: string) => parseInt(id, 10)),
            categories: item.categories.split(', ')
        }));
    };


    (async () => {
        await fetchRestaurants();

        console.log(data);
        for (const r of data) {
            console.log(r.restaurant_id);
            console.log(r.restaurant_name);
            console.log(r.last_visit);
            console.log(r.categories_id);
            console.log(r.categories);
        }
        window.location.href = '/list'
        // console.log(data);
        // if (categories.length != 0) {
        //     const filteredData = data.filter(item => categories.includes(item.category_id));
        //     console.log(filteredData);
        // }

        // for (const r of data) {
        //     console.log(r.restaurant_name);
        //     if (!categories.includes(r.category_id)) {
        //         console.log("\tnot correct category")
        //     }
        // }
    })();
}