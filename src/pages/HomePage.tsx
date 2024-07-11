import ProductCard, {Product} from "../components/ProductCard.tsx";
import {productsApiSlice} from "../slices/productsApiSlice.ts";
import Spinner from "../shared/components/Spinner.tsx";


const HomePage = () => {

    const {data: products,
        isLoading,
        isError} = productsApiSlice.useGetProductsQuery()

    if (isError) {
        return <p>An error ocurred!</p>
    }

    return <div className="p-4 mt-5">
            {isLoading ?
                <Spinner/> :
                products ?
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                    {products.map((product: Product) => (
                        <ProductCard product={product} key={product.id}/>
                    ))}
                </div> :
                <p>No products found</p>
            }
    </div>

};

export default HomePage;