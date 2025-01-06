"use client";

import { Category } from "@/types/category";
import { Restaurant } from "@/types/restaurant";
import { useEffect, useState } from "react";

export default function Modify() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await fetch(`api/restaurants`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setRestaurants(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                // setError("Failed to load data");
            }
        };
        fetchRestaurants();

        const fetchCategories = async () => {
            try {
                const res = await fetch(`api/categories`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                // setError("Failed to load data");
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
        const newCategories = categories.map((category) =>
            category.category_id === categoryId
                ? { ...category, category_name: e.target.value }
                : category
        );
        setCategories(newCategories);
    };

    const handleSave = (categoryId: number) => {
        const updatedCategory = categories.find(
            (category) => category.category_id === categoryId
        );
        console.log("Saving category:", updatedCategory); // Replace with API call if needed
    };

    const handleDelete = (categoryId: number) => {
        const filteredCategories = categories.filter(
            (category) => category.category_id !== categoryId
        );
        setCategories(filteredCategories);
        console.log("Deleted category with ID:", categoryId); // Replace with API call if needed
    };



    return (
        <div className="bg-zinc-950 min-h-screen overflow-hidden">
            <div className="flex flex-row justify-center items-start">
                {/* Headers */}
                <div className="flex flex-col justify-start items-center">
                    <h1 className="font-times text-4xl font-bold text-gray-200 m-4">
                        Modify a Restaurant
                    </h1>
                    <div className="flex flex-col">
                        {restaurants.map((r) => (
                            <div
                                key={r.restaurant_id}
                                className="bg-gray-400 rounded-md shadow-md p-4 m-1 min-w-96"
                            >
                                <h1 className="text-gray-100">{r.restaurant_name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center ml-8">
                    <h1 className="font-times text-4xl font-bold text-gray-200 m-4">
                        Modify a Category
                    </h1>
                    <div className="flex flex-col">
                        {categories.map((c) => (
                            <div
                                key={c.category_id}
                                className="bg-gray-400 rounded-md shadow-md p-4 m-1 space-x-2 min-w-96 flex items-center"
                            >
                                <input
                                    className="rounded-md px-4 py-2 flex-grow"
                                    value={c.category_name}
                                    onChange={(e) => handleInputChange(e, c.category_id)}
                                />
                                <button
                                    className="bg-green-500 rounded-md shadow-md px-3 py-1"
                                    onClick={() => handleSave(c.category_id)}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-red-500 rounded-md shadow-md px-3 py-1"
                                    onClick={() => handleDelete(c.category_id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}