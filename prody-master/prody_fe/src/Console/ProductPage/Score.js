import React, {useContext} from 'react';

import './Score.css';
import {ConsoleContext} from "../ConsoleContext";
import { useFetch } from '../../utils/Hook';
import Card from "../../componenets/Card";
import BetterProducts from "./BetterProducts";
import NoData from "../../componenets/NoData";
import Loader from "../../componenets/Loader";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const Score = () => {

    const { marketContext, productContext, languageContext } = useContext(ConsoleContext);
    const { data, loading} = useFetch({url:`${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_score_and_better_products/${marketContext}/${productContext}`,
        header: authHeader(),
        method: 'GET',
        dep1: productContext});

    const content = () => {

        if(loading) {return (<Loader/>)}
        else if (!data.length) {return (<NoData/>)}
        else {
            let scoreClass = null;
            const score = data[0].score;
            if (score <= 3) {scoreClass='scoreRed score';}
            else if (score => 4 && score <= 7) {scoreClass='scoreOrange score';}
            else if (score => 8) {scoreClass='scoreGreen score';} else {scoreClass=null;}
            return  (
                <>
                    <div className={scoreClass}>{score}</div>
                    <div style={{'alignSelf':'flex-end', 'paddingBottom':'25px'}}>/ 10</div>
                </>
            )

        }
    };

    const title = () => {
        if (languageContext === 'ENG') {return (<div style={{'fontWeight':'bold', 'marginBottom':'20px'}}>Health Score</div>)}
        else if (languageContext === 'HEB') {return (<div style={{'fontWeight':'bold', 'marginBottom':'20px'}}>ציון בריאות</div>)}
    };

    return (
        <Card>
            <div className='scoreContainer'>
                {title()}
                <div className='scoreContent'>
                    {content()}
                </div>
            </div>
        </Card>
    )

};

export default Score;

// TODO: add "no data" logic

// <BetterProducts/>