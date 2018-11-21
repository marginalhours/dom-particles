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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_PARTICLE_OPTIONS\", function() { return DEFAULT_PARTICLE_OPTIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextParticle; });\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ \"./src/js/utilities.js\");\n/* \n*  Basic particle class. \n*  Configuration: \n*    position, velocity, acceleration: coordinate-like objects. During the particle update step, velocity += position, position += acceleration\n*    ttl: Time-to-live in milliseconds\n*    text: text content of particle node\n*    grid: size of grid to snap to. If false, don't snap to grid.\n*    style: Object with most CSS properties, plus\n*      (1) scale (or scaleX and scaleY separately)\n*      (2) rotation\n*      In the style object, you can provide:\n*         (1) Literal values\n*         (2) Getters \n*         (3) Arrays of numbers / colours / css values, which will be animated as a fraction of particle TTL\n*    onCreate: function called during particle creation. Takes one argument, the particle object.\n*    onUpdate: function called every frame during particle lifespan. Takes one argument, the particle object.\n*  Needs a better reset on exit\n*/\n\n\n\nconst zeroVector = { x: 0, y: 0 }\n\nconst DEFAULT_PARTICLE_OPTIONS = {\n  ttl: 1000,\n  text: '.',\n  grid: false,\n  style: {},\n  onCreate: () => {},\n  onUpdate: () => {},\n  heading: false\n}\n\n\nclass TextParticle {\n  constructor (options) {\n    Object.assign(this, { \n      ...DEFAULT_PARTICLE_OPTIONS, \n      ...options, \n      velocity: { ...zeroVector, ...options.velocity },\n      position: { ...zeroVector, ...options.position },\n      acceleration: { ...zeroVector, ...options.acceleration }\n    });\n    \n    this.elapsed = 0;\n    this.frameNumber = 0;\n    this.getTransform = this.grid ? this.getGridTransform : this.getTransform;\n\n    // By default, at this point opacity will be 0, so set it to 1\n    this.element.style.opacity = 1;\n    // Populate initial text content\n    this.setText(this.text);\n \n    // Fetch initial style snapshot, call user onCreate(), assign styles\n    this.buildProps(this.style);\n    this.nextProps = this.getSnapshot();\n    this.onCreate(this);    \n    Object.assign(this.element.style, this.nextProps);\n    this.element.style.display = 'inline-block';\n  }\n  \n  get alive () {\n    return this.elapsed < this.ttl;\n  }\n  \n  get lifeFrac () {\n    return this.elapsed / this.ttl;\n  }\n  \n  buildProps (propObject) {\n    let fixedProps = {};\n    let dynamicProps = {};\n    Object.keys(propObject).map(propKey => {\n      let propValue = propObject[propKey];\n      if (Array.isArray(propValue)) {\n        if (propValue.length === 1){\n          // It's a one-element array, so it's still fixed\n          fixedProps[propKey] = propValue; \n        } else {\n          // dynamic property; calculate function for it\n          dynamicProps[propKey] = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__[\"propValueToFunction\"])(propValue);\n        }\n      } else if (typeof styleValue === 'object') {\n        // Not implemented yet, but I guess per-property easing (>.<)\n      } else {\n        // Either a fixed value or a getter, either way, just assign it\n        fixedProps[propKey] = propValue; \n      }\n    });\n    \n    this.dynamicProps = dynamicProps;\n    this.fixedProps = fixedProps;\n  }\n  \n  setText (text) {\n    this.element.innerText = text;\n  }\n  \n  getSnapshot () {\n    let lifeFrac = this.lifeFrac;\n    \n    let snapshot = Object.keys(this.dynamicProps)\n      .reduce((a, b) => {\n        let propFn = this.dynamicProps[b];\n        return { ...a, [b]: propFn(lifeFrac) }\n      }, {...this.fixedProps});\n    \n    return {...snapshot, transform: this.getScaledTransform(snapshot) }\n  }\n  \n  getScaledTransform(snapshot) {\n    let { rotation, scale, scaleX, scaleY } = snapshot;\n    rotation = (this.heading && `${this.heading}rad`) || rotation || 0;\n    scale = scale || 1.0;\n    scaleX = scaleX || scale;\n    scaleY = scaleY || scale;\n    \n    return this.getTransform(scaleX, scaleY, rotation);\n  }\n  \n  getTransform (scaleX, scaleY, rotation) {\n    return `translate3d(${this.position.x}px, ${this.position.y}px, 0px) rotateZ(${rotation}) scale(${scaleX}, ${scaleY})`;\n  }\n  \n  getGridTransform (scaleX, scaleY, rotation) {\n    let x = this.position.x - (this.position.x % this.grid);\n    let y = this.position.y - (this.position.y % this.grid);\n    return `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotation}) scale(${scaleX}, ${scaleY})`;\n  }\n    \n  update (f) {\n    // Housekeeping\n    this.elapsed += f * 1000;\n    \n    // Standard motion update\n    this.velocity.x += this.acceleration.x * f;\n    this.velocity.y += this.acceleration.y * f;\n    this.position.x += this.velocity.x * f;\n    this.position.y += this.velocity.y * f;\n    \n    // Get current props, call user onUpdate(), assign them\n    this.nextProps = this.getSnapshot();\n    this.onUpdate(this);\n    Object.assign(this.element.style, this.nextProps);\n    \n    // Next frame\n    this.frameNumber ++;\n  }\n}\n\n//# sourceURL=webpack://letterbomb/./src/js/text_particle.js?");

