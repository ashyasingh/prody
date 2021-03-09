import React, {useContext} from 'react';

import Card from "../../componenets/Card";
import './Advertorial.css'
import {ConsoleContext} from "../ConsoleContext";
import {useFetch} from "../../utils/Hook";
import Iframe from 'react-iframe';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg';
import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import NoData from "../../componenets/NoData";
import BrandProducts from "./BrandProducts";
import Loader from "../../componenets/Loader";
import authHeader from "../../utils/auth-header";
import {CONSTANTS} from '../../utils/constants';

const Advertorial = () => {

    const { productContext, marketContext, languageContext } = useContext(ConsoleContext);
    const { data, loading} = useFetch({url:`${CONSTANTS.URL_PREFIX}://prody.me/api/product_page_adv/${marketContext}/${productContext}`,
        header: authHeader(),
        method: 'GET',
        dep1: productContext});

    const getAdv1 = () => {
        if(loading) {return (<Loader/>)}
        else if (!data.length || !data[0]['advertorial1']) {return (<NoData/>)}
        else {return data[0]['advertorial1']}
    };

    const getAdv2 = () => {
        if(loading) {return (<Loader/>)}
        else if (!data.length || !data[0]['advertorial2']) {return ''}
        else {return (<a href={'https://www.facebook.com/' + data[0]['advertorial2']} target="_blank"><FacebookIcon/></a>)}
    };

    const getAdv3 = () => {
        if(loading) {return (<Loader/>)}
        else if (!data.length || !data[0]['advertorial3']) {return ''}
        else {return (<a href={data[0]['advertorial3']} target="_blank"><LinkIcon/></a>)}
    };

    const getAdv4 = () => {
        if(loading) {return (<Loader/>)}
        else if (!data.length || !data[0]['advertorial4']) {return (<NoData/>)}
        else {return (
            <Iframe
                        url = {data[0]['advertorial4']}
                        width="250px"
                        height="150px"
                        id="myId"
                        display="initial"
                        position="relative"
                    />
        )}
    };

    const logoImage = () => {
        if(loading) {return (<Loader/>)}
        else if (!data[0].logo_image) {return <NoData/>}
        else {return <img src={data[0].logo_image} width="150" height="auto"/>}
    };

    // adv1: slogan
    // adv4: youtube
    // adv2: facebook
    // adv3: link

    const title = () => {
        if (languageContext === 'ENG') {return 'Advertorials'}
        else if (languageContext === 'HEB') {return 'חומרים פרסומיים'}
    };

    return (
        <Card>
            <div className='advertorialContainer'>
                <div style={{'fontWeight': 'bold'}}>{title()}</div>
                <div className='advContainer0'>
                    <div className='advContainer1'>
                        <div className='advContainer2'>
                            <div className='advLogo'>
                                <div>Logo</div>
                                {logoImage()}
                            </div>
                            <div className='adv1'>
                                <div>Slogan</div>
                                {getAdv1()}
                            </div>
                            <div className='advLinks'>
                                <div className='adv2'>
                                    {getAdv2()}
                                </div>
                                <div className='adv3'>
                                    {getAdv3()}
                                </div>
                            </div>
                        </div>
                        <div className='adv4'>
                            <div>Video</div>
                            {getAdv4()}
                        </div>
                    </div>
                    <div><BrandProducts/></div>
                </div>
            </div>
        </Card>
    )

};

export default Advertorial;