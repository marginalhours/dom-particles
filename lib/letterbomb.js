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

/***/ "./src/js/text_particle.js":
/*!*********************************!*\
  !*** ./src/js/text_particle.js ***!
  \*********************************/
/*! exports provided: DEFAULT_PARTICLE_OPTIONS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_PARTICLE_OPTIONS\", function() { return DEFAULT_PARTICLE_OPTIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextParticle; });\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ \"./src/js/utilities.js\");\n/* Fix scaling! */\n\n\n\nconst DEFAULT_PARTICLE_OPTIONS = {\n  get velocity() { return  { x: 0, y: 0 } }, \n  get acceleration () { return { x: 0, y: 0 } },\n  heading: 0,\n  ttl: 1000,\n  text: '.',\n  grid: false,\n  style: {},\n  onCreate: () => {},\n  onUpdate: () => {},\n}\n\nclass TextParticle {\n  constructor (options) {\n    Object.assign(this, { ...DEFAULT_PARTICLE_OPTIONS, ...options});\n    \n    this.elapsed = 0;\n    this.frameNumber = 0;\n    this.updateTransform = this.grid ? this.updateGridTransform : this.updateTransform;\n\n    // By default, at this point opacity will be 0, so set it to 1\n    this.element.style.opacity = 1;\n    // Populate initial text content\n    this.setText(this.text);\n \n    // Fetch initial style snapshot, call user onCreate(), assign styles\n    this.buildProps(this.style);\n    this.nextProps = this.getSnapshot();\n    this.onCreate(this);    \n    Object.assign(this.element.style, this.nextProps);\n  }\n  \n  get alive () {\n    return this.elapsed < this.ttl;\n  }\n  \n  get lifeFrac () {\n    return this.elapsed / this.ttl;\n  }\n  \n  buildProps (propObject) {\n    let fixedProps = {};\n    let dynamicProps = {};\n    Object.keys(propObject).map(propKey => {\n      let propValue = propObject[propKey];\n      if (Array.isArray(propValue)) {\n        if (propValue.length === 1){\n          // It's a one-element array, so it's still fixed\n          fixedProps[propKey] = propValue; \n        } else {\n          // dynamic property; calculate function for it\n          dynamicProps[propKey] = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__[\"propValueToFunction\"])(propValue);\n        }\n      } else if (typeof styleValue === 'object') {\n        // Not implemented yet, but I guess per-property easing (>.<)\n      } else {\n        // Either a fixed value or a getter, either way, just assign it\n        fixedProps[propKey] = propValue; \n      }\n    });\n    \n    this.dynamicProps = dynamicProps;\n    this.fixedProps = fixedProps;\n  }\n  \n  setText (text) {\n    this.element.innerText = text;\n  }\n  \n  getSnapshot () {\n    let lifeFrac = this.lifeFrac;\n    \n    let snapshot = Object.keys(this.dynamicProps)\n      .reduce((a, b) => {\n        let propFn = this.dynamicProps[b];\n        return { ...a, [b]: propFn(lifeFrac) }\n      }, {...this.fixedProps});\n    \n    return {...snapshot, transform: this.getScaledTransform(snapshot) }\n  }\n  \n  getScaledTransform(snapshot) {\n    let { scaleX, scaleY, scale, } = snapshot;\n    scale = scale || 1.0;\n    scaleX = scaleX || scale;\n    scaleY = scaleY || scale;\n    \n    return this.getTransform(scaleX, scaleY);\n  }\n  \n  getTransform (scaleX, scaleY) {    \n    return `translate3d(${this.position.x}px, ${this.position.y}px, 0) rotateZ(${this.heading}rad) scale(${scaleX}, ${scaleY})`;\n  }\n  \n  getGridTransform (scaleX, scaleY) {\n    let x = this.position.x - (this.position.x % this.grid);\n    let y = this.position.y - (this.position.y % this.grid);\n    return `translate3d(${x}px, ${y}px, 0) rotateZ(${this.heading}rad) scale(${this.scale.x}, ${this.scale.y})`;\n  }\n    \n  update (f) {\n    // Housekeeping\n    this.elapsed += f * 1000;\n    \n    // Standard motion update\n    this.velocity.x += this.acceleration.x * f;\n    this.velocity.y += this.acceleration.y * f;\n    this.position.x += this.velocity.x * f;\n    this.position.y += this.velocity.y * f;\n\n    // Get current props, call user onUpdate(), assign them\n    this.nextProps = this.getSnapshot();\n    this.onUpdate(this);\n    Object.assign(this.element.style, this.nextProps);\n    \n    // Next frame\n    this.frameNumber ++;\n  }\n}\n\n//# sourceURL=webpack://letterbomb/./src/js/text_particle.js?");

/***/ }),

