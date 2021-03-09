import React, {useContext, useEffect, useState} from 'react';

import { ConsoleContext } from '../ConsoleContext';
import './SearchBar.css'
import {useFetch} from "../../utils/Hook";
import Dropdown from "../../componenets/Dropdown";
import { useHistory } from "react-router-dom";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const SearchBar = () => {

    // const { marketContext, productContext, setProductContext} = useContext(ConsoleContext);
    const [brandFilter, setBrandFilter] = useState('a');
    const { data, loading } = useFetch({url: `${CONSTANTS.URL_PREFIX}://prody.me/api/brand_page_brand_dropdown/${brandFilter}`,
        header: authHeader(),
        method: 'GET',
        dep1: brandFilter});

    const brandArray = () => {
        if (!loading) {
            return data.map((item) => {
                return {value: item.id, displayValue: item.desc_eng}
            });
        } else {return ''}
    };

    // console.log(`searchBar: productContext: ${productContext} market: ${marketContext} productFilter: ${productFilter}`);
    // console.log('searchBar - product  ' + product);

    const history = useHistory();

    const updateURL = (brand) => {
        history.push(`/brandpage/${brand}`);
    };

    return (
        <div className="searchBarContainer">
            <div className="searchBar_dropdown">
            </div>
            <div className="searchBar_dropdown">
                <Dropdown
                    listArray={brandArray()}
                    title='Brand'
                    loading={loading}
                    // selectionValueHandler={setProductContext}
                    useDisplayValue={true}
                    filterHandler={setBrandFilter}
                    // defultValue={productContext}
                    updateURL={updateURL}/>
            </div>
        </div>
    );
};

export default SearchBar;