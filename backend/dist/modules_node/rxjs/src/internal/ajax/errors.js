"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjaxTimeoutError = exports.AjaxError = void 0;
const getXHRResponse_1 = require("./getXHRResponse");
const createErrorClass_1 = require("../util/createErrorClass");
exports.AjaxError = (0, createErrorClass_1.createErrorClass)((_super) => function AjaxErrorImpl(message, xhr, request) {
    this.message = message;
    this.name = 'AjaxError';
    this.xhr = xhr;
    this.request = request;
    this.status = xhr.status;
    this.responseType = xhr.responseType;
    let response;
    try {
        response = (0, getXHRResponse_1.getXHRResponse)(xhr);
    }
    catch (err) {
        response = xhr.responseText;
    }
    this.response = response;
});
exports.AjaxTimeoutError = (() => {
    function AjaxTimeoutErrorImpl(xhr, request) {
        exports.AjaxError.call(this, 'ajax timeout', xhr, request);
        this.name = 'AjaxTimeoutError';
        return this;
    }
    AjaxTimeoutErrorImpl.prototype = Object.create(exports.AjaxError.prototype);
    return AjaxTimeoutErrorImpl;
})();
//# sourceMappingURL=errors.js.map