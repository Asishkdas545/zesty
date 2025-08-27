import { useEffect, useState } from "react";
import RestCard from "./restcard";
import Shimmer from "./shimmer";
export default function Restaurant() {
    const [RestData, setRestData] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch("http://localhost:5000/swiggy-list");
        const swiggyData = await response.json();
        // console.log(swiggyData);
        // Find the card that actually contains restaurants
        const restaurantCard = swiggyData?.data?.cards.find(
            (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        setRestData(
            restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
        );
        }

        fetchData();
    }, []);

  // console.log(RestData);
    if(RestData.length==0){ 
        return <Shimmer></Shimmer>
    }
    return (
        <div className="flex flex-wrap w-[80%] ml-45 mt-20 gap-5">
        <h1 className="w-full text-3xl font-bold font-sans mt-0 mb-10">Restaurants with online food delivery</h1>
        {
        RestData.map((restInfo) => (
            <RestCard key={restInfo.info.id} restInfo={restInfo}></RestCard>
        ))
        }
        </div>
    );
    }