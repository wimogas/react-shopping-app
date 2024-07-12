import {Link, useParams} from 'react-router-dom'
import ProductDetail from "../components/ProductDetail.tsx";
import {productsApiSlice} from "../slices/productsApiSlice.ts";
import Spinner from "../shared/components/Spinner.tsx";

const ProductPage = () => {
    const { id } = useParams()

    const {
        data: product,
        isLoading,
        isError,
        isSuccess
    } = productsApiSlice.useGetProductByIdQuery(id!)

    let content;

    if (isLoading) {
        content = <Spinner/>
    } else if (isError) {
        content = <p>An error occurred</p>
    } else if (isSuccess && product) {
        content = <ProductDetail product={product}/>
    } else {
        content = <div className="flex justify-center p-4 mt-5">
            <p className="text-white">Product not found</p>
        </div>
    }

    return <div className="mt-5 p-4">
        <Link to={'/products'}>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">
                Back
            </button>
        </Link>
        {content}
    </div>
};

export default ProductPage;