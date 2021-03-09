import React from 'react';
import { ReactComponent as Drawer } from '../assets/drawer.svg';
import './NoData.css'

const NoData = () => {

    return (
        <div className="noDataCointainer">
            <Drawer/>
            <div>No data to show</div>
        </div>
    );
};

export default NoData;