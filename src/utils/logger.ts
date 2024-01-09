import { createLogger, format, transports } from 'winston';

const logs = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.json(),
        format.prettyPrint(),
        format.colorize()
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ],
});

const logger = {
    info: (log: string) => logs.info(log),
    error: (log: string) => logs.error(log),
};

export default logger;
