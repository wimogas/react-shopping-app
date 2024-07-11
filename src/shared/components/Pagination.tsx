import {Link} from "react-router-dom";

type PaginationTypes = {
    limit: number,
    page: number,
    pages: number
}

const Pagination = ({limit, page, pages} : PaginationTypes) => {

    const len = Math.ceil(pages / limit)

    return (
        <div className="flex items-center justify-center mt-6 space-x-2">
            <Link to={`/products/page/${page - 1}`}>
                <button disabled={(page - 1) <= 0} className={`px-4 py-2 rounded-md  ${
                    (page - 1) <= 0 ? 'bg-gray-900 text-gray-500'
                        : 'bg-gray-700 text-white hover:bg-blue-500'}`}>
                    Previous
                </button>
            </Link>
            { Array.from({length: len}).map((_, i) =>
                <Link key={i} to={`/products/page/${i + 1}`}>
                    <button disabled={page === i + 1} className={`px-4 py-2 rounded-md ${
                        page === i + 1
                            ? 'bg-gray-900 text-gray-500'
                            : 'bg-gray-700 text-white hover:bg-blue-500'
                    }`}>{i + 1}</button>
                </Link>
            )}
            <Link to={`/products/page/${page + 1}`}>
                <button disabled={(page + 1) > len} className={`px-4 py-2 rounded-md ${
                    (page + 1) > len? 'bg-gray-900 text-gray-500'
                    : 'bg-gray-700 text-white hover:bg-blue-500'}`}>
                    Next
                </button>
            </Link>
        </div>
    );
};

export default Pagination;