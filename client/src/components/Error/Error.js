import React from 'react';

const Error = ({ errors }) => {

    const rows = errors.map(error => (
        <div className="error">{error}</div>
    ))

    return (
        <div className="errors">
            {rows}
        </div>
    )
}

export default Error;