/***/ }),

/***/ "./src/js/text_particle_emitter.js":
/*!*****************************************!*\
  !*** ./src/js/text_particle_emitter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextParticleEmitter; });\n/* harmony import */ var _text_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text_particle */ \"./src/js/text_particle.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ \"./src/js/utilities.js\");\n/*\n*  Particle emitter. \n*  Configuration:\n*    emitEvery: Milliseconds. How often to emit a particle.\n*    position, velocity, acceleration: Vector-like objects. During update, velocity += acceleration, position += velocity.\n*    rotation: Which direction this emitter is facing (IN DEGREES)\n*    maxEmissions: Max number of particles to emit. Once reached, emitter stops.\n*    ttl: Max number of milliseconds to emit particles for.\n*    MAX_EMIT_PER_STEP: Maximum number of particles to emit per timestep. Limitation to stop all particles syncing up on browser tab switch. Not recommended to change.\n*    particleOptions: See particle class. Options used to instantiate particles from this emitter.\n*      If these options are getters, not literal, they will be recalculated per-particle (useful for randomization etc)\n*      The initial position vector of a particle from an emitter is expressed _relative to the emitter_.\n*      The initial velocity vector of a particle from an emitter is expressed _relative to the emitter's angle_.\n*/\n\n\n\n\nconst zeroVector = { x: 0, y: 0 }\n\nconst DEFAULT_EMITTER_OPTIONS = {\n  maxEmissions: false,\n  ttl: false,\n  emitEvery: 500,\n  rotation: 0,\n  particleOptions: { ..._text_particle__WEBPACK_IMPORTED_MODULE_0__[\"DEFAULT_PARTICLE_OPTIONS\"] },\n  onCreate: () => {},\n  onUpdate: () => {},\n  MAX_EMIT_PER_STEP: 16, /* Prevent thundering herds on tab switch */\n}\n\nclass TextParticleEmitter {\n  constructor (options) {\n    Object.assign(this, {\n      ...DEFAULT_EMITTER_OPTIONS, \n      ...options,\n      position: { ...zeroVector, ...options.position },\n      velocity: { ...zeroVector, ...options.velocity },\n      acceleration: { ...zeroVector, ...options.acceleration },\n    });\n    \n    this.manager = options.manager;\n    this.totalElapsed = 0;\n    this.elapsed = this.emitEvery;\n    this.emitted = 0;\n    this.frameNumber = 0;\n    \n    this.onCreate(this);\n  }\n  \n  get alive () {\n    if (this.maxEmissions && this.emitted >= this.maxEmissions) {\n      return false;\n    }\n    if (this.ttl && this.totalElapsed >= this.ttl) {\n      return false;\n    }\n    return true;\n  }\n  \n  update (f) {\n    // position update\n    this.velocity.x += this.acceleration.x * f;\n    this.velocity.y += this.acceleration.y * f;\n    this.position.x += this.velocity.x * f;\n    this.position.y += this.velocity.y * f;\n    \n    // emission update\n    this.elapsed += f * 1000;\n    this.totalElapsed += f * 1000;\n    if (this.elapsed > this.emitEvery) {\n      let toEmit = Math.floor(this.elapsed / this.emitEvery);\n      toEmit = Math.min(toEmit, this.MAX_EMIT_PER_STEP);\n      \n      if (this.maxEmissions) { toEmit = Math.min(this.maxEmissions - this.emitted, toEmit); }\n      this.elapsed = 0;\n      \n      for(let i = 0; i < toEmit; i++){\n        let p = { ...zeroVector, ...this.particleOptions.position };\n        let pp = { x: this.position.x + p.x, y: this.position.y + p.y }\n        \n        let v = { ...zeroVector, ...this.particleOptions.velocity };\n        let v_angle = Math.atan2(v.y, v.x);\n        let v_magna = Math.sqrt((v.x * v.x) + (v.y * v.y));\n        let t_angle = (this.rotation / 180) * Math.PI;\n        \n        let vv = {\n          x: v_magna * Math.cos(v_angle + t_angle),\n          y: v_magna * Math.sin(v_angle + t_angle)\n        }\n        \n        this.manager.addParticle({ ...this.particleOptions, position: pp, velocity: vv });\n        // emit particle\n        this.emitted ++;\n      }\n      \n      this.frameNumber ++;\n    }\n    \n    // user-provided update\n    this.onUpdate(this);\n  }\n}\n\n//# sourceURL=webpack://letterbomb/./src/js/text_particle_emitter.js?");

