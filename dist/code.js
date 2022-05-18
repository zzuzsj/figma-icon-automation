/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type */ "./src/type.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/storage.ts");


figma.showUI(__html__, { width: 320, height: 436 });
function getGitDataList() {
    let list = [];
    try {
        const res = figma.root.getPluginData(_type__WEBPACK_IMPORTED_MODULE_0__["PluginGitDataKey"]);
        list = JSON.parse(res);
    }
    catch (err) {
        console.log("Get Plugin Git Data Error: ", err);
    }
    console.log("Figma Plugin Git Data Got:", list);
    figma.ui.postMessage({ type: "gitDataGot", list });
}
function setGitDataList(list) {
    const listStr = JSON.stringify(list);
    figma.root.setPluginData(_type__WEBPACK_IMPORTED_MODULE_0__["PluginGitDataKey"], listStr);
}
function getDocPageList() {
    const currentPage = figma.currentPage;
    const docPageList = figma.root.children
        .filter((node) => node.type === "PAGE" && !node.removed)
        .map((cv) => {
        const { id, name } = cv;
        const is_active = currentPage.id === id;
        return { id, name, is_active };
    });
    figma.ui.postMessage({
        type: "docPageListGot",
        docPageList,
    });
}
function getCurrentUser() {
    const user = figma.currentUser;
    console.log("user", user);
    if (!user.id) {
        console.warn("User not login");
        return;
    }
    figma.ui.postMessage({
        type: "currentUserGot",
        user,
    });
}
// send github data to UI
function init() {
    getGitDataList();
    getCurrentUser();
    getDocPageList();
    // getLocalData("webhookData").then((webhookData) => {
    //   figma.ui.postMessage({ type: "webhookDataGot", webhookData });
    // });
    // figma.currentPage.setPluginData(
    //   "github-webhook-plugin",
    //   JSON.stringify({
    //     a: "1111",
    //     b: "22222",
    //   })
    // );
    // figma.root.setPluginData("root-value", "test root");
    console.log(figma.currentPage.getPluginData("github-webhook-plugin"));
    console.log(figma.root.getPluginData("root-value"));
    console.log(figma.root);
    console.log(figma.currentUser);
}
figma.ui.onmessage = (msg) => {
    switch (msg.type) {
        case "setGitData":
            setGitDataList(msg.data);
            getGitDataList();
            // getGitDataList().then((list) => {
            //   console.log("Figma Plugin Git Data Got:", list);
            //   figma.ui.postMessage({ type: "gitDataGot", list });
            // });
            break;
        case "setWebhookData":
            Object(_storage__WEBPACK_IMPORTED_MODULE_1__["setLocalData"])("webhookData", msg.webhookData);
            break;
        case "cancel":
            figma.closePlugin();
            break;
    }
};
init();


/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/*! exports provided: getLocalData, setLocalData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocalData", function() { return getLocalData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocalData", function() { return setLocalData; });
// get github settings
function getLocalData(key) {
    return figma.clientStorage.getAsync(key);
}
// set github settings
function setLocalData(key, data) {
    figma.clientStorage.setAsync(key, data);
}


/***/ }),

/***/ "./src/type.ts":
/*!*********************!*\
  !*** ./src/type.ts ***!
  \*********************/
