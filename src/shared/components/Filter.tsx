import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

type FilterTypes = {
    k: string,
    label: string,
    filters: string[]
}

const Filter = ({ k, label, filters } : FilterTypes) => {

    const navigate = useNavigate()

    const [selectedFilter, setSelectedFilter] = useState(filters[0])

    const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(e.target.value)
        if (e.target.value === 'All') {
            navigate('/products/')
        } else {
            navigate({
                pathname: '/products/',
                search: `${k}=${e.target.value}`
            })
        }
    }
    return (
        <div className="flex flex-col">
            <h2 className={"text-md mb-2 text-white"}>{label}</h2>
            <select
                className="px-4 py-2 bg-gray-700 rounded-md text-white"
                onChange={(e) => handleChangeFilter(e)}
                value={selectedFilter}
            >
                {filters.map(filter => <option
                    key={filter}
                    value={filter}
                >{filter}</option>)}
            </select>
        </div>

    );
};

export default Filter;