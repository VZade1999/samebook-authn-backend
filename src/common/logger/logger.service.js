"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppLogger_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const common_1 = require("@nestjs/common");
const logger_context_1 = require("./logger.context");
let AppLogger = AppLogger_1 = class AppLogger {
    constructor() {
        this.logger = new common_1.Logger(AppLogger_1.name);
    }
    forContext(service, operation, meta = {}) {
        const ctx = new logger_context_1.LogContext(service, operation, meta);
        return this._bind(ctx);
    }
    log(ctx, message, extra = {}) {
        this.logger.log(`${ctx.prefix(extra)} | ${message}`);
    }
    debug(ctx, message, extra = {}) {
        this.logger.debug(`${ctx.prefix(extra)} | ${message}`);
    }
    warn(ctx, message, extra = {}) {
        this.logger.warn(`${ctx.prefix(extra)} | ${message}`);
    }
    error(ctx, message, error, extra = {}) {
        const stack = error instanceof Error ? error.stack : String(error ?? '');
        this.logger.error(`${ctx.prefix(extra)} | ${message}`, stack);
    }
    verbose(ctx, message, extra = {}) {
        this.logger.verbose(`${ctx.prefix(extra)} | ${message}`);
    }
    _bind(ctx) {
        const self = this;
        return {
            requestId: ctx.requestId,
            info: (msg, extra) => self.log(ctx, msg, extra),
            debug: (msg, extra) => self.debug(ctx, msg, extra),
            warn: (msg, extra) => self.warn(ctx, msg, extra),
            verbose: (msg, extra) => self.verbose(ctx, msg, extra),
            error: (msg, err, extra) => self.error(ctx, msg, err, extra),
            enrich: (data) => self._bind(ctx.enrich(data)),
        };
    }
};
exports.AppLogger = AppLogger;
exports.AppLogger = AppLogger = AppLogger_1 = __decorate([
    (0, common_1.Injectable)()
], AppLogger);
//# sourceMappingURL=logger.service.js.map