"use strict";
(self["webpackChunksuretype_test"] = self["webpackChunksuretype_test"] || []).push([["src_client_components_Test_tsx"],{

/***/ "./src/client/components/Test.tsx":
/*!****************************************!*\
  !*** ./src/client/components/Test.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Row.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Col.js");


//const resource = fetchData("test");
var Test = function (_a) {
    var resource = _a.resource;
    var response = resource.read();
    response.errors.sort(function (a, b) { return a.row - b.row; });
    var scrollTo = function (position) {
        if (position) {
            var element = document.querySelector(".highlighter");
            var row = document.querySelector(".row_" + position);
            if (row !== null) {
                var headerOffset = 100;
                var rowPosition = row.offsetTop;
                var elementPosition = element.offsetTop;
                var offsetPosition = elementPosition + rowPosition - headerOffset;
                element.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
                var result_element = document.querySelector(".inputTextArea");
                // Get and set x and y
                result_element.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, response && !response.valid ? (response.errors.map(function (e, i) { return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "error-card", key: i, onClick: function (d) {
            scrollTo(e.row);
        } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["default"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], { className: "error-message", key: i + "_message" }, e.message),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], { xs: 1, className: "error-alert", key: i + "_alert" })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["default"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], { xs: 2, sm: 1, className: "error-title", key: i + "_path-title" }, "Path"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], { className: "error-path", key: i + "_path" }, e.instancePath)),
        e.row ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["default"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], { xs: 2, sm: 1, className: "error-title", key: i + "_row-title" }, "Row"),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], { className: "error-row", key: i + "_row" }, e.row))) : (""))); })) : response && response.valid ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "ok-card" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], { className: "ok-message" }, "No errors found!"))) : ("")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Test);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NsaWVudF9jb21wb25lbnRzX1Rlc3RfdHN4LmFwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx1QkFBdUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBbUIsQ0FBQyx1REFBYyw2RUFBNkUsUUFBUSwwREFBbUIsVUFBVTtBQUNoSztBQUNBLFdBQVc7QUFDWCxRQUFRLDBEQUFtQixDQUFDLHVEQUFHO0FBQy9CLFlBQVksMERBQW1CLENBQUMsdURBQUcsSUFBSSxpREFBaUQ7QUFDeEYsWUFBWSwwREFBbUIsQ0FBQyx1REFBRyxJQUFJLG9EQUFvRDtBQUMzRixRQUFRLDBEQUFtQixDQUFDLHVEQUFHO0FBQy9CLFlBQVksMERBQW1CLENBQUMsdURBQUcsSUFBSSxnRUFBZ0U7QUFDdkcsWUFBWSwwREFBbUIsQ0FBQyx1REFBRyxJQUFJLDJDQUEyQztBQUNsRixpQkFBaUIsMERBQW1CLENBQUMsdURBQUc7QUFDeEMsWUFBWSwwREFBbUIsQ0FBQyx1REFBRyxJQUFJLCtEQUErRDtBQUN0RyxZQUFZLDBEQUFtQixDQUFDLHVEQUFHLElBQUkseUNBQXlDLHNCQUFzQixtQ0FBbUMsMERBQW1CLFVBQVUsc0JBQXNCO0FBQzVMLFFBQVEsMERBQW1CLENBQUMsdURBQUcsSUFBSSx5QkFBeUI7QUFDNUQ7QUFDQSxpRUFBZSxJQUFJLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdXJldHlwZS10ZXN0Ly4vc3JjL2NsaWVudC9jb21wb25lbnRzL1Rlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJvdywgQ29sIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xuLy9jb25zdCByZXNvdXJjZSA9IGZldGNoRGF0YShcInRlc3RcIik7XG52YXIgVGVzdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciByZXNvdXJjZSA9IF9hLnJlc291cmNlO1xuICAgIHZhciByZXNwb25zZSA9IHJlc291cmNlLnJlYWQoKTtcbiAgICByZXNwb25zZS5lcnJvcnMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5yb3cgLSBiLnJvdzsgfSk7XG4gICAgdmFyIHNjcm9sbFRvID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhpZ2hsaWdodGVyXCIpO1xuICAgICAgICAgICAgdmFyIHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm93X1wiICsgcG9zaXRpb24pO1xuICAgICAgICAgICAgaWYgKHJvdyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBoZWFkZXJPZmZzZXQgPSAxMDA7XG4gICAgICAgICAgICAgICAgdmFyIHJvd1Bvc2l0aW9uID0gcm93Lm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFBvc2l0aW9uID0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldFBvc2l0aW9uID0gZWxlbWVudFBvc2l0aW9uICsgcm93UG9zaXRpb24gLSBoZWFkZXJPZmZzZXQ7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogb2Zmc2V0UG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRfZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXRUZXh0QXJlYVwiKTtcbiAgICAgICAgICAgICAgICAvLyBHZXQgYW5kIHNldCB4IGFuZCB5XG4gICAgICAgICAgICAgICAgcmVzdWx0X2VsZW1lbnQuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IG9mZnNldFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCByZXNwb25zZSAmJiAhcmVzcG9uc2UudmFsaWQgPyAocmVzcG9uc2UuZXJyb3JzLm1hcChmdW5jdGlvbiAoZSwgaSkgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZXJyb3ItY2FyZFwiLCBrZXk6IGksIG9uQ2xpY2s6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBzY3JvbGxUbyhlLnJvdyk7XG4gICAgICAgIH0gfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSb3csIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyBjbGFzc05hbWU6IFwiZXJyb3ItbWVzc2FnZVwiLCBrZXk6IGkgKyBcIl9tZXNzYWdlXCIgfSwgZS5tZXNzYWdlKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHhzOiAxLCBjbGFzc05hbWU6IFwiZXJyb3ItYWxlcnRcIiwga2V5OiBpICsgXCJfYWxlcnRcIiB9KSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2wsIHsgeHM6IDIsIHNtOiAxLCBjbGFzc05hbWU6IFwiZXJyb3ItdGl0bGVcIiwga2V5OiBpICsgXCJfcGF0aC10aXRsZVwiIH0sIFwiUGF0aFwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IGNsYXNzTmFtZTogXCJlcnJvci1wYXRoXCIsIGtleTogaSArIFwiX3BhdGhcIiB9LCBlLmluc3RhbmNlUGF0aCkpLFxuICAgICAgICBlLnJvdyA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFJvdywgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHhzOiAyLCBzbTogMSwgY2xhc3NOYW1lOiBcImVycm9yLXRpdGxlXCIsIGtleTogaSArIFwiX3Jvdy10aXRsZVwiIH0sIFwiUm93XCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2wsIHsgY2xhc3NOYW1lOiBcImVycm9yLXJvd1wiLCBrZXk6IGkgKyBcIl9yb3dcIiB9LCBlLnJvdykpKSA6IChcIlwiKSkpOyB9KSkgOiByZXNwb25zZSAmJiByZXNwb25zZS52YWxpZCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm9rLWNhcmRcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyBjbGFzc05hbWU6IFwib2stbWVzc2FnZVwiIH0sIFwiTm8gZXJyb3JzIGZvdW5kIVwiKSkpIDogKFwiXCIpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgVGVzdDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==