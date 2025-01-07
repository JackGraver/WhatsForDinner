export type Restaurant = {
    restaurant_id: number;
    restaurant_name: string;
    last_visit: string;
    rating: number;
    categories_id: number[];
    categories: string[];
};

export type DBRestaurant = {
    restaurant_id: number;
    restaurant_name: string;
    last_visit: string;
    rating: number;
    categories_id: string;
    categories: string;
}