import { useState } from "react";
import { Category } from "@/types/category"

export default function ModifyCategory({
    categories
}: {
    categories: Category[]
}) {
    // State for search query
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
        const newCategories = categories.map((category) =>
            category.category_id === categoryId
                ? { ...category, category_name: e.target.value }
                : category
        );
        categories = newCategories;
    };
    const handleSave = async (categoryId: number) => {
        const updatedCategory = categories.find(
            (category) => category.category_id === categoryId
        );

        await fetch("/api/categories", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCategory),
        });
    };
    const handleDelete = async (categoryId: number) => {
        const filteredCategories = categories.filter(
            (category) => category.category_id !== categoryId
        );
        categories = filteredCategories;

        await fetch("/api/categories", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category_id: categoryId }),
        });
    };
    return (
        <div className="flex flex-col justify-start items-center ml-8">
            <h1 className="font-times text-4xl font-bold text-gray-200 m-4">
                Modify a Category
            </h1>
            {/* Search Input */}
            <div className="mb-4 w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="w-full rounded-md px-4 py-2 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Category List */}
            <div className="flex flex-col space-y-4 w-full">
                {categories
                    .filter((category) =>
                        category.category_name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((c) => (
                        <div
                            key={c.category_id}
                            className="bg-gray-400 rounded-md shadow-md p-4 m-1 min-w-96 flex flex-col justify-between"
                        >
                            {/* Category Name Input */}
                            <div className="flex items-center mb-2">
                                <input
                                    className="rounded-md px-4 py-2 flex-grow text-xl font-medium"
                                    value={c.category_name}
                                    onChange={(e) => handleInputChange(e, c.category_id)}
                                />
                            </div>

                            {/* Restaurant Count as Subheader */}
                            <p className="text-sm text-gray-600 mt-2 mb-4">
                                Used in {c.num_restaurants} restaurants
                            </p>

                            {/* Buttons */}
                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-green-500 text-white rounded-md shadow-md px-4 py-2"
                                    onClick={() => handleSave(c.category_id)}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-red-500 text-white rounded-md shadow-md px-4 py-2"
                                    onClick={() => handleDelete(c.category_id)}
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
