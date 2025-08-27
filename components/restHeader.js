import { Link } from "react-router"
import { useSelector } from "react-redux"
import { ShoppingCart } from "lucide-react"  // cart icon

export default function RestHeader() {
    const counter = useSelector((state) => state.cartSlice.count)

    return (
        <div className="w-full bg-[#d56508] py-3 px-8 flex justify-between items-center shadow-md">
        <div>
            <img
            className="w-40 h-15 bg-cover ml-3 rounded-xl"
            src="https://sdmntpreastus.oaiusercontent.com/files/00000000-b6b0-61f9-b086-d9c694d57696/raw?se=2025-08-27T15%3A13%3A59Z&sp=r&sv=2024-08-04&sr=b&scid=820bbe4f-1cc6-5c61-8e70-c358f4c63037&skoid=02b7f7b5-29f8-416a-aeb6-99464748559d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-26T21%3A58%3A41Z&ske=2025-08-27T21%3A58%3A41Z&sks=b&skv=2024-08-04&sig=s8QAj1NfQXbctk/iOabwQtEuONs6rIUre9619/fhgNs%3D"
            alt="Swiggy Logo"
            />
        </div>
        <div className="flex items-center gap-6 text-white text-lg font-medium">
            <Link to="/checkout" className="relative flex items-center gap-2 hover:opacity-80">
            <ShoppingCart size={26} />
            <span>Cart</span>
            {counter > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-[#fc8019] font-bold text-sm rounded-full px-2 py-0.5 shadow">
                {counter}
                </span>
            )}
            </Link>

            {/* Sign In button */}
            <button className="bg-white text-[#fc8019] px-4 py-1 rounded-md font-semibold hover:bg-gray-200 transition">
            Sign In
            </button>
        </div>
        </div>
    )
}