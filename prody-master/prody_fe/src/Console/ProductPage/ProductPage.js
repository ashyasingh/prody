import React, { useContext , useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {ConsoleContext} from "../ConsoleContext";

import './ProductPage.css';
import SearchBar from './SearchBar';
import Info from './Info';
import Nutrition from './Nutrition';
import Tag from './Tag';
import BetterProducts from './BetterProducts';
import Advertorial from './Advertorial';

const ProductPage = () => {

    const { productContext, setProductContext } = useContext(ConsoleContext);

    const history = useHistory();
    const params = useParams();

    useEffect(() => {
            return setProductContext(params.product);
                    }
        ,[]
    );

    useEffect(() => {
        if(productContext != params.product) {return setProductContext(params.product)}
        },
        [params]
    );

    const showCards = () => {
         // if (1 != 1) {
         if (!productContext || productContext == 'undefined') {
            return (null)
        } else {return (
            <div className='productPageCards'>
                <div className='productPageInfo'>
                    <Info/>
                </div>
                <div className='productPageMore'>
                    <Nutrition/>
                    <BetterProducts/>
                    <Advertorial/>
                </div>
            </div>
        )}
    };


    return (
            <div className='productPageSite'>
                <SearchBar/>
                {showCards()}
            </div>
    )
};

export default ProductPage;

// TODO: share by mail or whatsapp