/***/ }),

/***/ "./src/js/text_particle_manager.js":
/*!*****************************************!*\
  !*** ./src/js/text_particle_manager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextParticleManager; });\n/* harmony import */ var _text_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text_particle */ \"./src/js/text_particle.js\");\n/* harmony import */ var _text_particle_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text_particle_emitter */ \"./src/js/text_particle_emitter.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ \"./src/js/utilities.js\");\n\n\n\n\n\nconst DEFAULT_TPM_OPTIONS = {\n  max: 100, \n  preallocate: 10, \n  tagName: 'span',\n  autoStart: true,\n};\n\nconst PARTICLE_SKELETON_STYLES = {\n  position: 'absolute', \n  display: 'none',\n  pointerEvents: 'none',\n  whiteSpace: 'pre-wrap',\n  transform: 'translate3d(0,0,0)',\n  boxSizing: 'border-box',\n}\n\nconst FOLD_STYLES = { \n  width: 0, \n  height: 0, \n  position: 'absolute', \n  top: '-100px', \n  left: '-100px',\n}\n\nclass TextParticleManager {\n  constructor (options) {\n    Object.assign(this, { ...DEFAULT_TPM_OPTIONS, ...options });\n    \n    this._pool = [];\n    this.particles = [];\n    this.emitters = [];\n    \n    this.foldElement = document.createElement('div');\n    this.foldElement.className = 'text-particle-manager-reservoir';\n    Object.assign(this.foldElement.style, FOLD_STYLES);\n    \n    this.allocate(this.preallocate);\n    document.body.appendChild(this.foldElement);\n    \n    this.frameStart = null;\n  }\n  \n  addParticle (options) {\n    if (this.particles.length < this.max) {\n      let p = this.particles.push(new _text_particle__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({...options, element: this.pop()}));\n      if (!this.raf && this.autoStart) {\n        this.start();  \n      }\n      return p;\n    }\n  }\n  \n  addEmitter (options) {\n    let e = this.emitters.push(new _text_particle_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({...options, manager: this}));\n    if (!this.raf && this.autoStart){\n      this.start();\n    }\n    return e;\n  }\n  \n  /* Problematic: Needs to duplicate element styles (font size etc) */\n  from (element, pattern, options) {\n    let offsets = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__[\"buildOffsets\"])(element.innerText, pattern);\n    offsets.reverse().map(o => { \n      // should we just build our own whole element here and replace in the DOM in one go?\n      // saves messing about with offsets...\n      let r = document.createRange();\n      r.setStart(element.childNodes[0], o[0]);\n      r.setEnd(element.childNodes[0], o[1]);\n      let s = document.createElement(this.tagName);\n      Object.assign(s.style, {...PARTICLE_SKELETON_STYLES});\n      r.surroundContents(s);      \n      let { x, y, width, height } = s.getBoundingClientRect();\n      Object.assign(s.style, { width, height });\n\n      // let p = new TextParticle({...options, text: r.toString(), element: s, position: { x, y }, style: {...options.style, width, height }});\n      // p.element.parentElement.removeChild(p.element);\n      // this.foldElement.appendChild(p.element);\n      // this.particles.push(p);\n    });\n    this.start();\n  }\n  \n  start () {\n    this.raf = requestAnimationFrame((t) => this.update(t));\n  }\n  \n  update(timestamp) {\n    if (!this.frameStart) this.frameStart = timestamp;\n    let dt = timestamp - this.frameStart;\n    this.frameStart = timestamp;\n    let f = (dt/1000);\n    \n    this.particles = this.particles.filter(p => {\n      p.update(f);\n      if (p.alive) { return true; }\n      \n      // disappear and return to pool\n      Object.assign(p.element.style, PARTICLE_SKELETON_STYLES);\n      this.push(p.element);\n      return false;\n    });\n    \n    this.emitters = this.emitters.filter(e => {\n      e.update(f);\n      return e.alive;\n    });\n    \n    if (this.emitters.length === 0 && this.particles.length === 0){\n      cancelAnimationFrame(this.raf);\n      this.raf = false;\n    } else {\n      requestAnimationFrame((t) => this.update(t));  \n    }\n  }\n  \n  push (el) {\n    this._pool.push(el);\n  }\n    \n  pop (el) {\n    if (this._pool.length > 0){\n      return this._pool.pop();\n    } else {\n      return this.create();\n    }\n  }\n    \n  create () {\n    let element = document.createElement(this.tagName);\n    Object.assign(element.style, PARTICLE_SKELETON_STYLES);\n    \n    this.foldElement.appendChild(element);    \n    return element;\n  }\n  \n  allocate (n) {\n    if (this._pool.length < n){\n      for(let i = this._pool.length; i < n; i++){\n        this.push(this.create());\n      }\n    }\n  }\n    \n}\n\n//# sourceURL=webpack://letterbomb/./src/js/text_particle_manager.js?");

