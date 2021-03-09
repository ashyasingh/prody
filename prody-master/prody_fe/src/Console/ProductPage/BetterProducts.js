import React, {useContext} from 'react';

import './BetterProducts.css';
import {ConsoleContext} from "../ConsoleContext";
import { useFetch } from '../../utils/Hook';
import _ from "lodash";
import Table from "../../componenets/Table";
import NoData from "../../componenets/NoData";
import Loader from '../../componenets/Loader';
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const BetterProducts = () => {

    const { marketContext, productContext, languageContext } = useContext(ConsoleContext);
    const { data, loading} = useFetch({url:`${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_score_and_better_products/${marketContext}/${productContext}`,
        header: authHeader(),
        method: 'GET',
        dep1: productContext});

    const rowClickHandle = (barcode) => {
        window.open(`/productpage/ISR/${barcode}`, "_blank")
    };

    const title = () => {
      if (languageContext === 'ENG') {return <div style={{'fontWeight': 'bold'}}>Healthier Products</div>}
      else if (languageContext === 'HEB') {return <div style={{'fontWeight': 'bold'}}>מוצרים בריאים יותר</div>}
    };

    const rows = () => {
        if(!loading && languageContext === 'ENG') {
            const sortedData = _.sortBy(data, [
                (item) => {return -parseInt(item.better_score, 10)},
                (item) => {return item.better_brand_eng}]);
            return sortedData.map((row, index) => {
                    return (
                        <tr className="Table_row_clickable" key={index} onClick={()=>rowClickHandle(row.better_barcode)}>
                            <td>{row.better_desc_eng}</td>
                            <td>{row.better_quantity + ' ' + row.better_uom_eng} </td>
                            <td>{row.better_brand_eng}</td>
                            <td className="numeric_value">{row.better_score}</td>
                        </tr>

                    )})
        }
            else if(!loading && languageContext === 'HEB') {
                const sortedData = _.sortBy(data, [
                    (item) => {return -parseInt(item.better_score, 10)},
                    (item) => {return item.better_brand_heb}]);
                return sortedData.map((row, index) => {
                    return (
                        <tr className="Table_row_clickable" key={index} onClick={()=>rowClickHandle(row.better_barcode)}>
                            <td dir='rtl'>{row.better_desc_heb}</td>
                            <td dir='rtl'>{row.better_quantity + ' ' + row.better_uom_heb} </td>
                            <td dir='rtl'>{row.better_brand_heb}</td>
                            <td className="numeric_value">{row.better_score}</td>
                        </tr>

                    )})
            }
    };

    const tableHead = () => {
        if (languageContext === 'ENG') {
            return (
                <thead>
                <tr>
                    <th>Label</th>
                    <th>Quantity</th>
                    <th>Brand</th>
                    <th>Score</th>
                </tr>
                </thead>
            )
        } else if (languageContext === 'HEB') {
            return (
                <thead>
                <tr>
                    <th>שם</th>
                    <th>כמות</th>
                    <th>מותג</th>
                    <th>ציון</th>
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
        <div className='betterProductsContainer'>
            {title()}
            <div className='betterProductsContent'>{content()}</div>
        </div>
    )
};

export default BetterProducts;