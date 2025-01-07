import { Restaurant } from "@/types/restaurant";

export default function RestaurantCard({
    restaurant
}: {
    restaurant: Restaurant;
}) {
    return (
        <div className="bg-zinc-700 p-6 m-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-zinc-100">{restaurant.restaurant_name}</h1>
                <div className="text-yellow-400 text-xl">
                    {restaurant.rating}✰
                </div>
            </div>

            <div className="text-zinc-300 mb-4">
                <p><strong>Last Visited:</strong> {restaurant.last_visit}</p>
            </div>

            <div className="bg-zinc-600 p-4 rounded-md">
                <h2 className="text-lg font-semibold text-zinc-100">Categories:</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {restaurant.categories.map((category) => (
                        <span
                            key={category}
                            className="bg-zinc-500 text-zinc-200 px-4 py-2 rounded-full text-sm"
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
