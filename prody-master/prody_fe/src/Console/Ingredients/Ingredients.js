import React, {useContext} from 'react';
import Iframe from 'react-iframe'

import getPowerBiURL from "../../utils/powerBiUrl";
import {ConsoleContext} from "../ConsoleContext";


const Ingredients = ( ) => {

    const { languageContext } = useContext(ConsoleContext);
    const link = getPowerBiURL(languageContext).ingredients;

       if (!link) {return <div>No Data Available yet</div>}
        else {
            return (
                <div className="ingredientsContainer" >
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

export default Ingredients;