"use client";
import { useEffect, useState } from "react";
import { Restaurant, DBRestaurant } from "@/types/restaurant";
import { Category } from "@/types/category";
import { useSearchParams } from "next/navigation";
import RestaurantBlock from "@/components/RestaurantBlock";

export default function List() {
    const searchParams = useSearchParams();
    const dataString = searchParams.get('category');
    const categories = dataString ? JSON.parse(dataString) : []; // Get categories from URL parameter

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [error, setError] = useState<string | null>(null); // For error handling

    // Fetch data when the component mounts or categories change
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await fetch(`api/restaurants`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const json = await res.json();
                const data = json.map((item: DBRestaurant) => ({
                    restaurant_id: item.restaurant_id,
                    restaurant_name: item.restaurant_name,
                    last_visit: item.last_visit,
                    rating: item.rating,
                    categories_id: item.categories_id.split(', ').map((id: string) => parseInt(id, 10)),
                    categories: item.categories.split(', ')
                }));

                console.log("d - ", data);
                // Filter restaurants based on categories from the query parameter
                const filteredData = categories.length
                    ? data.filter((r: Restaurant) => r.categories.some((c) => categories.includes(c)))
                    : data;
                console.log("f - ", filteredData)

                setRestaurants(filteredData); // Store filtered restaurants
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
            }
        };
        fetchRestaurants();
    }, []); // Dependency on categories ensures fetch runs when categories change

    // If data is still loading, show error or loading message
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (restaurants.length === 0) {
        return <div>Loading...</div>;
    }

    // Sort and slice the restaurants based on different criteria

    // Sort restaurants by rating (descending)
    const mostLikely = [...restaurants].sort((a, b) => b.rating - a.rating);
    const topLikely = mostLikely[0]; // Most likely restaurant by rating

    // Sort restaurants by last visit date (oldest to newest)
    const leastRecent = [...restaurants].sort((a, b) => new Date(a.last_visit).getTime() - new Date(b.last_visit).getTime()).slice(0, 5);

    // Similar categories - filter restaurants with matching categories, if any
    const similarCat = categories.length
        ? restaurants.filter((r) => r.categories.some((c) => categories.includes(c))).slice(0, 5)
        : restaurants.slice(0, 5); // Show first 5 if no category filter is applied

    return (
        <div className="flex flex-col bg-zinc-950 min-h-screen justify-center items-center">
            {/* Main option div */}
            <div className="flex flex-col items-center mb-8">
                <h1 className="font-times text-6xl font-bold text-gray-200">
                    What about {topLikely.restaurant_name}
                </h1>
                <p className="text-gray-200">
                    Last visited on {topLikely.last_visit}
                </p>
            </div>

            {/* Secondary Options div */}
            <div className="flex flex-row justify-center gap-8">
                {/* List 1: Similar Categories */}
                <div className="bg-zinc-700 rounded-xl p-4">
                    <h2 className="text-gray-200">In the same category</h2>
                    {similarCat.map((r) => (
                        <div key={r.restaurant_id}>
                            <RestaurantBlock
                                restaurant={r}
                            />
                        </div>

                    ))}
                </div>

                {/* List 2: Most Likely Options */}
                <div className="bg-zinc-700 rounded-xl p-4">
                    <h2 className="text-gray-200">Other Suitable Options</h2>
                    {mostLikely.slice(0, 5).map((r) => ( // Limit to top 5 most likely
                        <div key={r.restaurant_id}>
                            <RestaurantBlock
                                restaurant={r}
                            />
                        </div>
                    ))}
                </div>

                {/* List 3: Least Recent */}
                <div className="bg-zinc-700 rounded-xl p-4">
                    <h2 className="text-gray-200">Been a while since you've been here</h2>
                    {leastRecent.map((r) => (
                        <div key={r.restaurant_id} >
                            <RestaurantBlock
                                restaurant={r}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
