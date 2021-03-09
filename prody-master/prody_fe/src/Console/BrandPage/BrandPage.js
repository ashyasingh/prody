import React from 'react';

import SearchBar from './SearchBar';

const BrandPage = () => {
    return (
        <SearchBar/>
    );
};

export default BrandPage;



/*

const logoImage = () => {
        if(loading) {return (<Loader/>)}
        else if (!data[0].logo_image) {return <NoData/>}
        else {return <img src={data[0].logo_image} width="150" height="auto"/>}
    };

 */