import React, {useContext, useEffect, useState} from 'react';

import { ConsoleContext } from '../ConsoleContext';
import './SearchBar.css'
import {useFetch} from "../../utils/Hook";
import Dropdown from "../../componenets/Dropdown";
import { useHistory } from "react-router-dom";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const SearchBar = () => {

    const { categoryContext, surveyContext, setSurveyContext} = useContext(ConsoleContext);
    const [surveyFilter, setSurveyFilter] = useState('1');
    const { data, loading } = useFetch({url: `${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_product_dropdown/${categoryContext}/${surveyFilter}`,
        header: authHeader(),
        method: 'GET',
        dep1: surveyFilter});

    const surveysArray = () => {
        if (!loading) {
            return data.map((item) => {
                return {value: item.barcode, displayValue: item.barcode_desc_eng}
            });
        } else {return ''}
    };

    // console.log(`searchBar: productContext: ${productContext} market: ${marketContext} productFilter: ${productFilter}`);
    // console.log('searchBar - product  ' + product);

    const history = useHistory();

    const updateURL = (survey) => {
        history.push(`/productpage/${categoryContext}/${survey}`);
    };

    return (
        <div className="searchBarContainer">
            <div className="searchBar_dropdown">
            </div>
            <div className="searchBar_dropdown">
                <Dropdown
                    listArray={surveysArray()}
                    title='Surveys'
                    loading={loading}
                    selectionValueHandler={setSurveyContext}
                    useDisplayValue={false}
                    filterHandler={setSurveyFilter}
                    defultValue={surveyContext}
                    updateURL={updateURL}/>
            </div>
        </div>
    );
};

export default SearchBar;