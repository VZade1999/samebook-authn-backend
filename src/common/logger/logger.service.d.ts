import { LogContext } from './logger.context';
import { LogMeta } from './logger.interface';
export declare class AppLogger {
    private readonly logger;
    forContext(service: string, operation: string, meta?: LogMeta): {
        requestId: string;
        info: (msg: string, extra?: LogMeta) => void;
        debug: (msg: string, extra?: LogMeta) => void;
        warn: (msg: string, extra?: LogMeta) => void;
        verbose: (msg: string, extra?: LogMeta) => void;
        error: (msg: string, err?: unknown, extra?: LogMeta) => void;
        enrich: (data: LogMeta) => any;
    };
    log(ctx: LogContext, message: string, extra?: LogMeta): void;
    debug(ctx: LogContext, message: string, extra?: LogMeta): void;
    warn(ctx: LogContext, message: string, extra?: LogMeta): void;
    error(ctx: LogContext, message: string, error?: unknown, extra?: LogMeta): void;
    verbose(ctx: LogContext, message: string, extra?: LogMeta): void;
    private _bind;
}
