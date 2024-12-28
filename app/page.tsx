"use client"
import { useEffect, useState } from "react";
import { Restaurant } from '@/types/restaurant';
import { createChoices } from '@/utils/fetchChoices'

export default function Home() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [error, setError] = useState<string | null>(null); // For error handling

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await fetch(`api/restaurants`)
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setRestaurants(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
            }
        };
        fetchRestaurants();
    }, []);
    

    return (
        <div>
            <div className="restaurant-list">
                {restaurants.map((r) => {
                    return (
                        <div className="restaurant-name" key={r.restaurant_id}>
                            <div className="restaurant-data">
                                <h2>{r.restaurant_name}</h2>
                                <p>{r.category_name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button type="button" onClick={() => createChoices([2,3])}>Click me</button>
        </div>
    );
}
