"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogContext = void 0;
const uuid_1 = require("uuid");
class LogContext {
    constructor(service, operation, meta = {}) {
        this.service = service;
        this.operation = operation;
        this.requestId = meta.requestId ?? (0, uuid_1.v4)();
        this.meta = { ...meta, requestId: this.requestId };
    }
    prefix(extra = {}) {
        const merged = { ...this.meta, ...extra };
        const pairs = Object.entries(merged)
            .filter(([, v]) => v !== undefined && v !== null && v !== '')
            .map(([k, v]) => `${k}=${v}`)
            .join(' ');
        return `[${this.service}.${this.operation}] ${pairs}`;
    }
    enrich(data) {
        return new LogContext(this.service, this.operation, {
            ...this.meta,
            ...data,
        });
    }
}
exports.LogContext = LogContext;
//# sourceMappingURL=logger.context.js.map