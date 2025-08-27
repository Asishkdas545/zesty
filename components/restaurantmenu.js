import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MenuCard from "./menuCard";
import { Link } from "react-router";

export default function RestaurantMenu(){
    let {id} = useParams();
    const [RestData , setRestData] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(()=>{
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/swiggy-menu?id=${id}`);
            const data = await response.json();
            const tempData = data?.data?.cards[5].groupedCard?.cardGroupMap?.REGULAR?.cards ;
            const filterData = tempData.filter((items)=>"title" in items.card.card);
            setRestData(filterData);
        }
        fetchData();
    },[]);
    console.log(RestData);
    return(
        <>
        <div className="flex items-center justify-center my-4">
        <span className="text-gray-600 text-sm font-serif tracking-widest flex items-center">
            ❧─── <span className="mx-3 text-base font-bold">MENU</span> ───❧
        </span>
        </div>

        <div className="w-[60%] mx-auto mt-10 mb-10">
            <Link to={`/city/delhi/${id}/search`}>
            <p className="w-full text-center py-2 rounded-2xl bg-gray-200 text-xl">Search for Dishes</p>
            </Link>
        </div>  


        <div className="w-[80%] mx-auto mt-10  flex gap-6 justify-center">
        <button
            className={`flex items-center gap-2 text-xl font-semibold py-3 px-8 rounded-2xl border-2 shadow-md transition duration-300 
            ${
                selected === "veg"
                ? "bg-green-600 text-white border-green-700 scale-105"
                : "bg-gray-100 text-green-700 border-green-400 hover:bg-green-100"
            }`}
            onClick={() => setSelected(selected === "veg" ? null : "veg")}
        >
            <span className="text-2xl">🌱</span> Veg
        </button>
        {/* Non-Veg Button */}
        <button
            className={`flex items-center gap-2 text-xl font-semibold py-3 px-8 rounded-2xl border-2 shadow-md transition duration-300 
            ${
                selected === "nonveg"
                ? "bg-red-600 text-white border-red-700 scale-105"
                : "bg-gray-100 text-red-600 border-red-400 hover:bg-red-100"
            }`}
            onClick={() => setSelected(selected === "nonveg" ? null : "nonveg")}
        >
            <span className="text-2xl">🍗</span> Non-Veg
        </button>
        </div>

        
        <div className="w-[60%] mx-auto mt-20">
            {
                RestData.map((menuitems)=><MenuCard key={menuitems?.card?.card?.title} menuItems={menuitems?.card?.card} foodselected={selected}></MenuCard>)
            } 
        </div>
        </>
    )
}