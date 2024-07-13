import ProductCard, {Product} from "../components/ProductCard.tsx";
import {productsApiSlice} from "../slices/productsApiSlice.ts";
import Spinner from "../shared/components/Spinner.tsx";
import Pagination from "../shared/components/Pagination.tsx";
import {useMemo, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import Filter from "../shared/components/Filter.tsx";

const HomePage = () => {

    const { page, search } = useParams()
    const [searchParams] = useSearchParams()

    const [paginateResults, setPaginateResults] = useState(false)
    const [pages, setPages] = useState(0)
    const [limit] = useState(6)

    const {data: products,
        isLoading,
        isError,
        isSuccess} = productsApiSlice.useGetProductsQuery()

    const paginatedProducts = useMemo(() => {
        let computed = products ? [...products] : []
        if (search && products) {
            computed = computed.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
        }
        if (searchParams.get('cat') !== null) {
            const cat = searchParams.get('cat')!
            computed = computed.filter(product => product.category.toLowerCase() === cat.toLowerCase())
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
    }, [products, search, page, limit, searchParams])

    let content;

    if (isLoading) {
        content = <Spinner/>
    } else if (isError) {
        content = <p>An error occurred!</p>
    } else if (isSuccess) {
        if(paginatedProducts.length > 0) {
            content = <div className={"flex flex-row gap-5"}>
                <div>
                    <h2 className={"text-white text-3xl my-4 font-bold"}>Filters</h2>
                    <Filter k={'cat'} label={'Categories'} filters={['All', 'men\'s clothing', 'women\'s clothing', 'jewelery', 'electronics']}/>

                </div>
                <div>
                    <h2 className={"text-white text-3xl my-4 font-bold"}>Products ({paginatedProducts.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {paginatedProducts.map((product: Product) => (
                            <ProductCard product={product} key={product.id}/>
                        ))}
                    </div>
                    {paginateResults && <Pagination pages={pages} page={page ? parseInt(page) : 1} search={search} />}

                </div>
            </div>
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