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
    var _b;
    var resource = _a.resource;
    var response = resource ? resource.read() : "";
    (_b = response.errors) === null || _b === void 0 ? void 0 : _b.sort(function (a, b) { return a.row - b.row; });
    var scrollTo = function (position) {
        if (position) {
            var element = document.querySelector(".highlighter");
            var row = document.querySelector(".row_" + position);
            if (row !== null) {
                var headerOffset = 100;
                var rowPosition = row === null || row === void 0 ? void 0 : row.offsetTop;
                var elementPosition = element === null || element === void 0 ? void 0 : element.offsetTop;
                var offsetPosition = elementPosition + rowPosition - headerOffset;
                element === null || element === void 0 ? void 0 : element.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
                var result_element = document.querySelector(".inputTextArea");
                // Get and set x and y
                result_element === null || result_element === void 0 ? void 0 : result_element.scrollTo({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NsaWVudF9jb21wb25lbnRzX1Rlc3RfdHN4LmFwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBGLHVCQUF1QjtBQUNqSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUFtQixDQUFDLHVEQUFjLDZFQUE2RSxRQUFRLDBEQUFtQixVQUFVO0FBQ2hLO0FBQ0EsV0FBVztBQUNYLFFBQVEsMERBQW1CLENBQUMsdURBQUc7QUFDL0IsWUFBWSwwREFBbUIsQ0FBQyx1REFBRyxJQUFJLGlEQUFpRDtBQUN4RixZQUFZLDBEQUFtQixDQUFDLHVEQUFHLElBQUksb0RBQW9EO0FBQzNGLFFBQVEsMERBQW1CLENBQUMsdURBQUc7QUFDL0IsWUFBWSwwREFBbUIsQ0FBQyx1REFBRyxJQUFJLGdFQUFnRTtBQUN2RyxZQUFZLDBEQUFtQixDQUFDLHVEQUFHLElBQUksMkNBQTJDO0FBQ2xGLGlCQUFpQiwwREFBbUIsQ0FBQyx1REFBRztBQUN4QyxZQUFZLDBEQUFtQixDQUFDLHVEQUFHLElBQUksK0RBQStEO0FBQ3RHLFlBQVksMERBQW1CLENBQUMsdURBQUcsSUFBSSx5Q0FBeUMsc0JBQXNCLG1DQUFtQywwREFBbUIsVUFBVSxzQkFBc0I7QUFDNUwsUUFBUSwwREFBbUIsQ0FBQyx1REFBRyxJQUFJLHlCQUF5QjtBQUM1RDtBQUNBLGlFQUFlLElBQUksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N1cmV0eXBlLXRlc3QvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvVGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUm93LCBDb2wgfSBmcm9tIFwicmVhY3QtYm9vdHN0cmFwXCI7XG4vL2NvbnN0IHJlc291cmNlID0gZmV0Y2hEYXRhKFwidGVzdFwiKTtcbnZhciBUZXN0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIF9iO1xuICAgIHZhciByZXNvdXJjZSA9IF9hLnJlc291cmNlO1xuICAgIHZhciByZXNwb25zZSA9IHJlc291cmNlID8gcmVzb3VyY2UucmVhZCgpIDogXCJcIjtcbiAgICAoX2IgPSByZXNwb25zZS5lcnJvcnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLnJvdyAtIGIucm93OyB9KTtcbiAgICB2YXIgc2Nyb2xsVG8gPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGlnaGxpZ2h0ZXJcIik7XG4gICAgICAgICAgICB2YXIgcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb3dfXCIgKyBwb3NpdGlvbik7XG4gICAgICAgICAgICBpZiAocm93ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhlYWRlck9mZnNldCA9IDEwMDtcbiAgICAgICAgICAgICAgICB2YXIgcm93UG9zaXRpb24gPSByb3cgPT09IG51bGwgfHwgcm93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByb3cub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50UG9zaXRpb24gPSBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXRQb3NpdGlvbiA9IGVsZW1lbnRQb3NpdGlvbiArIHJvd1Bvc2l0aW9uIC0gaGVhZGVyT2Zmc2V0O1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZWxlbWVudC5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogb2Zmc2V0UG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRfZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXRUZXh0QXJlYVwiKTtcbiAgICAgICAgICAgICAgICAvLyBHZXQgYW5kIHNldCB4IGFuZCB5XG4gICAgICAgICAgICAgICAgcmVzdWx0X2VsZW1lbnQgPT09IG51bGwgfHwgcmVzdWx0X2VsZW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3VsdF9lbGVtZW50LnNjcm9sbFRvKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBvZmZzZXRQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgcmVzcG9uc2UgJiYgIXJlc3BvbnNlLnZhbGlkID8gKHJlc3BvbnNlLmVycm9ycy5tYXAoZnVuY3Rpb24gKGUsIGkpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImVycm9yLWNhcmRcIiwga2V5OiBpLCBvbkNsaWNrOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgc2Nyb2xsVG8oZS5yb3cpO1xuICAgICAgICB9IH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUm93LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2wsIHsgY2xhc3NOYW1lOiBcImVycm9yLW1lc3NhZ2VcIiwga2V5OiBpICsgXCJfbWVzc2FnZVwiIH0sIGUubWVzc2FnZSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyB4czogMSwgY2xhc3NOYW1lOiBcImVycm9yLWFsZXJ0XCIsIGtleTogaSArIFwiX2FsZXJ0XCIgfSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJvdywgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IHhzOiAyLCBzbTogMSwgY2xhc3NOYW1lOiBcImVycm9yLXRpdGxlXCIsIGtleTogaSArIFwiX3BhdGgtdGl0bGVcIiB9LCBcIlBhdGhcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyBjbGFzc05hbWU6IFwiZXJyb3ItcGF0aFwiLCBrZXk6IGkgKyBcIl9wYXRoXCIgfSwgZS5pbnN0YW5jZVBhdGgpKSxcbiAgICAgICAgZS5yb3cgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChSb3csIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENvbCwgeyB4czogMiwgc206IDEsIGNsYXNzTmFtZTogXCJlcnJvci10aXRsZVwiLCBrZXk6IGkgKyBcIl9yb3ctdGl0bGVcIiB9LCBcIlJvd1wiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29sLCB7IGNsYXNzTmFtZTogXCJlcnJvci1yb3dcIiwga2V5OiBpICsgXCJfcm93XCIgfSwgZS5yb3cpKSkgOiAoXCJcIikpKTsgfSkpIDogcmVzcG9uc2UgJiYgcmVzcG9uc2UudmFsaWQgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJvay1jYXJkXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2wsIHsgY2xhc3NOYW1lOiBcIm9rLW1lc3NhZ2VcIiB9LCBcIk5vIGVycm9ycyBmb3VuZCFcIikpKSA6IChcIlwiKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFRlc3Q7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=