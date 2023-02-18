import { LogLevels } from './log-levels.enum';

export class Logger{
  readonly boundClass: string

  constructor(boundClass: string) {
    this.boundClass = boundClass;
  }

  info = (message: string) => {
    console.info(this.formatLog(message, LogLevels.INFO));
  }

  warn = (message: string) => {
    console.warn(this.formatLog(message, LogLevels.WARN));
  }

  error = (message: string) => {
    console.error(this.formatLog(message, LogLevels.ERROR));
  }

  private formatLog = (message: string, logLevel: LogLevels): string => {
    return `${logLevel}: ${this.boundClass} - ${new Date().toLocaleString('de-DE')}: ${message}`
  }
}