/*! exports provided: PluginGitDataKey, PluginGitTokenKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginGitDataKey", function() { return PluginGitDataKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginGitTokenKey", function() { return PluginGitTokenKey; });
const PluginGitDataKey = `root-git-data`;
const PluginGitTokenKey = `page-git-token`;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBMEM7QUFDRDtBQUN6Qyx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxzREFBZ0I7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDJCQUEyQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0RBQWdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsV0FBVztBQUMxQjtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isc0NBQXNDO0FBQ3JFLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMkJBQTJCO0FBQ2xFLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsWUFBWSw2REFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BGQTtBQUFBO0FBQUE7QUFBQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDUEE7QUFBQTtBQUFBO0FBQU87QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsImltcG9ydCB7IFBsdWdpbkdpdERhdGFLZXkgfSBmcm9tIFwiLi90eXBlXCI7XG5pbXBvcnQgeyBzZXRMb2NhbERhdGEgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDMyMCwgaGVpZ2h0OiA0MzYgfSk7XG5mdW5jdGlvbiBnZXRHaXREYXRhTGlzdCgpIHtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShQbHVnaW5HaXREYXRhS2V5KTtcbiAgICAgICAgbGlzdCA9IEpTT04ucGFyc2UocmVzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdldCBQbHVnaW4gR2l0IERhdGEgRXJyb3I6IFwiLCBlcnIpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIkZpZ21hIFBsdWdpbiBHaXQgRGF0YSBHb3Q6XCIsIGxpc3QpO1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJnaXREYXRhR290XCIsIGxpc3QgfSk7XG59XG5mdW5jdGlvbiBzZXRHaXREYXRhTGlzdChsaXN0KSB7XG4gICAgY29uc3QgbGlzdFN0ciA9IEpTT04uc3RyaW5naWZ5KGxpc3QpO1xuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShQbHVnaW5HaXREYXRhS2V5LCBsaXN0U3RyKTtcbn1cbmZ1bmN0aW9uIGdldERvY1BhZ2VMaXN0KCkge1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgY29uc3QgZG9jUGFnZUxpc3QgPSBmaWdtYS5yb290LmNoaWxkcmVuXG4gICAgICAgIC5maWx0ZXIoKG5vZGUpID0+IG5vZGUudHlwZSA9PT0gXCJQQUdFXCIgJiYgIW5vZGUucmVtb3ZlZClcbiAgICAgICAgLm1hcCgoY3YpID0+IHtcbiAgICAgICAgY29uc3QgeyBpZCwgbmFtZSB9ID0gY3Y7XG4gICAgICAgIGNvbnN0IGlzX2FjdGl2ZSA9IGN1cnJlbnRQYWdlLmlkID09PSBpZDtcbiAgICAgICAgcmV0dXJuIHsgaWQsIG5hbWUsIGlzX2FjdGl2ZSB9O1xuICAgIH0pO1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogXCJkb2NQYWdlTGlzdEdvdFwiLFxuICAgICAgICBkb2NQYWdlTGlzdCxcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCkge1xuICAgIGNvbnN0IHVzZXIgPSBmaWdtYS5jdXJyZW50VXNlcjtcbiAgICBjb25zb2xlLmxvZyhcInVzZXJcIiwgdXNlcik7XG4gICAgaWYgKCF1c2VyLmlkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlVzZXIgbm90IGxvZ2luXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogXCJjdXJyZW50VXNlckdvdFwiLFxuICAgICAgICB1c2VyLFxuICAgIH0pO1xufVxuLy8gc2VuZCBnaXRodWIgZGF0YSB0byBVSVxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBnZXRHaXREYXRhTGlzdCgpO1xuICAgIGdldEN1cnJlbnRVc2VyKCk7XG4gICAgZ2V0RG9jUGFnZUxpc3QoKTtcbiAgICAvLyBnZXRMb2NhbERhdGEoXCJ3ZWJob29rRGF0YVwiKS50aGVuKCh3ZWJob29rRGF0YSkgPT4ge1xuICAgIC8vICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcIndlYmhvb2tEYXRhR290XCIsIHdlYmhvb2tEYXRhIH0pO1xuICAgIC8vIH0pO1xuICAgIC8vIGZpZ21hLmN1cnJlbnRQYWdlLnNldFBsdWdpbkRhdGEoXG4gICAgLy8gICBcImdpdGh1Yi13ZWJob29rLXBsdWdpblwiLFxuICAgIC8vICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgIC8vICAgICBhOiBcIjExMTFcIixcbiAgICAvLyAgICAgYjogXCIyMjIyMlwiLFxuICAgIC8vICAgfSlcbiAgICAvLyApO1xuICAgIC8vIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcInJvb3QtdmFsdWVcIiwgXCJ0ZXN0IHJvb3RcIik7XG4gICAgY29uc29sZS5sb2coZmlnbWEuY3VycmVudFBhZ2UuZ2V0UGx1Z2luRGF0YShcImdpdGh1Yi13ZWJob29rLXBsdWdpblwiKSk7XG4gICAgY29uc29sZS5sb2coZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKFwicm9vdC12YWx1ZVwiKSk7XG4gICAgY29uc29sZS5sb2coZmlnbWEucm9vdCk7XG4gICAgY29uc29sZS5sb2coZmlnbWEuY3VycmVudFVzZXIpO1xufVxuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcInNldEdpdERhdGFcIjpcbiAgICAgICAgICAgIHNldEdpdERhdGFMaXN0KG1zZy5kYXRhKTtcbiAgICAgICAgICAgIGdldEdpdERhdGFMaXN0KCk7XG4gICAgICAgICAgICAvLyBnZXRHaXREYXRhTGlzdCgpLnRoZW4oKGxpc3QpID0+IHtcbiAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2coXCJGaWdtYSBQbHVnaW4gR2l0IERhdGEgR290OlwiLCBsaXN0KTtcbiAgICAgICAgICAgIC8vICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImdpdERhdGFHb3RcIiwgbGlzdCB9KTtcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzZXRXZWJob29rRGF0YVwiOlxuICAgICAgICAgICAgc2V0TG9jYWxEYXRhKFwid2ViaG9va0RhdGFcIiwgbXNnLndlYmhvb2tEYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY2FuY2VsXCI6XG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufTtcbmluaXQoKTtcbiIsIi8vIGdldCBnaXRodWIgc2V0dGluZ3NcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbERhdGEoa2V5KSB7XG4gICAgcmV0dXJuIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoa2V5KTtcbn1cbi8vIHNldCBnaXRodWIgc2V0dGluZ3NcbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2NhbERhdGEoa2V5LCBkYXRhKSB7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYyhrZXksIGRhdGEpO1xufVxuIiwiZXhwb3J0IGNvbnN0IFBsdWdpbkdpdERhdGFLZXkgPSBgcm9vdC1naXQtZGF0YWA7XG5leHBvcnQgY29uc3QgUGx1Z2luR2l0VG9rZW5LZXkgPSBgcGFnZS1naXQtdG9rZW5gO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==