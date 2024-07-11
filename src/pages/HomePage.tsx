import ProductCard, {Product} from "../components/ProductCard.tsx";
import {productsApiSlice} from "../slices/productsApiSlice.ts";
import Spinner from "../shared/components/Spinner.tsx";
import Pagination from "../shared/components/Pagination.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const HomePage = () => {

    const limit = 6

    const { page } = useParams()

    const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);

    const {data: products,
        isLoading,
        isError} = productsApiSlice.useGetProductsQuery()

    useEffect(() => {
        if (products) {
            setPaginatedProducts(products.slice(
                page ? (limit * (parseInt(page) - 1)) : 0,
                page ? (limit * (parseInt(page) - 1) + limit) : limit))
        }
    }, [products, page]);

    if (isError) {
        return <p>An error ocurred!</p>
    }

    return <div className="p-4 mt-5">
            {isLoading ?
                <Spinner/> :
                products && paginatedProducts ?
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                            {paginatedProducts.map((product: Product) => (
                                <ProductCard product={product} key={product.id}/>
                            ))}
                        </div>
                        <Pagination pages={products.length} page={page ? parseInt(page) : 1} limit={limit}/>
                    </>
                    :
                    <p>No products found</p>
            }
    </div>
};

export default HomePage;