import {useAppDispatch, useAppSelector} from "../store.ts";
import {CartProduct, checkout} from "../slices/cartSlice.ts";
import {useNavigate} from "react-router-dom";
import CartProductItem from "../components/CartProductItem.tsx";


const CartPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {cartItems, total} = useAppSelector((state) => state.cart)

    const handleCheckout = () => {
        dispatch(checkout())
        navigate('/')
    }

    if (cartItems.length <= 0) {
        return <div className="flex justify-center p-4 mt-5">
            <p className="text-white">Cart is empty</p>
            </div>
            }

            return <div className="flex flex-row gap-5 p-4 mt-5 flex-wrap w-lvw md:flex-row md:flex-nowrap">
        <div className="flex flex-col grow gap-3">
            {cartItems.map((product: CartProduct) => (
                <CartProductItem product={product} />
            ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-5 border p-5 rounded border-gray-700 max-h-64 w-full md:w-64 md:min-w-64">
            <p className="text-white">Total: {total}</p>
            <button onClick={handleCheckout} className="bg-green-900 text-white font-bold py-2 px-4 rounded hover:bg-green-800">Checkout</button>
        </div>
    </div>
};

export default CartPage;