import React, { useContext , useEffect} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom';
import {ConsoleContext} from "../ConsoleContext";
import SearchBar from './SearchBar';
//import NewSurveyPage from './NewSurveyPage';
import './Surveys.css';

    return (
            <div className='surveyPageSite'>
                <p>
                    This is the first page.
                    <br />
                    Click on the button below.
                </p>
                <Link to="/NewSurveyPage"><button>
                    Create a New Survey
                    </button>
                </Link>
            </div>
    )

export default Surveys;
