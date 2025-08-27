import { useState, useEffect } from "react";
import { useParams } from "react-router";
import RestInfo from "./restInfo";

export default function SearchFood() {
    const { id } = useParams();
    const [RestData, setRestData] = useState([]);
    const [food, setFood] = useState("");

    useEffect(() => {
        async function fetchData() {
        const response = await fetch(`http://localhost:5000/swiggy-menu?id=${id}`);
        const data = await response.json();

        // Get all categories (blocks with title)
        const tempData =
            data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

        const filterData = tempData.filter(
            (items) => "title" in items.card.card
        );

        setRestData(filterData);
        }
        fetchData();
    }, [id]);

    // Flatten all itemCards from categories
    const allItems = RestData.flatMap(
        (category) => category?.card?.card?.itemCards || []
    );

    // Filter items based on search
    const filteredItems = allItems.filter((item) =>
        item?.card?.info?.name?.toLowerCase().includes(food.toLowerCase())
    );

    return (
        <>
        {/* Search Bar */}
        <div className="w-[60%] mx-auto mt-10 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-2xl">
            🔍
            </span>
            <input
            className="w-full pl-12 pr-4 py-3 text-lg bg-white rounded-2xl border border-gray-300 shadow-md 
                        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 
                        placeholder-gray-400 transition duration-200"
            placeholder="Find your favorite dish..."
            onChange={(e) => setFood(e.target.value.toLowerCase())}
            />
        </div>

        {/* Food List */}
        <div className="w-[60%] mx-auto mt-20">
            {filteredItems.length > 0 ? (
            filteredItems.map((menu, index) => (
                <RestInfo
                key={`${menu?.card?.info?.id}-${index}`} // ✅ unique key
                restData={menu?.card?.info}
                />
            ))
            ) : (
            <p className="text-center text-gray-500 text-lg mt-10">
                No dishes found 🍽️
            </p>
            )}
        </div>
    </>
  );
}