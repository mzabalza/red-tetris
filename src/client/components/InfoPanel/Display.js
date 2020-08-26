import React from 'react';
import './Display.css';

const Display = ({ type, value }) => {

    return (
        <div className='display'>
            {`${type}: ${value}`}
        </div>
    )

};

export default Display;