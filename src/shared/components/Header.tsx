import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../store.ts";

const Header = () => {

    const [qty, setQty] = useState<number>(0);

    const { cartItems } = useAppSelector((state) => state.cart)

    useEffect(() => {
        if (cartItems.length > 0) {
            const totalQty = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
            setQty(totalQty)
        } else {
            setQty(0)
        }
    }, [cartItems])

    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="p-4 flex items-center gap-5 justify-between">
                <div className="flex items-center space-x-4 text-2xl font-bold">
                    <NavLink to={'/'}>Shop</NavLink>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <input className="w-full max-w-3xl px-4 py-2 bg-gray-700 rounded"
                       type="text"
                       placeholder="Search"/>
                </div>
                <div>
                    <NavLink to={'/cart'} className="hover:text-gray-400 flex items-center">
                        <span>Cart</span>
                        {qty > 0 &&
                            <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{qty}</span>
                        }
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;