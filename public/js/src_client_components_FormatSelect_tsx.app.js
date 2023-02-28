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
    var response = resource ? resource.fileFormats.read() : undefined;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NsaWVudF9jb21wb25lbnRzX0Zvcm1hdFNlbGVjdF90c3guYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWdCLFNBQUksSUFBSSxTQUFJO0FBQzVCO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUN3QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQW1CLENBQUMsdURBQXNCLGFBQWE7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDBEQUFtQixDQUFDLGtEQUFpQixhQUFhO0FBQ2xFLFlBQVksMERBQW1CLFdBQVcsNEJBQTRCO0FBQ3RFLFlBQVksMERBQW1CLFdBQVcsMEJBQTBCO0FBQ3BFO0FBQ0E7QUFDQSxrQ0FBa0MsNEJBQTRCLGFBQWEsb0NBQW9DLEtBQUs7QUFDcEgseUNBQXlDLDRCQUE0QixhQUFhLGlCQUFpQixLQUFLO0FBQ3hHLDZDQUE2Qyw0QkFBNEIsZUFBZTtBQUN4RjtBQUNBLGVBQWUsS0FBSztBQUNwQiw4Q0FBOEMsNEJBQTRCLGVBQWU7QUFDekY7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBLFlBQVksMERBQW1CLENBQUMsb0RBQU0sSUFBSTtBQUMxQztBQUNBLFNBQVMsZ0JBQWdCLDRDQUE0QztBQUNyRTtBQUNBLGlFQUFlLFlBQVksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N1cmV0eXBlLXRlc3QvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvRm9ybWF0U2VsZWN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdCwgeyBjb21wb25lbnRzIH0gZnJvbSBcInJlYWN0LXNlbGVjdFwiO1xudmFyIEZvcm1hdFNlbGVjdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciByZXNvdXJjZSA9IF9hLnJlc291cmNlLCBzZWxlY3RlZCA9IF9hLnNlbGVjdGVkO1xuICAgIHZhciByZXNwb25zZSA9IHJlc291cmNlID8gcmVzb3VyY2UuZmlsZUZvcm1hdHMucmVhZCgpIDogdW5kZWZpbmVkO1xuICAgIHZhciBkYXRhID0gcmVzcG9uc2UgPyByZXNwb25zZSA6IFtdO1xuICAgIHZhciBwbGFjZWhvbGRlciA9IFwiQ2hvb3NlXCI7XG4gICAgdmFyIFNpbmdsZVZhbHVlID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLlNpbmdsZVZhbHVlLCBfX2Fzc2lnbih7fSwgcHJvcHMpLCBwcm9wcy5kYXRhLnRpdGxlKSk7XG4gICAgfTtcbiAgICB2YXIgT3B0aW9uID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHZhciBfYSA9IHByb3BzLmRhdGEsIHRpdGxlID0gX2EudGl0bGUsIHN1YlRpdGxlID0gX2Euc3ViVGl0bGU7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLk9wdGlvbiwgX19hc3NpZ24oe30sIHByb3BzKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcIm9wdGlvbl9oZWFkZXJcIiB9LCB0aXRsZSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJvcHRpb25faW5mb1wiIH0sIHN1YlRpdGxlKSkpO1xuICAgIH07XG4gICAgdmFyIGN1c3RvbVN0eWxlcyA9IHtcbiAgICAgICAgbWVudTogZnVuY3Rpb24gKHN0eWxlcykgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBzdHlsZXMpLCB7IGJvcmRlclJhZGl1czogXCIxNnB4XCIsIHpJbmRleDogOTk5OSB9KSk7IH0sXG4gICAgICAgIHNpbmdsZVZhbHVlOiBmdW5jdGlvbiAoc3R5bGVzKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHN0eWxlcyksIHsgZm9udFdlaWdodDogNzAwIH0pKTsgfSxcbiAgICAgICAgb3B0aW9uOiBmdW5jdGlvbiAocHJvdmlkZWQsIHN0YXRlKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByb3ZpZGVkKSwgeyBwYWRkaW5nOiAxMCwgYmFja2dyb3VuZENvbG9yOiBzdGF0ZS5pc0ZvY3VzZWQgfHwgc3RhdGUuaXNTZWxlY3RlZCA/IFwiI2UwZTBlMFwiIDogXCJ0cmFuc3BhcmVudFwiLCBcIiY6aG92ZXJcIjoge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZTBlMGUwXCIsXG4gICAgICAgICAgICB9IH0pKTsgfSxcbiAgICAgICAgY29udHJvbDogZnVuY3Rpb24gKHByb3ZpZGVkLCBzdGF0ZSkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcm92aWRlZCksIHsgdGV4dEFsaWduOiBcImxlZnRcIiwgYm9yZGVyUmFkaXVzOiBcIjhweFwiLCBib3JkZXI6IHN0YXRlLmlzRm9jdXNlZCA/IFwiMnB4IHNvbGlkICMzYjRhNTdcIiA6IFwiMnB4IHNvbGlkICMzYjRhNTdcIiwgYm94U2hhZG93OiBzdGF0ZS5pc0ZvY3VzZWQgPyBcIm5vbmVcIiA6IFwibm9uZVwiLCBcbiAgICAgICAgICAgIC8vIFwiJlwiOiB7XG4gICAgICAgICAgICAvLyAgIGJvcmRlcjogXCIxcHggc29saWQgI2NjY2NjY1wiLFxuICAgICAgICAgICAgLy8gICBib3hTaGFkb3c6IFwibm9uZVwiXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgXCImOmhvdmVyXCI6IHtcbiAgICAgICAgICAgICAgICBib3JkZXI6IFwiMnB4IHNvbGlkICMzYjRhNTdcIixcbiAgICAgICAgICAgICAgICBib3hTaGFkb3c6IFwibm9uZVwiLFxuICAgICAgICAgICAgfSB9KSk7IH0sXG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7IHN0eWxlczogY3VzdG9tU3R5bGVzLCBvcHRpb25zOiBkYXRhLCBjbG9zZU1lbnVPblNlbGVjdDogdHJ1ZSwgb25DaGFuZ2U6IHNlbGVjdGVkLCBpc011bHRpOiBmYWxzZSwgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyLCBjbGFzc05hbWU6IFwiZm9ybWF0U2VsZWN0XCIsIGNsYXNzTmFtZVByZWZpeDogXCJmc1wiLCBnZXRPcHRpb25MYWJlbDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChvcHRpb25zLnRpdGxlLCBcIiBcIikuY29uY2F0KG9wdGlvbnMuc3ViVGl0bGUpO1xuICAgICAgICB9LCBjb21wb25lbnRzOiB7IFNpbmdsZVZhbHVlOiBTaW5nbGVWYWx1ZSwgT3B0aW9uOiBPcHRpb24gfSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRm9ybWF0U2VsZWN0O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9