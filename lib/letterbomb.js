(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("letterbomb", [], factory);
	else if(typeof exports === 'object')
		exports["letterbomb"] = factory();
	else
		root["letterbomb"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _text_particle_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text_particle_manager */ \"./src/js/text_particle_manager.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ \"./src/js/utilities.js\");\n\n\n\n_text_particle_manager__WEBPACK_IMPORTED_MODULE_0__[\"default\"].utilities = _utilities__WEBPACK_IMPORTED_MODULE_1__;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_text_particle_manager__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://letterbomb/./src/js/index.js?");

/***/ }),

/***/ "./src/js/text_particle_manager.js":
/*!*****************************************!*\
  !*** ./src/js/text_particle_manager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (20:0)\\nYou may need an appropriate loader to handle this file type.\\n|       opacity: 0\\n|     }\\n> }\\n| \\n| export default class TextParticleManager {\");\n\n//# sourceURL=webpack://letterbomb/./src/js/text_particle_manager.js?");

/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/*! exports provided: rgbToNumbers, rgbaToNumbers, hexToNumbers, valueToNumberAndUnit, tryGetValue, colourToCSSString, valueToCSSString, lerp, easeArray, transpose, styleValueToFunction, buildOffsets, positionFromNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbToNumbers\", function() { return rgbToNumbers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbaToNumbers\", function() { return rgbaToNumbers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hexToNumbers\", function() { return hexToNumbers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"valueToNumberAndUnit\", function() { return valueToNumberAndUnit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tryGetValue\", function() { return tryGetValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colourToCSSString\", function() { return colourToCSSString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"valueToCSSString\", function() { return valueToCSSString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lerp\", function() { return lerp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeArray\", function() { return easeArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transpose\", function() { return transpose; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styleValueToFunction\", function() { return styleValueToFunction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildOffsets\", function() { return buildOffsets; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"positionFromNode\", function() { return positionFromNode; });\n/* Useful regexes */\nconst RGB_PATTERN = /rgb\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*\\)/;\nconst RGBA_PATTERN = /rgba\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*([01](?:\\.\\d+)*)\\s*\\)/;\nconst HEX_PATTERN = /#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})/;\nconst NUMBER_AND_UNIT_PATTERN = /(\\d+\\.\\d+|\\d+)([a-z]+)?/;\n\n/* CSS to internal format import / export */\n\nconst rgbToNumbers = (string) => {\n  try {\n    let [_, r, g, b] = RGB_PATTERN.exec(string);\n    return [...[r, g, b].map(v => parseInt(v)), 1.0]; \n  }\n  catch (err){\n    console.log(err);\n    return false;\n  }\n}\n\nconst rgbaToNumbers = (string) => {\n  try {\n    let [_, r, g, b, a] = RGBA_PATTERN.exec(string);\n    return [r, g, b, a].filter(v => v).map(v => parseInt(v)) \n  }\n  catch (err){\n    console.log(err);\n    return false;\n  }\n}\n\nconst hexToNumbers = (string) => {\n  try {\n    let [_, r, g, b] = HEX_PATTERN.exec(string);\n    return [...[r, g, b].map(x => parseInt(x, 16) * ((x.length === 1) ? 0x11 : 0x1)), 1.0];\n  } \n  catch (err) {\n    console.log(err);\n    return false;  \n  }\n}\n\nconst valueToNumberAndUnit = (string) => {\n  let [_, num, unit] = NUMBER_AND_UNIT_PATTERN.exec(string);\n  return [parseInt(num), unit || '']\n}\n\nconst tryGetValue = (string) => {\n  switch(string[0]){\n    case '#':\n      return hexToNumbers(string);\n    case 'r':\n      return (string[3] === 'a' ? rgbaToNumbers : rgbToNumbers)(string);\n    default:\n      return valueToNumberAndUnit(string);\n  }\n}\n\nconst colourToCSSString = ([r, g, b, a]) => `rgba(${r}, ${g}, ${b}, ${a})`;\nconst valueToCSSString = (val, unit) => `${val}${unit}`;\n\n/* Easing functions */\n\nconst lerp = (a, b, frac) => a + ((b - a) * frac);\n\nconst easeArray = (array, easeFn, frac) => {\n  let total = frac * (array.length - 1);\n  let start = Math.min(Math.floor(total), array.length - 1);\n  let end = Math.min(start + 1, array.length - 1);\n  return easeFn(array[start], array[end], total % 1);\n}\n\n/* Property calculation function-generation functions */\n\nconst transpose = (array) => {\n  return array[0].map((_, i) => array.map(r => r[i]));  \n}\n\nconst styleValueToFunction = (styleValue) => {\n  let k = styleValue.map(s => tryGetValue(s));\n  if (k[0].length === 2){\n    // CSS unit property (either like '12px' or like '1.0'\n    let unit = k[0][1];\n    let values = k.map(v => v[0]);\n    return (frac) => valueToCSSString(easeArray(values, lerp, frac), unit)\n  } else {\n    // Colour in [[r, g, b, a],...] format \n    let k_t = transpose(k);\n    return (frac) => colourToCSSString(k_t.map(c => easeArray(c, lerp, frac)))  \n  } \n}\n\nconst buildOffsets = (text, selector) => {\n  // finds all offsets in text when split by selector\n  let offsets = [];\n  let m, prev;\n  do {\n    m = selector.exec(text);\n    if (m) {      \n      let next = m.index;\n      if (next > prev + 1) {\n        offsets.push([prev + 1, next - 1]);  \n      }\n      let end = m.index + m[0].length;\n      offsets.push([m.index, end]);\n      \n      prev = end;\n    }\n  } while (m);\n  return offsets;\n}\n\nconst positionFromNode = (element, xOffset, yOffset) => {\n  let rect = element.getBoundingClientRect();\n  return { x: rect.x + xOffset, y: rect.y + yOffset}\n}\n\n//# sourceURL=webpack://letterbomb/./src/js/utilities.js?");

/***/ })

/******/ })["default"];
});