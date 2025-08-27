import { useSelector } from "react-redux"
import { addItems , incrementItems , decrementItems } from "../stored/cartSlicer";
import { useDispatch , useSelector } from "react-redux";
export default function RestInfo({restData}){
    const dispatch = useDispatch();
    const items = useSelector(state=>state.cartSlice.items);
    const element = items.find((item)=>item.id===restData.id);
    const count = element? element.quantity : 0;

    function handleAdditems(){
        dispatch(addItems(restData));
    }

    function handleIncrementItems(){
        dispatch(incrementItems(restData));
    }

    function handleDecrementItems(){
        dispatch(decrementItems(restData));
    }

    return (
        <>
        <div className="flex w-full justify-between mb-2 pb-2">
            <div className="w-[70%]">
            <p className="text-2xl text-gray-700 font-semibold mb-1">{restData?.name}</p>
            <p className="text-xl font-semibold mb-2">{"₹"+ ("defaultPrice" in restData ? restData?.defaultPrice/100:restData?.price/100)}</p>
            <div className="flex items-center gap-1">
            <svg
            className="w-4 h-4 fill-green-600"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M9.049 2.927c.3-.645 1.605-.645 1.905 0l1.525 3.78 4.173.605c.738.107 1.035 1.012.5 1.534l-3.016 2.942.712 4.15c.127.74-.651 1.299-1.305.95l-3.726-1.962-3.726 1.962c-.654.35-1.432-.21-1.305-.95l.712-4.15-3.016-2.942c-.535-.522-.238-1.427.5-1.534l4.173-.605L9.049 2.927z" />
            </svg>
        
            <span className="text-green-700">{restData?.ratings?.aggregatedRating?.rating}</span>
            <span>{"("+restData?.ratings?.aggregatedRating?.ratingCountV2+")"}</span>
            </div>
            <p className="mt-2">
                {restData?.description}
            </p>    
            </div>
            <div className="w-[20%] relative h-42">
                <img className="w-60 h-36 object-cover rounded-3xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+restData.imageId}></img>
                {
                (count==0)?(<button className="absolute bottom-1 left-11 rounded-xl text-2xl text-green-600 px-6 py-2 shadow-md border border-white bg-white" onClick={()=>handleAdditems()}>ADD</button>):(
                    <div className="absolute bottom-1 left-9 flex gap-3 text-2xl  text-green-600 px-6 py-2 shadow-md border border-white bg-white rounded-2xl">
                    <button onClick={()=>handleDecrementItems()}>-</button>
                    <span>{count}</span>
                    <button onClick={()=> handleIncrementItems()}>+</button>
                    </div>
                )
                }
            </div>
        </div>
        <hr className="mb-6 mt-2"></hr>
        </>

    )
}