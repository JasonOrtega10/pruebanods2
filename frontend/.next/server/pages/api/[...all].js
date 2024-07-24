"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/[...all]";
exports.ids = ["pages/api/[...all]"];
exports.modules = {

/***/ "next-http-proxy-middleware":
/*!*********************************************!*\
  !*** external "next-http-proxy-middleware" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-http-proxy-middleware");

/***/ }),

/***/ "(api)/./src/pages/api/[...all].tsx":
/*!************************************!*\
  !*** ./src/pages/api/[...all].tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_http_proxy_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-http-proxy-middleware */ \"next-http-proxy-middleware\");\n/* harmony import */ var next_http_proxy_middleware__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_http_proxy_middleware__WEBPACK_IMPORTED_MODULE_0__);\n\nconst config = {\n    api: {\n        bodyParser: false,\n        externalResolver: true\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res)=>{\n    return next_http_proxy_middleware__WEBPACK_IMPORTED_MODULE_0___default()(req, res, {\n        headers: {\n            \"X-Forwarded-For\": req.socket.remoteAddress ?? \"\"\n        },\n        target: \"http://nodeny.me:8080\"\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL1suLi5hbGxdLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQzZEO0FBRXRELE1BQU1DLFNBQVM7SUFDcEJDLEtBQUs7UUFDSEMsWUFBWSxLQUFLO1FBQ2pCQyxrQkFBa0IsSUFBSTtJQUN4QjtBQUNGLEVBQUU7QUFFRixpRUFBZSxDQUFDQyxLQUFxQkMsTUFBeUI7SUFDNUQsT0FBT04saUVBQW1CQSxDQUFDSyxLQUFLQyxLQUFLO1FBQ25DQyxTQUFTO1lBQ1AsbUJBQW1CRixJQUFJRyxNQUFNLENBQUNDLGFBQWEsSUFBSTtRQUNqRDtRQUNBQyxRQUFRO0lBQ1Y7QUFDRixHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGluZ3Zpbi1zaGFyZS1mcm9udGVuZC8uL3NyYy9wYWdlcy9hcGkvWy4uLmFsbF0udHN4P2UxOWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgaHR0cFByb3h5TWlkZGxld2FyZSBmcm9tIFwibmV4dC1odHRwLXByb3h5LW1pZGRsZXdhcmVcIjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYm9keVBhcnNlcjogZmFsc2UsXG4gICAgZXh0ZXJuYWxSZXNvbHZlcjogdHJ1ZSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkgPT4ge1xuICByZXR1cm4gaHR0cFByb3h5TWlkZGxld2FyZShyZXEsIHJlcywge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiWC1Gb3J3YXJkZWQtRm9yXCI6IHJlcS5zb2NrZXQucmVtb3RlQWRkcmVzcyA/PyBcIlwiLFxuICAgIH0sXG4gICAgdGFyZ2V0OiBcImh0dHA6Ly9ub2RlbnkubWU6ODA4MFwiLFxuICB9KTtcbn07XG4iXSwibmFtZXMiOlsiaHR0cFByb3h5TWlkZGxld2FyZSIsImNvbmZpZyIsImFwaSIsImJvZHlQYXJzZXIiLCJleHRlcm5hbFJlc29sdmVyIiwicmVxIiwicmVzIiwiaGVhZGVycyIsInNvY2tldCIsInJlbW90ZUFkZHJlc3MiLCJ0YXJnZXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/[...all].tsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/[...all].tsx"));
module.exports = __webpack_exports__;

})();