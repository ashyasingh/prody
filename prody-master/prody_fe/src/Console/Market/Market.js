import React, {useContext} from 'react';
import Iframe from 'react-iframe'

import getPowerBiURL from "../../utils/powerBiUrl";
import {ConsoleContext} from "../ConsoleContext";


const Market = ( ) => {

    const { languageContext } = useContext(ConsoleContext);
    const link = getPowerBiURL(languageContext).market;

       if (!link) {return <div>No Data Available yet</div>}
        else {
            return (
                <div className="marketContainer" >
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

export default Market;