/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/*! exports provided: rgbToNumbers, rgbaToNumbers, hexToNumbers, valueToNumberAndUnit, tryGetValue, colourToCSSString, valueToCSSString, lerp, easeArray, transpose, propValueToFunction, buildOffsets, positionFromNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbToNumbers\", function() { return rgbToNumbers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgbaToNumbers\", function() { return rgbaToNumbers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hexToNumbers\", function() { return hexToNumbers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"valueToNumberAndUnit\", function() { return valueToNumberAndUnit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tryGetValue\", function() { return tryGetValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colourToCSSString\", function() { return colourToCSSString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"valueToCSSString\", function() { return valueToCSSString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lerp\", function() { return lerp; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeArray\", function() { return easeArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"transpose\", function() { return transpose; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"propValueToFunction\", function() { return propValueToFunction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildOffsets\", function() { return buildOffsets; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"positionFromNode\", function() { return positionFromNode; });\n/* Useful regexes */\nconst RGB_PATTERN = /rgb\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*\\)/;\nconst RGBA_PATTERN = /rgba\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*([01](?:\\.\\d+)*)\\s*\\)/;\nconst HEX_PATTERN = /#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})/;\nconst NUMBER_AND_UNIT_PATTERN = /(\\d+\\.\\d+|\\d+)([a-z]+)?/;\n\n/* CSS to internal format import / export */\n\nconst rgbToNumbers = (string) => {\n  try {\n    let [_, r, g, b] = RGB_PATTERN.exec(string);\n    return [...[r, g, b].map(v => parseInt(v)), 1.0]; \n  }\n  catch (err){\n    console.log(err);\n    return false;\n  }\n}\n\nconst rgbaToNumbers = (string) => {\n  try {\n    let [_, r, g, b, a] = RGBA_PATTERN.exec(string);\n    return [r, g, b, a].filter(v => v).map(v => parseInt(v)) \n  }\n  catch (err){\n    console.log(err);\n    return false;\n  }\n}\n\nconst hexToNumbers = (string) => {\n  try {\n    let [_, r, g, b] = HEX_PATTERN.exec(string);\n    return [...[r, g, b].map(x => parseInt(x, 16) * ((x.length === 1) ? 0x11 : 0x1)), 1.0];\n  } \n  catch (err) {\n    console.log(err);\n    return false;  \n  }\n}\n\nconst valueToNumberAndUnit = (string) => {\n  let [_, num, unit] = NUMBER_AND_UNIT_PATTERN.exec(string);\n  return [parseInt(num), unit || '']\n}\n\nconst tryGetValue = (string) => {\n  switch(string[0]){\n    case '#':\n      return hexToNumbers(string);\n    case 'r':\n      return (string[3] === 'a' ? rgbaToNumbers : rgbToNumbers)(string);\n    default:\n      return valueToNumberAndUnit(string);\n  }\n}\n\nconst colourToCSSString = ([r, g, b, a]) => `rgba(${r}, ${g}, ${b}, ${a})`;\nconst valueToCSSString = (val, unit) => `${val}${unit}`;\n\n/* Easing functions */\n\nconst lerp = (a, b, frac) => a + ((b - a) * frac);\n\nconst easeArray = (array, easeFn, frac) => {\n  let total = frac * (array.length - 1);\n  let start = Math.min(Math.floor(total), array.length - 1);\n  let end = Math.min(start + 1, array.length - 1);\n  return easeFn(array[start], array[end], total % 1);\n}\n\n/* Property calculation function-generation functions */\n\nconst transpose = (array) => {\n  return array[0].map((_, i) => array.map(r => r[i]));  \n}\n\nconst propValueToFunction = (propValue) => {\n  let k = propValue.map(s => tryGetValue(s));\n  if (k[0].length === 2){\n    // CSS unit property (either like '12px' or like '1.0'\n    let unit = k[0][1];\n    let values = k.map(v => v[0]);\n    return (frac) => valueToCSSString(easeArray(values, lerp, frac), unit)\n  } else {\n    // Colour in [[r, g, b, a],...] format \n    let k_t = transpose(k);\n    return (frac) => colourToCSSString(k_t.map(c => easeArray(c, lerp, frac)))  \n  } \n}\n\nconst selectorMap = {\n  'character': 1,\n  'word': /\\w+/g\n}\n\nconst buildOffsets = (text, selector) => {\n  if (typeof selector === 'string') { selector = selectorMap[selector] }\n  \n  if (typeof selector === 'number') {\n    return buildChunksOfN(text, selector);\n  } else {\n    return buildChunksFromRegex(text, selector);  \n  }\n}\n\nconst buildChunksOfN = (text, n) => {\n  let offsets = [];\n  let chunks = text.length / n;\n  \n  for(let i = 0; i < Math.floor(chunks); i++) {\n    offsets.push([i * n, (i + 1) * n]);  \n  }\n  \n  if (text.length % n !== 0){\n    let last = offsets[offsets.length - 1];\n    offsets.push([last[1], last[1] + (text.length % n)]);\n  }\n  return offsets;\n}\n\nconst buildChunksFromRegex = (text, pattern) => {\n  let offsets = [];\n  let prev = 0;\n  let m;\n  do {\n    m = pattern.exec(text);\n    if (m) {      \n      let next = m.index;\n      // Push in-between match\n      if (next > prev) {\n        offsets.push([prev, next]);  \n      }\n      let end = m.index + m[0].length;\n      offsets.push([m.index, end]);\n      prev = end;\n    }\n  } while (m);\n  \n  // Cleanup remainder\n  let final = offsets[offsets.length - 1];\n  if (final[1] < text.length) {\n    offsets.push([final[1], text.length]);  \n  }\n  \n  return offsets;\n}\n\nconst positionFromNode = (element, xOffset, yOffset) => {\n  let rect = element.getBoundingClientRect();\n  return { x: rect.x + xOffset, y: rect.y + yOffset}\n}\n\n//# sourceURL=webpack://letterbomb/./src/js/utilities.js?");

/***/ })

/******/ })["default"];
});