"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantsService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const getEnv = () => process.env.NODE_ENV ?? 'local';
const getCookieConfig = () => {
    return {
        secure: getEnv() !== ConstantsService.NODE_ENV.LOCAL,
        httpOnly: true,
        expires: moment().add(1, 'h').toDate(),
    };
};
let ConstantsService = class ConstantsService {
};
exports.ConstantsService = ConstantsService;
ConstantsService.NODE_ENV = {
    LOCAL: 'local',
    DEV: 'dev',
    UAT: 'uat',
    PROD: 'prod',
};
ConstantsService.CORS = {
    ALLOWED_HEADERS: 'authorization,content-type',
    EXPOSED_HEADERS: 'token',
    METHODS: 'GET,POST,OPTIONS,PUT',
};
exports.ConstantsService = ConstantsService = __decorate([
    (0, common_1.Injectable)()
], ConstantsService);
//# sourceMappingURL=constants.service.js.map