import React, {useContext, useEffect, useState} from 'react';

import { ConsoleContext } from '../ConsoleContext';
import './SearchBar.css'
import {useFetch} from "../../utils/Hook";
import Dropdown from "../../componenets/Dropdown";
import { useHistory } from "react-router-dom";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const SearchBar = () => {

    const { marketContext, productContext, setProductContext} = useContext(ConsoleContext);
    const [productFilter, setProductFilter] = useState('1');
    const { data, loading } = useFetch({url: `${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_product_dropdown/${marketContext}/${productFilter}`,
        header: authHeader(),
        method: 'GET',
        dep1: productFilter});

    const productsArray = () => {
        if (!loading) {
            return data.map((item) => {
                return {value: item.barcode, displayValue: item.barcode_desc_eng}
            });
        } else {return ''}
    };

    // console.log(`searchBar: productContext: ${productContext} market: ${marketContext} productFilter: ${productFilter}`);
    // console.log('searchBar - product  ' + product);

    const history = useHistory();

    const updateURL = (product) => {
        history.push(`/productpage/${marketContext}/${product}`);
    };

    return (
        <div className="searchBarContainer">
            <div className="searchBar_dropdown">
            </div>
            <div className="searchBar_dropdown">
                <Dropdown
                    listArray={productsArray()}
                    title='Product'
                    loading={loading}
                    selectionValueHandler={setProductContext}
                    useDisplayValue={false}
                    filterHandler={setProductFilter}
                    defultValue={productContext}
                    updateURL={updateURL}/>
            </div>
        </div>
    );
};

export default SearchBar;