"use strict";
(self["webpackChunksuretype_test"] = self["webpackChunksuretype_test"] || []).push([["src_client_components_FormatSelect_tsx"],{

/***/ "./src/client/components/FormatSelect.tsx":
/*!************************************************!*\
  !*** ./src/client/components/FormatSelect.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/index-a86253bb.esm.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var FormatSelect = function (_a) {
    var resource = _a.resource, selected = _a.selected;
    var response = resource ? resource.read() : "";
    var data = response ? response : [];
    var placeholder = "Choose";
    var SingleValue = function (props) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_select__WEBPACK_IMPORTED_MODULE_1__.c.SingleValue, __assign({}, props), props.data.title));
    };
    var Option = function (props) {
        var _a = props.data, title = _a.title, subTitle = _a.subTitle;
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_select__WEBPACK_IMPORTED_MODULE_1__.c.Option, __assign({}, props),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "option_header" }, title),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "option_info" }, subTitle)));
    };
    var customStyles = {
        menu: function (styles) { return (__assign(__assign({}, styles), { borderRadius: "16px", zIndex: 9999 })); },
        singleValue: function (styles) { return (__assign(__assign({}, styles), { fontWeight: 700 })); },
        option: function (provided, state) { return (__assign(__assign({}, provided), { padding: 10, backgroundColor: state.isFocused || state.isSelected ? "#e0e0e0" : "transparent", "&:hover": {
                backgroundColor: "#e0e0e0",
            } })); },
        control: function (provided, state) { return (__assign(__assign({}, provided), { textAlign: "left", borderRadius: "8px", border: state.isFocused ? "2px solid #3b4a57" : "2px solid #3b4a57", boxShadow: state.isFocused ? "none" : "none", 
            // "&": {
            //   border: "1px solid #cccccc",
            //   boxShadow: "none"
            // },
            "&:hover": {
                border: "2px solid #3b4a57",
                boxShadow: "none",
            } })); },
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], { styles: customStyles, options: data, closeMenuOnSelect: true, onChange: selected, isMulti: false, placeholder: placeholder, className: "formatSelect", classNamePrefix: "fs", getOptionLabel: function (options) {
            return "".concat(options.title, " ").concat(options.subTitle);
        }, components: { SingleValue: SingleValue, Option: Option } }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormatSelect);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NsaWVudF9jb21wb25lbnRzX0Zvcm1hdFNlbGVjdF90c3guYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWdCLFNBQUksSUFBSSxTQUFJO0FBQzVCO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUN3QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQW1CLENBQUMsdURBQXNCLGFBQWE7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDBEQUFtQixDQUFDLGtEQUFpQixhQUFhO0FBQ2xFLFlBQVksMERBQW1CLFdBQVcsNEJBQTRCO0FBQ3RFLFlBQVksMERBQW1CLFdBQVcsMEJBQTBCO0FBQ3BFO0FBQ0E7QUFDQSxrQ0FBa0MsNEJBQTRCLGFBQWEsb0NBQW9DLEtBQUs7QUFDcEgseUNBQXlDLDRCQUE0QixhQUFhLGlCQUFpQixLQUFLO0FBQ3hHLDZDQUE2Qyw0QkFBNEIsZUFBZTtBQUN4RjtBQUNBLGVBQWUsS0FBSztBQUNwQiw4Q0FBOEMsNEJBQTRCLGVBQWU7QUFDekY7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBLFlBQVksMERBQW1CLENBQUMsb0RBQU0sSUFBSTtBQUMxQztBQUNBLFNBQVMsZ0JBQWdCLDRDQUE0QztBQUNyRTtBQUNBLGlFQUFlLFlBQVksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N1cmV0eXBlLXRlc3QvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvRm9ybWF0U2VsZWN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdCwgeyBjb21wb25lbnRzIH0gZnJvbSBcInJlYWN0LXNlbGVjdFwiO1xudmFyIEZvcm1hdFNlbGVjdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciByZXNvdXJjZSA9IF9hLnJlc291cmNlLCBzZWxlY3RlZCA9IF9hLnNlbGVjdGVkO1xuICAgIHZhciByZXNwb25zZSA9IHJlc291cmNlID8gcmVzb3VyY2UucmVhZCgpIDogXCJcIjtcbiAgICB2YXIgZGF0YSA9IHJlc3BvbnNlID8gcmVzcG9uc2UgOiBbXTtcbiAgICB2YXIgcGxhY2Vob2xkZXIgPSBcIkNob29zZVwiO1xuICAgIHZhciBTaW5nbGVWYWx1ZSA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50cy5TaW5nbGVWYWx1ZSwgX19hc3NpZ24oe30sIHByb3BzKSwgcHJvcHMuZGF0YS50aXRsZSkpO1xuICAgIH07XG4gICAgdmFyIE9wdGlvbiA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICB2YXIgX2EgPSBwcm9wcy5kYXRhLCB0aXRsZSA9IF9hLnRpdGxlLCBzdWJUaXRsZSA9IF9hLnN1YlRpdGxlO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50cy5PcHRpb24sIF9fYXNzaWduKHt9LCBwcm9wcyksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJvcHRpb25faGVhZGVyXCIgfSwgdGl0bGUpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwib3B0aW9uX2luZm9cIiB9LCBzdWJUaXRsZSkpKTtcbiAgICB9O1xuICAgIHZhciBjdXN0b21TdHlsZXMgPSB7XG4gICAgICAgIG1lbnU6IGZ1bmN0aW9uIChzdHlsZXMpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc3R5bGVzKSwgeyBib3JkZXJSYWRpdXM6IFwiMTZweFwiLCB6SW5kZXg6IDk5OTkgfSkpOyB9LFxuICAgICAgICBzaW5nbGVWYWx1ZTogZnVuY3Rpb24gKHN0eWxlcykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBzdHlsZXMpLCB7IGZvbnRXZWlnaHQ6IDcwMCB9KSk7IH0sXG4gICAgICAgIG9wdGlvbjogZnVuY3Rpb24gKHByb3ZpZGVkLCBzdGF0ZSkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcm92aWRlZCksIHsgcGFkZGluZzogMTAsIGJhY2tncm91bmRDb2xvcjogc3RhdGUuaXNGb2N1c2VkIHx8IHN0YXRlLmlzU2VsZWN0ZWQgPyBcIiNlMGUwZTBcIiA6IFwidHJhbnNwYXJlbnRcIiwgXCImOmhvdmVyXCI6IHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2UwZTBlMFwiLFxuICAgICAgICAgICAgfSB9KSk7IH0sXG4gICAgICAgIGNvbnRyb2w6IGZ1bmN0aW9uIChwcm92aWRlZCwgc3RhdGUpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJvdmlkZWQpLCB7IHRleHRBbGlnbjogXCJsZWZ0XCIsIGJvcmRlclJhZGl1czogXCI4cHhcIiwgYm9yZGVyOiBzdGF0ZS5pc0ZvY3VzZWQgPyBcIjJweCBzb2xpZCAjM2I0YTU3XCIgOiBcIjJweCBzb2xpZCAjM2I0YTU3XCIsIGJveFNoYWRvdzogc3RhdGUuaXNGb2N1c2VkID8gXCJub25lXCIgOiBcIm5vbmVcIiwgXG4gICAgICAgICAgICAvLyBcIiZcIjoge1xuICAgICAgICAgICAgLy8gICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NjY2NcIixcbiAgICAgICAgICAgIC8vICAgYm94U2hhZG93OiBcIm5vbmVcIlxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIFwiJjpob3ZlclwiOiB7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiBcIjJweCBzb2xpZCAjM2I0YTU3XCIsXG4gICAgICAgICAgICAgICAgYm94U2hhZG93OiBcIm5vbmVcIixcbiAgICAgICAgICAgIH0gfSkpOyB9LFxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCwgeyBzdHlsZXM6IGN1c3RvbVN0eWxlcywgb3B0aW9uczogZGF0YSwgY2xvc2VNZW51T25TZWxlY3Q6IHRydWUsIG9uQ2hhbmdlOiBzZWxlY3RlZCwgaXNNdWx0aTogZmFsc2UsIHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlciwgY2xhc3NOYW1lOiBcImZvcm1hdFNlbGVjdFwiLCBjbGFzc05hbWVQcmVmaXg6IFwiZnNcIiwgZ2V0T3B0aW9uTGFiZWw6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQob3B0aW9ucy50aXRsZSwgXCIgXCIpLmNvbmNhdChvcHRpb25zLnN1YlRpdGxlKTtcbiAgICAgICAgfSwgY29tcG9uZW50czogeyBTaW5nbGVWYWx1ZTogU2luZ2xlVmFsdWUsIE9wdGlvbjogT3B0aW9uIH0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZvcm1hdFNlbGVjdDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==