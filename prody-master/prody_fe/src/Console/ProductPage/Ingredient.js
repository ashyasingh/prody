import React, {useContext} from 'react';

import './Ingredient.css';
import {ConsoleContext} from "../ConsoleContext";
import { useFetch } from '../../utils/Hook';
import _ from "lodash";
import NoData from "../../componenets/NoData";
import Loader from "../../componenets/Loader";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const Ingredient = () => {

    const { productContext, languageContext } = useContext(ConsoleContext);
    const { data, loading} = useFetch({url:`${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_ingredients/${productContext}`,
        header: authHeader(),
        method:'GET',
        dep1:productContext});

    const title = () => {
        if (languageContext === 'ENG') {return <div style={{'fontWeight': 'bold'}}>Ingredients</div>}
        else if (languageContext === 'HEB') {return <div style={{'fontWeight': 'bold'}}>רכיבים</div>}
    };

    const content = () => {
        if(loading) {return (<Loader/>)}
        else if (!data.length) {return (<NoData/>)}
        else {
            const sortedData = _.sortBy(data[0].ingredients, (data) => parseInt(data.line_order, 10));
            return sortedData.map((ingredient, index) => {
                if (languageContext === 'ENG') {
                    return (
                        <div key={index} className='ingredientEng'>{ingredient.desc_eng}
                            <span
                                className={ingredient.details_eng ? 'tooltiptext' : 'notooltip'}>{ingredient.details_eng}</span>
                        </div>)
                }
                else if (languageContext === 'HEB') {
                return (
                        <div key={index} className='ingredientHeb'>{ingredient.desc_heb}
                            <span
                                className={ingredient.details_heb ? 'tooltiptext' : 'notooltip'}>{ingredient.details_heb}</span>
                        </div>)
            }
            })
        }
    };

    const containerClass = () => {
        if(languageContext === 'ENG') {return 'ingredientContainerEng'}
        else if (languageContext === 'HEB') {return 'ingredientContainerHeb'}
    };

    return (
        <div className={containerClass()}>
            {title()}
            <div className='ingredientContent'>
                {content()}
            </div>
        </div>
    )
};

export default Ingredient;

// TODO: add market to endpoint
// TODO: add link if there is