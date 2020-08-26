
import React from 'react';
import { connect } from 'react-redux';

import './Alerts.css';

const Alerts = ({ alerts }) => {

    const rows = alerts.map(alert => (
        <div key={alert.id} className="alert">{alert.msg}</div>
    ))

    return (
        <div className='alerts'>
            {rows}
        </div>
    )
}


const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alerts);