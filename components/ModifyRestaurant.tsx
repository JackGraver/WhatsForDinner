import { Restaurant } from "@/types/restaurant";
import { useState } from "react";

export default function ModifyRestaurant({
    restaurants
}: {
    restaurants: Restaurant[]
}) {
    // State for storing modified restaurant data
    const [modifiedRestaurants, setModifiedRestaurants] = useState(restaurants);

    const [searchQuery, setSearchQuery] = useState("");

    // Handle input change for restaurant fields
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        restaurantId: number,
        field: string
    ) => {
        const { value } = e.target;

        // Update the specific restaurant's field
        setModifiedRestaurants((prevRestaurants) =>
            prevRestaurants.map((restaurant) =>
                restaurant.restaurant_id === restaurantId
                    ? {
                        ...restaurant,
                        [field]: field === "rating" ? Number(value) : value, // Ensure rating is a number
                    }
                    : restaurant
            )
        );
    };

    // Handle saving the modified restaurant
    const handleSave = async (restaurantID: number) => {
        const updatedRestaurant = restaurants.find(
            (restaurant) => restaurant.restaurant_id === restaurantID
        );

        await fetch("/api/restaurants", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRestaurant),
        });
    };
    const handleDelete = async (restaurantID: number) => {
        const filteredRestaurants = restaurants.filter(
            (restaurant) => restaurant.restaurant_id !== restaurantID
        );
        restaurants = filteredRestaurants;

        await fetch("/api/restaurants", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ restaurant_id: restaurantID }),
        });
    };

    return (
        <div className="flex flex-col justify-start items-center">
            <h1 className="font-times text-4xl font-bold text-gray-200 m-4">
                Modify a Restaurant
            </h1>
            <div className="mb-4 w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="w-full rounded-md px-4 py-2 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex flex-col space-y-4 w-full">
                {restaurants
                    .filter((restaurant) =>
                        restaurant.restaurant_name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((r) => (
                        <div
                            key={r.restaurant_id}
                            className="bg-gray-400 rounded-md shadow-md p-4 m-1 min-w-96 flex flex-col space-y-4"
                        >
                            {/* Restaurant Name Input */}
                            <div className="flex items-center">
                                <input
                                    className="rounded-md px-4 py-2 flex-grow text-xl"
                                    placeholder="Restaurant Name"
                                    value={r.restaurant_name}
                                    onChange={(e) => handleInputChange(e, r.restaurant_id, "restaurant_name")}
                                />
                            </div>

                            {/* Rating Input (1 to 5) */}
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    className="rounded-md px-4 py-2 flex-grow text-xl"
                                    min="1"
                                    max="5"
                                    placeholder="Rating (1-5)"
                                    value={r.rating}
                                    onChange={(e) => handleInputChange(e, r.restaurant_id, "rating")}
                                />
                            </div>

                            {/* Last Visit Date Input */}
                            <div className="flex items-center">
                                <input
                                    type="date"
                                    className="rounded-md px-4 py-2 flex-grow text-xl"
                                    placeholder="Last Visit Date"
                                    value={r.last_visit}
                                    onChange={(e) => handleInputChange(e, r.restaurant_id, "last_visit")}
                                />
                            </div>

                            {/* Category Selection (Placeholder for now) */}
                            <div className="flex items-center">
                                <div className="w-full h-12 bg-gray-300 rounded-md flex items-center justify-center">
                                    <p className="text-gray-600">Select Categories (to be implemented)</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    className="bg-green-500 text-white rounded-md shadow-md px-4 py-2"
                                    onClick={() => handleSave(r.restaurant_id)}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-red-500 text-white rounded-md shadow-md px-4 py-2"
                                    onClick={() => handleDelete(r.restaurant_id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
