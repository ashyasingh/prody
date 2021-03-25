import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import { ConsoleContext } from './ConsoleContext';
import Nav from './Nav/Nav';
import Nutrition from './Nutrition/Nutrition';
import Market from './Market/Market';
import Ingredients from './Ingredients/Ingredients';
import ProductPage from './ProductPage/ProductPage';
import BrandPage from './BrandPage/BrandPage';
import Surveys from './Surveys/Surveys';
import AdvertorialManagement from './Advertorial/AdvertorialManagement';
import Contact from './Contact/Contact';
import './Console.css';
import NewSurveyPage from './Surveys/NewSurveyPage';


const Console = () => {

    const [productContext, setProductContext] = useState('');
    // const [productContext, setProductContext] = useState(props.match.params.product);

    const [marketContext, setMarketContext] = useState('ISR');
    const [marketDisplayContext, setMarketDisplayContext] = useState('Israel');

    const [brandContext, setBrandContext] = useState('');

    const [languageContext, setLanguageContext] = useState('ENG');
    const [languageDisplayContext, setLanguageDisplayContext] = useState('English');

    // console.log('console');
    // console.log(productContext);
    // console.log(params);

    return (
        <div className="consoleContainer">
            <ConsoleContext.Provider value={{
                productContext, setProductContext,

                marketContext, setMarketContext,
                marketDisplayContext, setMarketDisplayContext,

                brandContext, setBrandContext,

                languageContext, setLanguageContext,
                languageDisplayContext, setLanguageDisplayContext}}>
                <BrowserRouter>
                    <div className='consoleNav'><Nav/></div>
                    <div className="consoleMain">
                        <Switch>
                            <Route path="/productpage/:market?/:product?" component={ProductPage} />
                            <Route path="/brandpage/:market?/:brand?" component={BrandPage} />
                            <Route path="/market/" exact component={Market}/>
                            <Route path="/surveys/" exact component={Surveys}/>
                            <Route path="/newSurveyPage/" exact component={NewSurveyPage}/>
                            <Route path="/nutrition/" exact component={Nutrition}/>
                            <Route path="/ingredients/" exact component={Ingredients}/>
                            <Route path="/advertorial/:product?" exact component={AdvertorialManagement}/>
                            <Route path="/contact" exact component={Contact}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                </ConsoleContext.Provider>
            </div>
        );
};

export default Console;