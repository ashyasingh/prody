import React from 'react';

import './Table.css'

const Table = (props) => {
    return (
            <div className="Table">
            {props.children}
            </div>
        )

};

export default Table;