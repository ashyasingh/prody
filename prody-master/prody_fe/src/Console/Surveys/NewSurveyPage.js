import React, { useContext , useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {ConsoleContext} from "../ConsoleContext";
//got these from Ingredients.js
import { useFetch } from '../../utils/Hook';
import NoData from "../../componenets/NoData";
import Loader from "../../componenets/Loader";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';
//
import SearchBar from './SearchBar';
import './NewSurveyPage.css';


 const NewSurveyPage = () => {

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
           <div className='NewSurveyPagePageSite'>
               <SearchBar/>
               {showCards()}
           </div>
   )

};

export default NewSurveyPage;