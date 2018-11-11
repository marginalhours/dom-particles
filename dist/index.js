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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _text_particle_manager = __webpack_require__(1);

var _text_particle_manager2 = _interopRequireDefault(_text_particle_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = new _text_particle_manager2.default();

document.querySelector('button').addEventListener('click', function () {
  t.createEmitter({
    manager: undefined,
    maxEmissions: 10,
    emitEvery: 200,
    getParticleTTL: function getParticleTTL() {
      return 2000;
    },
    getText: function getText() {
      return '▓';
    },
    getPosition: function getPosition() {
      var k = 125 + 50 * (Math.random() - 0.5);
      return { x: k, y: 80 };
    },
    getVelocity: function getVelocity() {
      return { x: 0, y: -10 };
    },
    onCreate: function onCreate(p) {
      p.setStyle({ fontSize: 14, color: '#aaa' });
    },
    onUpdate: function onUpdate(p) {
      p.setText(['░', '▒', '▓'][Math.floor(p.lerp(3, 0))]);
    }
  });
});

var render = function render(dt) {
  t.update(dt);
};

var start = null;
var loop = function loop(timestamp) {
  if (!start) start = timestamp;
  var dt = timestamp - start;
  start = timestamp;
  render(dt);

  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: SyntaxError: Unexpected token (6:2)\n\n  4 | \n  5 | const DEFAULT_TPM_OPTIONS = {\n> 6 |   { max: 100, preallocate: 10, tagName: 'span' }\n    |   ^\n  7 | };\n  8 | \n  9 | export default class TextParticleManager {\n");

/***/ })
/******/ ]);