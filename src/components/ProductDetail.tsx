import {useState} from "react";
import './ProductDetail.css'
import {Product} from "./ProductCard.tsx";
import {addToCart, removeFromCart} from "../slices/cartSlice.ts";
import {useAppDispatch} from "../store.ts";

type ProductDetailTypes = {
    product: Product
}

const ProductDetail = ({ product }: ProductDetailTypes) => {

    const dispatch = useAppDispatch()

    const [qty, setQty] = useState<number>(1);

    const handleChangeQty = () => {
        setQty(qty ? qty + 1 : 1);
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            product,
            quantity: qty
        }))
    }

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id))
    }

    return (
        <div className="flex gap-5 flex-wrap md:flex-row md:flex-nowrap">
            <div className="products-detail-product-image" style={{
                backgroundImage: 'url(' + product.image + ')'
            }}></div>
            <div>
                <div className="text-white font-bold text-xl mb-2">{product.title}</div>
                <p className="text-white text-opacity-50 text-base">
                    {product.description}
                </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 border p-5 rounded border-gray-700 max-h-64 w-full md:w-64 md:min-w-64">
                <span className="text-md font-semibold text-white text-2xl">
                  {product.price} €
                </span>
                <input
                    className="max-w-32 px-4 py-2 bg-gray-700 rounded text-white"
                    type="number"
                    placeholder="Quantity"
                    value={qty}
                    onChange={handleChangeQty}
                />
                <button
                    onClick={handleAddToCart}
                    className="bg-green-900 text-white font-bold py-2 px-4 rounded hover:bg-green-800">
                    Add to cart
                </button>
                <button
                    onClick={handleRemoveFromCart}
                >
                    Remove from Cart
                </button>
            </div>

        </div>
    );
};

export default ProductDetail;