import { createLogger, format, transports } from "winston";
import winstonDaily from "winston-daily-rotate-file";
import mt from "moment-timezone";

const { combine, printf, colorize } = format;

mt.tz.setDefault("Asia/Seoul");
const koreaTimestamp = format((info) => {
  info.timestamp = mt().format("YYYY-MM-DD HH:mm:ss");
  return info;
});

const logDir = process.env.LOG_DIR || "logs";

const level = () => {
  return process.env.NODE_ENV !== "production" ? "debug" : "warn";
};

const logFormat = printf((info) => {
  return `[${info.timestamp}] [${info.level}] ${info.message}`;
});

const Logger = createLogger({
  level: level(),
  format: combine(koreaTimestamp(), logFormat),
  transports: [
    // http 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "http",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

const consoleFormat = () => logFormat;
Logger.add(
  new transports.Console({
    format: combine(koreaTimestamp(), colorize(), consoleFormat()),
  })
);

export default Logger;
