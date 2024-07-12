import ProductCard, {Product} from "../components/ProductCard.tsx";
import {productsApiSlice} from "../slices/productsApiSlice.ts";
import Spinner from "../shared/components/Spinner.tsx";
import Pagination from "../shared/components/Pagination.tsx";
import {useMemo, useState} from "react";
import {useParams} from "react-router-dom";

const HomePage = () => {

    const limit = 6
    const { page, search } = useParams()

    const [paginateResults, setPaginateResults] = useState(false)
    const [pages, setPages] = useState(0)

    const {data: products,
        isLoading,
        isError,
        isSuccess} = productsApiSlice.useGetProductsQuery()

    const paginatedProducts = useMemo(() => {
        let computed = products ? [...products] : []
        if (search && products) {
            computed = computed.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
        }
        if (computed.length / limit > 1) {
            setPaginateResults(true)
            setPages(Math.ceil(computed.length / limit))
        } else {
            setPaginateResults(false)
            setPages(1)
        }
        return computed.slice(
            (page ? (parseInt(page) - 1) * limit : 0),
            (page ? parseInt(page) * limit : limit)
        )
    }, [products, search, page])

    let content;

    if (isLoading) {
        content = <Spinner/>
    } else if (isError) {
        content = <p>An error occurred!</p>
    } else if (isSuccess) {
        if(paginatedProducts.length > 0) {
            content = <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                    {paginatedProducts.map((product: Product) => (
                        <ProductCard product={product} key={product.id}/>
                    ))}
                </div>
                {paginateResults && <Pagination pages={pages} page={page ? parseInt(page) : 1} search={search} />}
            </>
        } else {
            content = <div className="flex justify-center p-4 mt-5">
                <p className="text-white">No products found</p>
            </div>
        }
    }

                return <div className="p-4 mt-5">
        {content}
    </div>
};

export default HomePage;