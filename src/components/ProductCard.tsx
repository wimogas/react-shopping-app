import {Link} from "react-router-dom";
import './ProductCard.css'

export type Product = {
    id: number,
    title: string,
    description: string,
    category: string,
    image: string,
    rating: {rate: number},
    price: number
}

type ProductTypes = {
    product: Product
}

const ProductCard = ({ product }: ProductTypes) => {
    return (
        <div className="max-w-100 rounded overflow-hidden bg-gray-900">
            <Link to={`/products/${product.id}`}>
                <div className="products-list-product-image" style={{
                    backgroundImage: 'url(' + product.image + ')'
                }}></div>
            </Link>
            <div className="px-6 py-4">
                <Link to={`/products/${product.id}`}>
                    <div className="text-white font-bold text-xl mb-2">{product.title}</div>
                </Link>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <span className="text-md font-semibold text-white">
                  {product.price} €
                </span>
                <Link to={`/products/${product.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        View
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;