import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

import './AdvertorialManagement.css';
import {useFetch} from "../../utils/Hook";
import SearchBar from "./SearchBar";
import {ConsoleContext} from "../ConsoleContext";
import Loader from "../../componenets/Loader";
import NoData from "../../componenets/NoData";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';


// adv1: slogan
// adv4: youtube
// adv2: facebook
// adv3: link

const AdvertorialManagement = () => {

        const { productContext, marketContext, languageContext } = useContext(ConsoleContext);
        const { data, loading} = useFetch(
            {
                    url: `${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_adv/${marketContext}/${productContext}`,
                    header: authHeader(),
                    method: 'GET',
                    dep1: productContext
            });

        const [ adv1, setAdv1 ] = useState('');
        const [ adv2, setAdv2 ] = useState('');
        const [ adv3, setAdv3 ] = useState('');
        const [ adv4, setAdv4 ] = useState('');

        // console.log(`adv1 ${adv1}`);

        useEffect(() => {
                if (!loading) {
                        setAdv1(data[0].advertorial1);
                        setAdv2(data[0].advertorial2);
                        setAdv3(data[0].advertorial3);
                        setAdv4(data[0].advertorial4);
                }
        },[data, loading]);

        const advPlaceholder = (adv) => {
                if (!productContext) {return ''}
                if(loading) {return 'loading..'}
                else if (!data[adv]) {return 'No data'}
        };

        const changeHandler = (event, setAdv) => {
                eval(setAdv(event.target.value))
        };

        const saveHandler = () => {
               // const {data, loading } = useFetch();
        };

        return (
            <div className='indexContainer'>
                    <div style={{'fontWeight':'bold'}}>Advertorial Management</div>
                    <SearchBar/>
                    <div className='inputsContainer'>
                            <div className="inputContainer">
                                    <div className='advManageInputTitle'>Slogan</div>
                                    <input
                                        type="text"
                                        name="adv1"
                                        placeholder={advPlaceholder('advertorial1')}
                                        onChange={(e) => changeHandler(e, setAdv1)}
                                        value={adv1}
                                    />
                            </div>
                            <div className="inputContainer">
                                    <div className='advManageInputTitle'>Facebook page</div>
                                    <input
                                        type="url"
                                        name="adv2"
                                        placeholder={advPlaceholder('advertorial2')}
                                        onChange={(e) => changeHandler(e, setAdv2)}
                                        value={adv2}
                                    />
                            </div>
                            <div className="inputContainer">
                                    <div className='advManageInputTitle'>Website</div>
                                    <input
                                        type="url"
                                        name="adv3"
                                        placeholder={advPlaceholder('advertorial3')}
                                        onChange={(e) => changeHandler(e, setAdv3)}
                                        value={adv3}
                                    />
                            </div>
                            <div className="inputContainer">
                                    <div className='advManageInputTitle'>YouTube</div>
                                    <input
                                        type="url"
                                        name="adv4"
                                        placeholder={advPlaceholder('advertorial4')}
                                        onChange={(e) => changeHandler(e, setAdv4)}
                                        value={adv4}
                                    />
                            </div>
                            <button disabled className='advManageInputButton' onClick={saveHandler}>Save</button>
                    </div>
            </div>
        )

};

export default AdvertorialManagement;