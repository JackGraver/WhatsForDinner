"use client";
import { useEffect, useState } from "react";
import { Restaurant } from "@/types/restaurant";
import { Category } from "@/types/category";
import { createChoices } from "@/utils/fetchChoices";
import Image from 'next/image';

export default function Home() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [error, setError] = useState<string | null>(null); // For error handling

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
                setError("Failed to load data");
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
                setError("Failed to load data");
            }
        };
        fetchCategories();
    }, []);

    const handleClick = async () => {
        createChoices([1, 2]);
    };

    return (
        <div className="bg-zinc-950 min-h-screen flex flex-col place-content-center h-48">
            {" "}
            {/* Main div */}
            <div className="flex justify-center">
                {" "}
                {/* Header div */}
                <div className="flex flex-col h-24 justify-between">
                    {" "}
                    {/* Header div 2 */}
                    <div className="flex items-center justify-between gap-x-3">
                        {" "}
                        {/* Title div */}
                        <h1 className="font-times text-6xl font-bold text-gray-200">
                            Whats For Dinner Tonight?
                        </h1>
                        <Image
                            src="/food.svg"
                            alt="Food"
                            width={50}
                            height={50}
                            priority // Ensures the image loads quickly for LCP optimization
                            className="invert"
                        />
                    </div>
                    <p className="text-gray-200 font-times text-light text-2xl text-right self-end">
                        For Jack and Gen
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-6 space-y-4">
                <button
                    className="w-1/2 px-6 py-3 bg-emerald-950 text-gray-200 font-times font-bold text-4xl rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
                    onClick={handleClick}
                >
                    Let&apos;s find out
                </button>

                <div className="w-1/2 flex justify-end items-center space-x-4">
                    <label className="text-lg text-white">Any specific cuisines?</label>
                    <select
                        className="px-4 py-2 bg-gray-800 text-gray-200 font-times font-bold text-lg rounded-lg shadow-md hover:bg-gray-500 transition duration-300 ease-in-out"
                        onChange={() => { }}
                    >
                        <option value="">Select a category (None)</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
