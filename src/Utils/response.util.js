"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRes = exports.failedRes = exports.successRes = void 0;
const successRes = (res, message, data, statusCode) => {
    return res.status(statusCode || 200).send({
        success: true,
        message: message || 'API Response completed',
        data: data || null,
    });
};
exports.successRes = successRes;
const failedRes = (res, message, statusCode) => {
    return res.status(statusCode || 500).send({
        success: false,
        message: message,
    });
};
exports.failedRes = failedRes;
const errorRes = (res, error, statusCode) => {
    return res.status(statusCode || 500).send({
        success: false,
        message: 'Something went wrong',
        error: error,
    });
};
exports.errorRes = errorRes;
//# sourceMappingURL=response.util.js.map