/***/ "./src/js/text_particle_emitter.js":
/*!*****************************************!*\
  !*** ./src/js/text_particle_emitter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextParticleEmitter; });\n/* harmony import */ var _text_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text_particle */ \"./src/js/text_particle.js\");\n\n\nconst DEFAULT_EMITTER_OPTIONS = {\n  emitEvery: 500,\n  position: { x: 0, y: 0 },\n  velocity: { x: 0, y: 0 },\n  acceleration: { x: 0, y: 0},\n  onCreate: () => {},\n  onUpdate: () => {},\n  particleOptions: { position: { x: 0, y: 0 }, ..._text_particle__WEBPACK_IMPORTED_MODULE_0__[\"DEFAULT_PARTICLE_OPTIONS\"] },\n  MAX_EMIT_PER_STEP: 10 /* Prevent thundering herds on tab switch */\n}\n\nclass TextParticleEmitter {\n  constructor (options) {\n    Object.assign(this, {...DEFAULT_EMITTER_OPTIONS, ...options});\n    \n    this.manager = options.manager;\n    this.totalElapsed = 0;\n    this.elapsed = this.emitEvery;\n    this.emitted = 0;\n    \n    this.onCreate(this);\n  }\n  \n  get alive () {\n    if (this.maxEmissions && this.emitted >= this.maxEmissions) {\n      return false;\n    }\n    if (this.ttl && this.totalElapsed >= this.ttl) {\n      return false;\n    }\n    return true;\n  }\n  \n  update (f) {\n    // position update\n    this.velocity.x += this.acceleration.x * f;\n    this.velocity.y += this.acceleration.y * f;\n    this.position.x += this.velocity.x * f;\n    this.position.y += this.velocity.y * f;\n    \n    // emission update\n    this.elapsed += f * 1000;\n    this.totalElapsed += f * 1000;\n    if (this.elapsed > this.emitEvery) {\n      let toEmit = Math.floor(this.elapsed / this.emitEvery);\n      toEmit = Math.min(toEmit, this.MAX_EMIT_PER_STEP);\n      \n      if (this.maxEmissions) { toEmit = Math.min(this.maxEmissions - this.emitted, toEmit); }\n      this.elapsed = 0;\n      \n      for(let i = 0; i < toEmit; i++){\n        // emit particle\n        this.emitted++;\n        let p = this.particleOptions.position || { x: 0, y: 0 };\n        let pp = { x: this.position.x + p.x, y: this.position.y + p.y }\n        this.manager.addParticle({...this.particleOptions, position: pp});\n      }\n    }\n    \n    // user-provided update\n    this.onUpdate(this);\n  }\n}\n\n//# sourceURL=webpack://letterbomb/./src/js/text_particle_emitter.js?");

/***/ }),

