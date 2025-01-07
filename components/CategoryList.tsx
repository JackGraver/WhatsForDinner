"use client";

import { Category } from "@/types/category";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type CategoryListProps = {
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}

export default function CategoryList({
    selectedCategories,
    setSelectedCategories
}: CategoryListProps) {
    const [categories, setCategories] = useState<Category[]>([]); // Sample category data

    const [isAdding, setIsAdding] = useState(false);

    const [isSearching, setIsSearching] = useState(false);

    const [searchValue, setSearchValue] = useState("");

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
                // setError("Failed to load data");
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = () => {
        if (!isAdding) {
            setSelectedCategories((prev) => [...prev, ""]); // Add a placeholder for the new category
            setIsAdding(true); // Enable the input field for the new category
            console.log("s: " + selectedCategories);
        }
    };

    const handleIsSearching = () => {
        setIsSearching(true);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSelectCategory = (category: string, index: number) => {
        const newCategories = [...selectedCategories];
        newCategories[index] = category; // Replace placeholder with the selected category
        setSelectedCategories(newCategories);
        setIsAdding(false); // Exit search mode
        setSearchValue(""); // Clear the search input
    };

    return (
        <div className="flex flex-col items-end space-y-4 relative">
            <h1 className="text-gray-100 text-lg font-bold">Any Specific Cuisines?</h1>
            {/* Scrollable container */}
            <div className="space-y-4">
                {selectedCategories.map((category, index) => (
                    <div key={index} className="flex flex-col space-y-2 relative">
                        {isAdding && category === "" ? (
                            <div className="transition-all duration-500 ease-in-out">
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onFocus={handleIsSearching}
                                    className="w-40 px-4 py-2 rounded-md bg-gray-800 text-white opacity-0 animate-fade-in"
                                    placeholder="Search categories..."
                                />
                                {isSearching && (
                                    <div className="w-40 absolute top-full left-0 bg-gray-700 shadow-md rounded-md z-10 max-h-40 overflow-y-auto">
                                        {categories
                                            .filter((cat) =>
                                                cat.category_name.toLowerCase().includes(searchValue.toLowerCase()) && !selectedCategories.includes(cat.category_name)
                                            )
                                            .map((filteredCategory) => (
                                                <div
                                                    key={filteredCategory.category_id}
                                                    className="px-4 py-2 text-gray-100 cursor-pointer hover:bg-gray-600"
                                                    onClick={() =>
                                                        handleSelectCategory(filteredCategory.category_name, index)
                                                    }
                                                >
                                                    {filteredCategory.category_name}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                className="w-40 px-4 py-2 rounded-md text-center bg-gray-700 text-gray-100 hover:bg-red-600 cursor-pointer transition-colors duration-300"
                                onClick={() => {
                                    setSelectedCategories((prev) =>
                                        prev.filter((_, idx) => idx !== index) // Remove the clicked category
                                    );
                                }}
                            >
                                {category}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={handleAddCategory}
                className="w-40 px-4 py-2 rounded-md bg-gray-800 text-gray-100 hover:bg-gray-700 transform transition-transform duration-1000 ease-in-out"
            >
                +
            </button>
        </div>
    );
}
