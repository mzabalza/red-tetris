const { format } = require('winston');

const { createLogger, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

///////////////////////////////////////////////////////
// trasnport: carries data from app to file or db
const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: combine(timestamp(), format.json())
        })
    ]
});

module.exports = logger;