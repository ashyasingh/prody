import React, {useContext} from 'react';
import Iframe from 'react-iframe'

import {LoginContext} from "../../Login/LoginContext";
import getPowerBiURL from "../../utils/powerBiUrl";


const Old_Advertorials = () => {

    const { company } = useContext(LoginContext);
    const link = getPowerBiURL(company).advertorials;

    return (
        <div className="Advertorials" >
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
};

export default Old_Advertorials;