import React, {useMemo, useState} from "react";

import {useNavigate} from "react-router-dom";
import {QueryObject} from "../../pages/HomePage.tsx";

type FilterTypes = {
    query: QueryObject,
    keyword: string,
    label: string,
    filters: string[]
}

const Filter = ({ query, keyword, label, filters } : FilterTypes) => {

    const navigate = useNavigate()

    const [selectedFilter, setSelectedFilter] = useState('')

    const queryStr = useMemo(() => {
        if( query) {
            return Object.entries(query).reduce((acc, cur) => {
                return acc + (cur[0] !== keyword ? cur[0] + '=' + cur[1] + '&' : '')
            }, '?')
        } else {
            return ''
        }
    }, [keyword, query])

    const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(e.target.value)
        console.log(queryStr)
        navigate({
            pathname: '/products/',
            search: `${queryStr}${keyword}=${e.target.value}`
        })
    }

    return (
        <div className="flex flex-col">
            <h2 className={"text-md mb-2 text-white"}>{label}</h2>
            <select
                className="px-4 py-2 bg-gray-700 rounded-md text-white mb-2"
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