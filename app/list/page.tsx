"use client";
import { useEffect, useState } from "react";
import { Restaurant, DBRestaurant } from "@/types/restaurant";
import { useSearchParams } from "next/navigation";

export default function List() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    console.log("category: ", category);

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const [error, setError] = useState<string | null>(null); // For error handling

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
                    categories_id: item.categories_id.split(', ').map((id: string) => parseInt(id, 10)),
                    categories: item.categories.split(', ')
                }));

                setRestaurants(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
            }
        };
        fetchRestaurants();
    }, []);

    console.log(restaurants);



    return (
        <div className="flex flex-col bg-zinc-950 min-h-screen justify-center items-center"> {/* Main div*/}

            {/* Main option div */}
            <div className="flex flex-col items-center mb-8"> {/* Added `items-center` for horizontal centering */}
                <h1 className="font-times text-6xl font-bold text-gray-200">
                    What about "restaurant"
                </h1>
                <p className="text-gray-200">
                    Restaurant info
                </p>
            </div>

            {/* Secondary Options div */}
            <div className="flex flex-row justify-center gap-8"> {/* Added `justify-center` and `gap-8` for centering and spacing between the h2s */}
                <div> {/* List 1 */}
                    <h2 className="text-gray-200">In the same category</h2>
                </div>
                <div> {/* List 2 */}
                    <h2 className="text-gray-200">Been a while since you've been here</h2>
                </div>
                <div> {/* List 3 */}
                    <h2 className="text-gray-200">Third im blanking on</h2>
                </div>
            </div>
        </div>
    );
}