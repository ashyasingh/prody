import React, {useContext} from 'react';
import _ from 'lodash';

import './Nutrition.css'
import {ConsoleContext} from "../ConsoleContext";
import { useFetch } from '../../utils/Hook';
import Table from "../../componenets/Table";
import NoData from "../../componenets/NoData";
import Ingredient from "./Ingredient";
import Loader from "../../componenets/Loader";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const Nutrition = () => {

    const { productContext, languageContext } = useContext(ConsoleContext);

    const { data, loading} = useFetch({url:`${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_nutrition/${productContext}`,
        header: authHeader(),
        method: 'GET',
        dep1: productContext});

    const title = () => {
        if(languageContext === 'ENG') {return (<div style={{'fontWeight': 'bold'}}>Nutrition</div>)}
        else if (languageContext === 'HEB') {return (<div style={{'fontWeight': 'bold'}}>ערכים תזונתיים</div>)}
    };

    const rows = () => {
        if(!loading) {
            if(languageContext === 'ENG') {
                const sortedData = _.sortBy(data, (data) => parseInt(data.order, 10));
                return sortedData.map((row, index) => {
                    return (
                        <tr className="table_row" key={index}>
                            <td>{row.desc_eng}</td>
                            <td>{row.uom_eng}</td>
                            <td className="numeric_value">{row.hundred_gram_value}</td>
                            <td className="numeric_value">{row.per_unit_value}</td>
                        </tr>
                    )
                })
            }
            else if (languageContext === 'HEB') {
                const sortedData = _.sortBy(data, (data) => parseInt(data.order, 10));
                return sortedData.map((row, index) => {
                    return (
                        <tr className="table_row" key={index}>
                            <td dir='rtl'>{row.desc_heb}</td>
                            <td dir='rtl'>{row.uom_heb}</td>
                            <td className="numeric_value">{row.hundred_gram_value}</td>
                            <td className="numeric_value">{row.per_unit_value}</td>
                        </tr>
                    )
                })
            }
        }
    };

    const tableHead = () => {
        if (languageContext === 'ENG') {
            return (
                <thead>
                <tr>
                    <th>Label</th>
                    <th>Unit Of Measure</th>
                    <th>Per 100 Gram</th>
                    <th>Per Unit</th>
                </tr>
                </thead>
            )
        }
        else if (languageContext === 'HEB') {
            return (
                <thead>
                <tr>
                    <th>שם</th>
                    <th>יחידת מידה</th>
                    <th>ל-100 גרם</th>
                    <th>ליחידה</th>
                </tr>
                </thead>
            )
        }
    };

    const content = () => {
        if(loading) {return (<Loader/>)}
        else if (!data.length) {return (<NoData/>)}
        else {
            return (
                <>
                    <Table>
                        <table>
                            {tableHead()}
                            <tbody>
                            {rows()}
                            </tbody>
                        </table>
                    </Table>
                </>
            )
        }
    };


    return (
        <div className='nutritionContainer'>
            <div className='nutritionTable'>
                {title()}
                <div className='nutritionContent'> {content()}</div>
            </div>
            <div className='nutritionIngredients'>
            <Ingredient/>
        </div>
        </div>
    )
};

export default Nutrition;

// TODO: add market to endpoint