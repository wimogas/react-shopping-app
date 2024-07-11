import {Link} from "react-router-dom";
import './CartProductItem.css'
import {CartProduct, removeFromCart, updateProductQuantity} from "../slices/cartSlice.ts";
import {useAppDispatch} from "../store.ts";
import {useState} from "react";

type ProductTypes = {
    product: CartProduct
}

const CartProductItem = ({ product }: ProductTypes) => {

    const dispatch = useAppDispatch()

    const [qty, setQty] = useState<number>(product.quantity);

    const handleChangeQty = (val: number) => {
        if (val > 0) {
            setQty(val);
        } else {
            setQty(1)
        }
        dispatch(updateProductQuantity({
            id: product.product.id,
            qty: val
        }))
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.product.id))
    }

    const trimmedTitle = product.product.title.length > 15 ? product.product.title.slice(0, 15) + ' ...' : product.product.title

    return (
        <div className="flex flex-row items-center justify-between">
            <Link to={`/products/${product.product.id}`}>
                <div className="cart-product-image" style={{
                    backgroundImage: 'url(' + product.product.image + ')'
                }}></div>
            </Link>
            <div>
                <Link to={`/products/${product.product.id}`}>
                    <div className="text-white font-bold text-md mb-2">{trimmedTitle}</div>
                </Link>
            </div>
            <input
                className="max-w-16 px-4 py-2 bg-gray-700 rounded text-white"
                type="number"
                placeholder="Quantity"
                value={qty}
                onChange={(e) => handleChangeQty(parseInt(e.target.value))}
            />
            <span className="text-md font-semibold text-white">
              {(product.product.price * product.quantity).toFixed(2)} €
            </span>
            <button
                onClick={handleRemoveFromCart}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Remove
            </button>
        </div>
    );
};

export default CartProductItem;