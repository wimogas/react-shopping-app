import {Link, useParams} from 'react-router-dom'
import ProductDetail from "../components/ProductDetail.tsx";
import {productsApiSlice} from "../slices/productsApiSlice.ts";
import Spinner from "../shared/components/Spinner.tsx";

const ProductPage = () => {
    const { id } = useParams()

    const {
        data: product,
        isLoading,
        isError
    } = productsApiSlice.useGetProductByIdQuery(id!)

    if (isError) {
        return <p>An error occurred</p>
    }

    return <div className="mt-5 p-4">
            <Link to={'/products'}>Products</Link>
            {isLoading ?
                <Spinner/> :
                product ?
                    <ProductDetail product={product}/> :
                    <p>Product not found</p>
            }
    </div>
};

export default ProductPage;