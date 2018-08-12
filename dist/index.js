webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"./style.css\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__print__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers__ = __webpack_require__(2);




function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = 'aloha';
  element.classList.add('hello');
  btn.innerHTML = 'Click me and check the Console!';
  btn.onclick = __WEBPACK_IMPORTED_MODULE_1__print__["a" /* printMe */];
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return printMe; });
/* unused harmony export unused */
var printMe = function printMe(name) {
  return console.log("(printMe) hello " + name);
};

var unused = function unused() {
  return console.log("This shouldn't get imported");
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export qs */
var qs = function qs(selector) {
  return document.querySelector(selector);
};

/***/ })
],[0]);