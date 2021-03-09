import React, {useContext} from 'react';

import './Tag.css';
import {ConsoleContext} from "../ConsoleContext";
import { useFetch } from '../../utils/Hook';
import Card from "../../componenets/Card";
import NoData from "../../componenets/NoData";
import Loader from "../../componenets/Loader";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const Tag = () => {

    const { marketContext, productContext, languageContext } = useContext(ConsoleContext);
    const { data, loading} = useFetch({url:`${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_tag/${marketContext}/${productContext}`,
        header: authHeader(),
        method: 'GET',
        dep1: productContext});

    // console.log(`marketContext ${marketContext}, productContext ${productContext}`);

    const content = () => {
        if(loading) {return (<Loader/>)}
        else if (!data.length) {return (<NoData/>)}
        else if (languageContext === 'ENG') {
                const tags = [data[0].tag1_eng,data[0].tag2_eng,data[0].tag3_eng,data[0].tag4_eng].filter((tag) => {
                    return tag != null});
                return tags.map((tag, index)=>{return <div className='tag' key={index}>{tag}</div>})
        }
        else if (languageContext === 'HEB') {
                const tags = [data[0].tag1_heb,data[0].tag2_heb,data[0].tag3_heb,data[0].tag4_heb].filter((tag) => {
                    return tag != null});
                return tags.map((tag, index)=>{return <div className='tag' key={index}>{tag}</div>})
        }
    };

    const allContent = () => {
        if (languageContext === 'ENG') {
            return (
                <div className='tagContainerEng'>
                    <div style={{'fontWeight': 'bold', 'marginRight': '4px', 'marginBottom':'5px'}}>Tags</div>
                    <div className='tagContent'>{content()}</div>
                </div>)
        } else if  (languageContext === 'HEB') {
            return (


                <div className='tagContainerHeb'>
                    <div style={{'fontWeight': 'bold', 'marginLeft': '4px'}}>תגיות</div>
                    <div className='tagContent'>{content()}</div>
                </div>
            )
        }
    };

    return (
        <Card>
            {allContent()}
        </Card>
    )

};

export default Tag;