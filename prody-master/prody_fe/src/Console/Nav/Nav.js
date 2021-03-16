import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';
import Dropdown from "../../componenets/Dropdown";
import {ConsoleContext} from "../ConsoleContext";

import { ReactComponent as MarketIcon } from '../../assets/market.svg';
import { ReactComponent as TubeIcon } from '../../assets/tube.svg';
import { ReactComponent as ListIcon } from '../../assets/list.svg';
import { ReactComponent as MarketingIcon } from '../../assets/marketing.svg';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as BrandIcon } from '../../assets/brand.svg';
import {ReactComponent as SurveyIcon} from '../../assets/list.svg';

// import { LoginContext } from '../Login/LoginContext';

const Nav = () => {

    // const { company } = useContext(LoginContext);

    const { setLanguageContext,
        languageDisplayContext, setLanguageDisplayContext,
        marketContext, setMarketContext,
        marketDisplayContext, setMarketDisplayContext,
        productContext } = useContext(ConsoleContext);

    const logout = () => {
        localStorage.removeItem("user");
        window.location.href='/login';
    };

    const marketArray = [{value: 'ISR', displayValue: 'Israel'}];
    const languageArray = [{value: 'ENG', displayValue: 'English'},
                            {value: 'HEB', displayValue: 'Hebrew'}];

    // console.log(`nav - languageDisplayContext ${languageDisplayContext}`);
    // console.log(`nav - languageContext ${languageContext}`);
    // console.log(`nav - marketDisplayContext ${marketDisplayContext}`);
    // console.log(`nav - marketContext ${marketContext}`);

    return (
        <div className="navContainer">
            <img className="nav-logo" src={window.location.origin + '/logo.png'} alt={"Prody"} height="auto" width="80"/>

            <NavLink className="navLink" activeClassName="is-active" to="/market/">
                <div className='navIcon'><MarketIcon/></div>
                <div>Market</div>
            </NavLink>
            <NavLink className="navLink" activeClassName="is-active" to="/ingredients/">
                <div className='navIcon'><ListIcon/></div>
                <div>Ingredients</div>
            </NavLink>
            <NavLink className="navLink" activeClassName="is-active" to="/nutrition/">
                <div className='navIcon'><TubeIcon/></div>
                <div>Nutrition</div>
            </NavLink>
            <NavLink className="navLink" activeClassName="is-active" to={`/productpage/${marketContext}/${productContext}`}>
                <div className='navIcon'><SearchIcon/></div>
                <div>Product Page</div>
            </NavLink>
            <NavLink className="navLink" activeClassName="is-active" to="/advertorial/">
                <div className='navIcon'><MarketingIcon/></div>
                <div>Advertorial</div>
            </NavLink>
            <NavLink className="navLink" activeClassName="is-active" to="/brandpage/">
                <div className='navIcon'><BrandIcon/></div>
                <div>Brand Page</div>
            </NavLink>
            <NavLink className="navLink" activeClassName="is-active" to="/surveys/">
                <div className='navIcon'><SurveyIcon/></div>
                <div>Surveys</div>
            </NavLink>
            <div className='navSpacer'/>
            <Dropdown
                listArray={marketArray}
                title='Market'
                loading={false}
                selectionValueHandler={setMarketContext}
                selectionDisplayValueHandler={setMarketDisplayContext}
                useDisplayValue={true}
                defultValue={marketDisplayContext}/>
            <div style={{"height": "10px"}}/>
                <Dropdown
                listArray={languageArray}
                title='Language'
                loading={false}
                selectionValueHandler={setLanguageContext}
                selectionDisplayValueHandler={setLanguageDisplayContext}
                useDisplayValue={true}
                defultValue={languageDisplayContext}/>
            { /*<div className="nav-company">{'Welcome ' + company}</div> */}
            <button className="navLogout" onClick={logout}>Logout</button>
            <NavLink className="navLink" activeClassName="is-active" to="/contact">Contact</NavLink>
        </div>
    );
};

export default Nav;