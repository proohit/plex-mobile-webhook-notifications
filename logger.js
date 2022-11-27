import winston from "winston";

const now = new Date();
const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json({ space: 2 }),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logs/${nowString}-logs.log`,
    }),
  ],
});

export default logger;
