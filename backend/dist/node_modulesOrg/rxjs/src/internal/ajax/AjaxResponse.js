"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjaxResponse = void 0;
const getXHRResponse_1 = require("./getXHRResponse");
class AjaxResponse {
    constructor(originalEvent, xhr, request, type = 'download_load') {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.type = type;
        const { status, responseType } = xhr;
        this.status = status !== null && status !== void 0 ? status : 0;
        this.responseType = responseType !== null && responseType !== void 0 ? responseType : '';
        const allHeaders = xhr.getAllResponseHeaders();
        this.responseHeaders = allHeaders
            ?
                allHeaders.split('\n').reduce((headers, line) => {
                    const index = line.indexOf(': ');
                    headers[line.slice(0, index)] = line.slice(index + 2);
                    return headers;
                }, {})
            : {};
        this.response = (0, getXHRResponse_1.getXHRResponse)(xhr);
        const { loaded, total } = originalEvent;
        this.loaded = loaded;
        this.total = total;
    }
}
exports.AjaxResponse = AjaxResponse;
//# sourceMappingURL=AjaxResponse.js.map