import { LogMeta } from './logger.interface';
export declare class LogContext {
    readonly requestId: string;
    private readonly service;
    private readonly operation;
    private readonly meta;
    constructor(service: string, operation: string, meta?: LogMeta);
    prefix(extra?: LogMeta): string;
    enrich(data: LogMeta): LogContext;
}
