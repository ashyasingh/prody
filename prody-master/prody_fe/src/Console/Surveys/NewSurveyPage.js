import React, { useContext , useEffect} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';
import {ConsoleContext} from "../ConsoleContext";
import SearchBar from './SearchBar';

function NewSurveyPage() {

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
                <p>Create a New Survey</p>
            </div>
    )

}

export default NewSurveyPage;