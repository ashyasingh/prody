import React, { useContext } from 'react';

// import './BrandProducts.css';
import {ConsoleContext} from "../ConsoleContext";
import { useFetch } from "../../utils/Hook";
import NoData from "../../componenets/NoData";
import Table from "../../componenets/Table";
import Loader from "../../componenets/Loader";
import authHeader from "../../utils/auth-header";
import _ from "lodash";
import {CONSTANTS} from '../../utils/constants';

const BrandProducts = () => {

    const { languageContext, marketContext, brandContext } = useContext(ConsoleContext);
    const { data, loading} = useFetch({url:`${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_brand_products/${marketContext}/${brandContext}`,
        header: authHeader(),
        method: 'GET',
        dep1: brandContext,
        dep2: marketContext});

    const rowClickHandle = (barcode) => {
        window.open(`/productpage/ISR/${barcode}`, "_blank")
    };

    const title = () => {
        if (languageContext === 'ENG') {return 'Brand Products'}
        else if (languageContext === 'HEB') {return 'מוצרי המותג'}
    };

    const rows = () => {
        if(!loading) {
            const sortedData = _.sortBy(data, [(item) => {return -item.barcode}]);
            return sortedData.map((row, index) => {
                if (languageContext === 'ENG') {
                return (
                    <tr className="Table_row_clickable" key={index} onClick={()=>{rowClickHandle(row.barcode)}}>
                        <td>{row.barcode}</td>
                        <td>{row.desc_eng}</td>
                        <td>{row.quantity + ' ' + row.uom_eng} </td>
                    </tr>

                )}
                else if (languageContext === 'HEB') {
                return (
                    <tr className="Table_row_clickable" key={index} onClick={()=>{rowClickHandle(row.barcode)}}>
                        <td>{row.barcode}</td>
                        <td dir='rtl'>{row.desc_heb}</td>
                        <td dir='rtl'>{row.quantity + ' ' + row.uom_heb} </td>
                    </tr>

                )}
            })
        }
    };

    const tableHead = () => {
        if (languageContext === 'ENG') {return (
            <thead>
            <tr>
                <th>Barcode</th>
                <th>Label</th>
                <th>Quantity</th>
            </tr>
            </thead>
        )}
        else if (languageContext === 'HEB') {return (
            <thead>
            <tr>
                <th>ברקוד</th>
                <th>שם</th>
                <th>כמות</th>
            </tr>
            </thead>
        )}
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
        <div className='brandProductsContainer'>
            <div style={{'fontWeight': 'bold'}}>{title()}</div>
            {content()}
        </div>
    )
};

export default BrandProducts;