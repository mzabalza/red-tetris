import React from 'react';

const Error = ({ errors }) => {

    const rows = errors.map(error => (
        <div key={error.id} className="error">{error.msg}</div>
    ))

    return (
        <div className="errors">
            {rows}
        </div>
    )
}

export default Error;