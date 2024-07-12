import React, {useMemo, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store.ts";

const Header = () => {

    const navigate = useNavigate()

    const [search, setSearch] = useState("");

    const { cartItems } = useAppSelector((state) => state.cart)

    const qty = useMemo(() => {
        if (cartItems.length > 0) {
            return cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
        } else {
            return 0
        }
    }, [cartItems])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            handleSubmitSearch()
        }
    }

    const handleSubmitSearch = () => {
        if (search.length > 0) {
            navigate( `/products/s/${search}`)
        } else {
            navigate( `/products`)
        }
    }

    const handleSearch = (s: string) => {
        setSearch(s)
    }

    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="p-4 flex items-center gap-5 justify-between">
                <div className="flex items-center space-x-4 text-2xl font-bold">
                    <NavLink to={'/'}>Shop</NavLink>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <input
                        className="w-full max-w-3xl px-4 py-2 bg-gray-700 rounded-l-md"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <button className="bg-gray-800 rounded-r-md py-2 px-4 hover:bg-gray-600"
                        onClick={handleSubmitSearch}
                    >Search</button>
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