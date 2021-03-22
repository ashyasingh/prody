import React, { useContext , useEffect} from 'react';
import {useHistory, useParams, NavLink} from 'react-router-dom';
import {ConsoleContext} from "../ConsoleContext";
import SearchBar from './SearchBar';
import './Surveys.css';

const Surveys = () => {
  
    const { categoryContext, surveyContext, setSurveyContext} = useContext(ConsoleContext);

    const history = useHistory();
    const params = useParams();


    useEffect(() => {
        if(surveyContext != params.survey) {return setSurveyContext(params.survey)}
        },
        [params]
    );

    const showCards = () => {
         // if (1 != 1) {
         if (!surveyContext || surveyContext == 'undefined') {
            return (null)
        } else {return (
            <div className='surveyPageCards'>
                <div className='surveyPageInfo'>
                </div>
                <div className='surveyPageMore'>
                </div>
            </div>
        )}
    };
    return (
            <div className='surveyPageSite'>
                <SearchBar/>
                {showCards()}


                <NavLink className="navLink" activeClassName="is-active" to="/newsurvey/">
                    <div className='navIcon'><MarketIcon/></div>
                    <div>Market</div>
                </NavLink>


                <a href="https://react.school" target="_blank">
                    <Button> Link Button </Button>
                </a>

            </div>
    )

};

export default Surveys;
