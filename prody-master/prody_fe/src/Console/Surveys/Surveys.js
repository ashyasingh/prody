import React, {useContext} from 'react';
import Iframe from 'react-iframe'

import getPowerBiURL from "../../utils/powerBiUrl";
import {ConsoleContext} from "../ConsoleContext";


const Surveys = ( ) => {

    const { languageContext } = useContext(ConsoleContext);
    const link = getPowerBiURL(languageContext).surveys;

       if (!link) {return <div>No Data Available yet</div>}
        else {
            return (
                <div className="surveys" >
            <Iframe
                url = {link}
                width="1300px"
                height="700px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
            />
        </div>
            );
        }
};

export default Surveys;