import React, { useContext , useEffect, useState} from 'react';
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
   /*
    const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
    &:disabled {
        color: grey;
        opacity: 0.7;
        cursor: default;
    }
    `;*/
    function sayHello() {
        alert('hi');
    }
    function submit() {
        alert('Submitted!');
        }
  
   return (
           <div className='NewSurveyPagePageSite'>
               <SearchBar/>
               {showCards()}
               <button onClick={sayHello}>
                    Add a new question!
               </button>

               <button onClick={submit}>
                    Submit survey!
               </button>
           </div>
   )

};

export default NewSurveyPage;