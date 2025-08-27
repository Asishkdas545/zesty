import { useSelector } from "react-redux";

export default function Checkout() {
    const items = useSelector((state) => state.cartSlice.items) || [];

    // calculate total by checking defaultPrice OR price
    const total = items.reduce((acc, item) => {
        const itemPrice = (item.defaultPrice ?? item.price ?? 0) / 100; // usually Swiggy price is in paise
        return acc + itemPrice * (item.quantity);
    }, 0);

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            🛒 Checkout
        </h1>

        {items.length === 0 ? (
            <p className="text-center text-lg text-gray-600">Your cart is empty</p>
        ) : (
            <div className="space-y-4">
            {items.map((item, index) => {
                const itemPrice = (item.defaultPrice ?? item.price ?? 0) / 100;
                return (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Quantity: {item.quantity ?? 1}
                    </p>
                    </div>
                    <p className="text-lg font-bold text-gray-700">
                    ₹{itemPrice * (item.quantity ?? 1)}
                    </p>
                </div>
                );
            })}

            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-800">Total</h2>
                <p className="text-2xl font-bold text-green-600">₹{total}</p>
            </div>
            </div>
        )}
        </div>
    );
}