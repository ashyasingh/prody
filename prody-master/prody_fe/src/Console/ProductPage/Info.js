import React, { useContext } from 'react';

import Card from "../../componenets/Card";
import './Info.css';
import {ConsoleContext} from "../ConsoleContext";
import { useFetch } from "../../utils/Hook";
import Tag from "./Tag";
import Score from "./Score";
import { ReactComponent as ProductIcon } from '../../assets/my_products.svg';
import Loader from "../../componenets/Loader";
import authHeader from '../../utils/auth-header';
import {CONSTANTS} from '../../utils/constants';

const Info = () => {

    const { productContext, languageContext, setBrandContext } = useContext(ConsoleContext);
    const { data, loading} = useFetch({url:`${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_info/${productContext}`,
        header: authHeader(),
        method: 'GET',
        dep1: productContext});

    // console.log(`info - languageContext ${languageContext}`);

    const productPic = () => {
        if(!data.prod_image) {return <ProductIcon/>}
        else {return <img src={data.prod_image}  width="150" height="150"/>}
    };

    const countryPic = () => {
        if(!data.flag_image) {return null}
        else {return <img className='infoCountryImage' src={data.flag_image}  width="40" height="auto"/>}
    };

    const generalInfo = () => {
        if(loading)
            {return (<Loader/>)}
        if(languageContext === 'ENG') {
            setBrandContext(data.brand_id);
            return (
                <>
                    <div className='infoName'>{data.prod_desc_eng}</div>
                    <div>{data.quantity + ' ' + data.uom_eng}</div>
                    <div>{'Brand: ' + data.brand_eng}</div>
                    <div className='infoPic'>{productPic()}</div>
                    <hr className="Divider"/>
                    <div><span style={{'fontWeight':'bold'}}>Category: </span>{data.category_eng}</div>
                    <div><span style={{'fontWeight':'bold'}}>Category Group: </span>{data.category_group_eng}</div>
                    <div>
                        <span style={{'fontWeight':'bold'}}>Manuf Country: </span>
                        <span>{countryPic()}</span>
                        {data.manufacturing_country_eng}
                    </div>
                </>
            )
        }

        if(languageContext === 'HEB') {
            setBrandContext(data.brand_id);
            return (
                <div dir="rtl">
                    <div className='infoName'>{data.prod_desc_heb}</div>
                    <div>{data.quantity + ' ' + data.uom_heb}</div>
                    <div>{'מותג: ' + data.brand_heb }</div>
                    <div className='infoPic'>{productPic()}</div>
                    <hr className="Divider" />
                    <div><span style={{'fontWeight':'bold'}}>קטגוריה: </span>{data.category_heb}</div>
                    <div><span style={{'fontWeight':'bold'}}>קבוצה: </span>{data.category_group_heb}</div>
                    <div>
                        <span style={{'fontWeight':'bold'}}>ארץ ייצור: </span>
                        <span>{countryPic()}</span>
                        {data.manufacturing_country_heb}</div>
                </div>
            )
        }
    };

    return (
        <Card>
            <div className='infoContainer'>
                {generalInfo()}
                <div className='infoSpacer'/>
                <hr className="Divider" />
                <Tag/>
                <div className='infoSpacer'/>
                <hr className="Divider" />
                <Score/>
            </div>
        </Card>
    )
};

export default Info;