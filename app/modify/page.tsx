"use client";

import ModifyCategory from "@/components/ModifyCategory";
import ModifyRestaurant from "@/components/ModifyRestaurant";
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

    return (
        <div className="bg-zinc-950 min-h-screen overflow-hidden">
            <div className="flex flex-row justify-center items-start">
                <ModifyRestaurant
                    restaurants={restaurants}
                />
                <ModifyCategory
                    categories={categories}
                />

            </div>
        </div>
    );
}