/***/ "./src/js/text_particle_manager.js":
/*!*****************************************!*\
  !*** ./src/js/text_particle_manager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextParticleManager; });\n/* harmony import */ var _text_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text_particle */ \"./src/js/text_particle.js\");\n/* harmony import */ var _text_particle_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text_particle_emitter */ \"./src/js/text_particle_emitter.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ \"./src/js/utilities.js\");\n\n\n\n\n\nconst DEFAULT_TPM_OPTIONS = {\n  max: 100, \n  preallocate: 10, \n  tagName: 'span',\n  autoStart: true\n};\n\nconst PARTICLE_SKELETON_STYLES = {\n  display: 'block', \n  position: 'absolute', \n  pointerEvents: 'none',\n  transform: 'translate3d(0,0,0)',\n  opacity: 0\n}\n\nclass TextParticleManager {\n  constructor (options) {\n    Object.assign(this, { ...DEFAULT_TPM_OPTIONS, ...options });\n    \n    this._pool = [];\n    this.particles = [];\n    this.emitters = [];\n    \n    this.foldElement = document.createElement('div');\n    this.foldElement.className = 'text-particle-manager-reservoir';\n    Object.assign(this.foldElement.style, { width: 0, height: 0, position: 'absolute', top: 0, left: 0});\n    \n    this.allocate(this.preallocate);\n    document.body.appendChild(this.foldElement);\n    \n    \n    this.frameStart = null;\n  }\n  \n  addParticle (options) {\n    if (this.particles.length < this.max) {\n      let p = this.particles.push(new _text_particle__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({...options, element: this.pop()}));\n      if (!this.raf && this.autoStart) {\n        this.start();  \n      }\n      return p;\n    }\n  }\n  \n  addEmitter (options) {\n    let e = this.emitters.push(new _text_particle_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({...options, manager: this}));\n    if (!this.raf && this.autoStart){\n      this.start();\n    }\n    return e;\n  }\n  \n  from (element, pattern, options) {\n    let offsets = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__[\"buildOffsets\"])(element.innerText, pattern);\n    offsets.reverse().map(o => { \n      let r = document.createRange();\n      r.setStart(element.childNodes[0], o[0]);\n      r.setEnd(element.childNodes[0], o[1]);\n      let s = document.createElement('span');\n      r.surroundContents(s);\n      let { x, y, width, height } = s.getBoundingClientRect();\n      Object.assign(s.style, {...PARTICLE_SKELETON_STYLES});\n      let p = new _text_particle__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({...options, text: r.toString(), element: s, position: { x, y }, style: { width, height }});\n      p.element.parentElement.removeChild(p.element);\n      this.foldElement.appendChild(p.element);\n      this.particles.push(p);\n    });\n    this.start();\n  }\n  \n  \n  start () {\n    this.raf = requestAnimationFrame((t) => this.update(t));\n  }\n  \n  update(timestamp) {\n    if (!this.frameStart) this.frameStart = timestamp;\n    let dt = timestamp - this.frameStart;\n    this.frameStart = timestamp;\n    let f = (dt/1000);\n    \n    this.particles = this.particles.filter(p => {\n      p.update(f);\n      if (p.alive) { return true; }\n      \n      // disappear and return to pool\n      Object.assign(p.element.style, PARTICLE_SKELETON_STYLES);\n      this.push(p.element);\n      return false;\n    });\n    \n    this.emitters = this.emitters.filter(e => {\n      e.update(f);\n      return e.alive;\n    });\n    \n    if (this.emitters.length === 0 && this.particles.length === 0){\n      cancelAnimationFrame(this.raf);\n      this.raf = false;\n    } else {\n      requestAnimationFrame((t) => this.update(t));  \n    }\n  }\n  \n  push (el) {\n    this._pool.push(el);\n  }\n    \n  pop (el) {\n    if (this._pool.length > 0){\n      return this._pool.pop();\n    } else {\n      return this.create();\n    }\n  }\n    \n  create () {\n    let element = document.createElement(this.tagName);\n    this.foldElement.appendChild(element);    \n    Object.assign(element.style, PARTICLE_SKELETON_STYLES);\n    \n    return element;\n  }\n  \n  allocate (n) {\n    if (this._pool.length < n){\n      for(let i = this._pool.length; i < n; i++){\n        this.push(this.create());\n      }\n    }\n  }\n    \n}\n\n//# sourceURL=webpack://letterbomb/./src/js/text_particle_manager.js?");

/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/*! exports provided: rgbToNumbers, rgbaToNumbers, hexToNumbers, valueToNumberAndUnit, tryGetValue, colourToCSSString, valueToCSSString, lerp, easeArray, transpose, propValueToFunction, buildOffsets, positionFromNode */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (110:0)\\nYou may need an appropriate loader to handle this file type.\\n|   \\n|   offsets.push([i ,\\n> }\\n| \\n| const buildChunksFromRegex = (text, pattern) => {\");\n\n//# sourceURL=webpack://letterbomb/./src/js/utilities.js?");

/***/ })

/******/ })["default"];
});