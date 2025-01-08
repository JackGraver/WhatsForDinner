"use client";
import { Category } from "@/types/category";
import { Restaurant } from "@/types/restaurant";
import { useEffect, useState } from "react";

export default function New() {
    const [categories, setCategories] = useState<Category[]>([]);

    const [selectedCategories, setSelectedCategories] = useState<Map<number, Category>>(new Map());

    const [isSearching, setIsSearching] = useState(false);

    const [searchValue, setSearchValue] = useState("");

    const [formData, setFormData] = useState<Restaurant>({
        restaurant_id: 0, // This can be generated or omitted if not needed for new restaurants
        restaurant_name: "",
        last_visit: new Date().toISOString().split("T")[0], // Today's date
        rating: 1, // Default rating value
        categories_id: [], // Empty array for categories
        categories: [], // Empty array for category names
    });

    useEffect(() => {
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
            }
        };
        fetchCategories();
    }, []);

    const handleIsSearching = () => {
        setIsSearching(true);
    }
    const handleNotSearching = () => {
        setIsSearching(false);
    }

    const handleSelectCategory = (category: Category) => {
        setSelectedCategories(prevState => new Map(prevState).set(category.category_id, category));
        setFormData((prevData) => ({
            ...prevData,
            categories_id: [...prevData.categories_id, category.category_id], // Create a new array with the new category_id
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "rating" ? Number(value) : value, // Convert rating to a number
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);

        await fetch("/api/restaurants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
    };

    return (
        <div className="flex flex-col bg-zinc-950 min-h-screen justify-center items-center">
            <h1 className="font-times text-6xl font-bold text-gray-200 mb-4">
                Recently Visited A New Restaurant?
            </h1>
            <h2 className="font-times text-2xl text-gray-400 mb-8">
                Let’s hear about it!
            </h2>
            <div className="bg-gray-800 rounded-md shadow-lg p-6 w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    {/* Restaurant Name */}
                    <div>
                        <label htmlFor="restaurant_name" className="block text-gray-300 mb-2">
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            id="restaurant_name"
                            name="restaurant_name"
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-gray-300 mb-2">
                            Rating (1-5)
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            defaultValue={formData.rating}
                            onChange={handleInputChange}
                            min="1"
                            max="5"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Date */}
                    <label htmlFor="last_visit" className="block text-gray-300 mb-2">
                        Date Visited
                    </label>
                    <input
                        type="date"
                        name="last_visit"
                        className="rounded-md px-4 py-2 bg-gray-700 text-gray-100 flex-grow text-xl"
                        placeholder="Last Visit Date"
                        value={formData.last_visit}
                        onChange={handleInputChange}
                    />

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-gray-300 mb-2">
                            Categories
                        </label>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={handleSearchChange}
                            onFocus={handleIsSearching}
                            className="w-full rounded-md px-4 py-2 bg-gray-700 text-gray-100 flex-grow text-xl"
                            placeholder="Search categories..."
                        />

                        {isSearching && (
                            <div className="relative">
                                {categories
                                    .filter((cat) =>
                                        cat.category_name.toLowerCase().includes(searchValue.toLowerCase()) &&
                                        !Array.from(selectedCategories.values()).some(selectedCat => selectedCat.category_name === cat.category_name)
                                    )
                                    .map((c) => (
                                        <div
                                            className="rounded-md px-4 py-2 bg-gray-600 text-gray-100 flex-grow text-xl hover:bg-gray-500"
                                            key={c.category_id}
                                            onClick={() => handleSelectCategory(c)}
                                        >
                                            {c.category_name}
                                        </div>
                                    ))}
                            </div>
                        )}
                        {Array.from(selectedCategories.values()).map((c) => (
                            <div
                                key={c.category_id}
                                className="rounded-md m-2 px-4 py-2 bg-gray-700 text-gray-100 flex-grow text-xl"
                            >
                                <p>{c.category_name}</p>
                            </div>
                        ))}

                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}