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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* Useful regexes */
var RGB_PATTERN = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
var RGBA_PATTERN = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([01](?:\.\d+)*)\s*\)/;
var HEX_PATTERN = /#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})/;
var NUMBER_AND_UNIT_PATTERN = /(\d+\.\d+|\d+)([a-z]+)?/;

/* CSS to internal format import / export */

var rgbToNumbers = exports.rgbToNumbers = function rgbToNumbers(string) {
  try {
    var _RGB_PATTERN$exec = RGB_PATTERN.exec(string),
        _RGB_PATTERN$exec2 = _slicedToArray(_RGB_PATTERN$exec, 4),
        _ = _RGB_PATTERN$exec2[0],
        r = _RGB_PATTERN$exec2[1],
        g = _RGB_PATTERN$exec2[2],
        b = _RGB_PATTERN$exec2[3];

    return [].concat(_toConsumableArray([r, g, b].map(function (v) {
      return parseInt(v);
    })), [1.0]);
  } catch (err) {
    console.log(err);
    return false;
  }
};

var rgbaToNumbers = exports.rgbaToNumbers = function rgbaToNumbers(string) {
  try {
    var _RGBA_PATTERN$exec = RGBA_PATTERN.exec(string),
        _RGBA_PATTERN$exec2 = _slicedToArray(_RGBA_PATTERN$exec, 5),
        _ = _RGBA_PATTERN$exec2[0],
        r = _RGBA_PATTERN$exec2[1],
        g = _RGBA_PATTERN$exec2[2],
        b = _RGBA_PATTERN$exec2[3],
        a = _RGBA_PATTERN$exec2[4];

    return [r, g, b, a].filter(function (v) {
      return v;
    }).map(function (v) {
      return parseInt(v);
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

var hexToNumbers = exports.hexToNumbers = function hexToNumbers(string) {
  try {
    var _HEX_PATTERN$exec = HEX_PATTERN.exec(string),
        _HEX_PATTERN$exec2 = _slicedToArray(_HEX_PATTERN$exec, 4),
        _ = _HEX_PATTERN$exec2[0],
        r = _HEX_PATTERN$exec2[1],
        g = _HEX_PATTERN$exec2[2],
        b = _HEX_PATTERN$exec2[3];

    return [].concat(_toConsumableArray([r, g, b].map(function (x) {
      return parseInt(x, 16) * (x.length === 1 ? 0x11 : 0x1);
    })), [1.0]);
  } catch (err) {
    console.log(err);
    return false;
  }
};

var valueToNumberAndUnit = exports.valueToNumberAndUnit = function valueToNumberAndUnit(string) {
  var _NUMBER_AND_UNIT_PATT = NUMBER_AND_UNIT_PATTERN.exec(string),
      _NUMBER_AND_UNIT_PATT2 = _slicedToArray(_NUMBER_AND_UNIT_PATT, 3),
      _ = _NUMBER_AND_UNIT_PATT2[0],
      num = _NUMBER_AND_UNIT_PATT2[1],
      unit = _NUMBER_AND_UNIT_PATT2[2];

  return [parseInt(num), unit || ''];
};

var tryGetValue = exports.tryGetValue = function tryGetValue(string) {
  switch (string[0]) {
    case '#':
      return hexToNumbers(string);
    case 'r':
      return (string[3] === 'a' ? rgbaToNumbers : rgbToNumbers)(string);
    default:
      return valueToNumberAndUnit(string);
  }
};

var colourToCSSString = exports.colourToCSSString = function colourToCSSString(_ref) {
  var _ref2 = _slicedToArray(_ref, 4),
      r = _ref2[0],
      g = _ref2[1],
      b = _ref2[2],
      a = _ref2[3];

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
};
var valueToCSSString = exports.valueToCSSString = function valueToCSSString(val, unit) {
  return '' + val + unit;
};

/* Easing functions */

var lerp = exports.lerp = function lerp(a, b, frac) {
  return a + (b - a) * frac;
};

var easeArray = exports.easeArray = function easeArray(array, easeFn, frac) {
  var total = frac * (array.length - 1);
  var start = Math.min(Math.floor(total), array.length - 1);
  var end = Math.min(start + 1, array.length - 1);
  return easeFn(array[start], array[end], total % 1);
};

/* Property calculation function-generation functions */

var transpose = exports.transpose = function transpose(array) {
  return array[0].map(function (_, i) {
    return array.map(function (r) {
      return r[i];
    });
  });
};

var styleValueToFunction = exports.styleValueToFunction = function styleValueToFunction(styleValue) {
  var k = styleValue.map(function (s) {
    return tryGetValue(s);
  });
  if (k[0].length === 2) {
    // CSS unit property (either like '12px' or like '1.0'
    var unit = k[0][1];
    var values = k.map(function (v) {
      return v[0];
    });
    return function (frac) {
      return valueToCSSString(easeArray(values, lerp, frac), unit);
    };
  } else {
    // Colour in [[r, g, b, a],...] format 
    var k_t = transpose(k);
    return function (frac) {
      return colourToCSSString(k_t.map(function (c) {
        return easeArray(c, lerp, frac);
      }));
    };
  }
};

var buildOffsets = exports.buildOffsets = function buildOffsets(text, selector) {
  // finds all offsets in text when split by selector
  var offsets = [];
  var m = void 0,
      prev = void 0;
  do {
    m = selector.exec(text);
    if (m) {
      var next = m.index;
      if (next > prev + 1) {
        offsets.push([prev + 1, next - 1]);
      }
      var end = m.index + m[0].length;
      offsets.push([m.index, end]);

      prev = end;
    }
  } while (m);
  return offsets;
};

var positionFromNode = exports.positionFromNode = function positionFromNode(element, xOffset, yOffset) {
  var rect = element.getBoundingClientRect();
  return { x: rect.x + xOffset, y: rect.y + yOffset };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PARTICLE_OPTIONS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* Fix scaling! */

var _utilities = __webpack_require__(0);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PARTICLE_OPTIONS = exports.DEFAULT_PARTICLE_OPTIONS = {
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  heading: 0,
  ttl: 1000,
  text: '.',
  grid: false,
  style: {},
  onCreate: function onCreate() {},
  onUpdate: function onUpdate() {}
};

var TextParticle = function () {
  function TextParticle(options) {
    _classCallCheck(this, TextParticle);

    Object.assign(this, _extends({}, DEFAULT_PARTICLE_OPTIONS, options));

    this.elapsed = 0;
    this.frameNumber = 0;
    this.updateTransform = this.grid ? this.updateGridTransform : this.updateTransform;

    // By default, at this point opacity will be 0, so set it to 1
    this.element.style.opacity = 1;
    // Populate initial text content
    this.setText(this.text);

    // Fetch initial style snapshot, call user onCreate(), assign styles
    this.buildStyles(this.style);
    this.nextStyles = this.getStyleSnapshot();
    this.onCreate(this);
    Object.assign(this.element.style, this.nextStyles);
  }

  _createClass(TextParticle, [{
    key: 'buildStyles',
    value: function buildStyles(styleObject) {
      var fixedStyles = {};
      var dynamicStyles = {};

      Object.keys(styleObject).map(function (styleKey) {
        var styleValue = styleObject[styleKey];
        if (Array.isArray(styleValue)) {
          if (styleValue.length === 1) {
            // It's a one-element array, so it's still fixed
            fixedStyles[styleKey] = styleValue;
          } else {
            // dynamic style, calculate function for it
            dynamicStyles[styleKey] = (0, _utilities.styleValueToFunction)(styleValue);
          }
        } else if ((typeof styleValue === 'undefined' ? 'undefined' : _typeof(styleValue)) === 'object') {
          // Not implemented yet, but I guess per-property easing (>.<)
        } else {
          // assume fixed style, just assign it
          fixedStyles[styleKey] = styleValue;
        }
      });

      this.dynamicStyles = dynamicStyles;
      this.fixedStyles = fixedStyles;
    }
  }, {
    key: 'setText',
    value: function setText(text) {
      this.element.innerText = text;
    }
  }, {
    key: 'getStyleSnapshot',
    value: function getStyleSnapshot() {
      var _this = this;

      var lifeFrac = this.lifeFrac;

      var snapshot = Object.keys(this.dynamicStyles).reduce(function (a, b) {
        var styleFn = _this.dynamicStyles[b];
        return _extends({}, a, _defineProperty({}, b, styleFn(lifeFrac)));
      }, _extends({}, this.fixedStyles));

      return _extends({}, snapshot, { transform: this.getScaledTransform(snapshot) });
    }
  }, {
    key: 'getScaledTransform',
    value: function getScaledTransform(snapshot) {
      var scaleX = snapshot.scaleX,
          scaleY = snapshot.scaleY,
          scale = snapshot.scale;

      scale = scale || 1.0;
      scaleX = scaleX || scale;
      scaleY = scaleY || scale;

      return this.getTransform(scaleX, scaleY);
    }
  }, {
    key: 'getTransform',
    value: function getTransform(scaleX, scaleY) {
      return 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0) rotateZ(' + this.heading + 'rad) scale(' + scaleX + ', ' + scaleY + ')';
    }
  }, {
    key: 'getGridTransform',
    value: function getGridTransform(scaleX, scaleY) {
      var x = this.position.x - this.position.x % this.grid;
      var y = this.position.y - this.position.y % this.grid;
      return 'translate3d(' + x + 'px, ' + y + 'px, 0) rotateZ(' + this.heading + 'rad) scale(' + this.scale.x + ', ' + this.scale.y + ')';
    }
  }, {
    key: 'update',
    value: function update(f) {
      // Housekeeping
      this.elapsed += f * 1000;
      this.frameNumber++;

      // Standard motion update
      this.velocity.x += this.acceleration.x * f;
      this.velocity.y += this.acceleration.y * f;
      this.position.x += this.velocity.x * f;
      this.position.y += this.velocity.y * f;

      // Get current style, call user onUpdate(), assign them
      this.nextStyles = this.getStyleSnapshot();
      this.onUpdate(this);
      Object.assign(this.element.style, this.nextStyles);
    }
  }, {
    key: 'alive',
    get: function get() {
      return this.elapsed < this.ttl;
    }
  }, {
    key: 'lifeFrac',
    get: function get() {
      return this.elapsed / this.ttl;
    }
  }]);

  return TextParticle;
}();

exports.default = TextParticle;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _text_particle_manager = __webpack_require__(3);

var _text_particle_manager2 = _interopRequireDefault(_text_particle_manager);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var t = new _text_particle_manager2.default({ max: 10000 });

var c = { x: document.body.clientWidth / 2, y: document.body.clientHeight / 2 };
var GRAVITY = 0.1;

var HEAT_COLOURS = [[0, 0, 0, 1.0], // out
[31, 0, 0, 1.0], // even fainter
[61, 12, 8, 1.0], // faint red
[98, 12, 11, 1.0], // blood red
[167, 18, 14, 1.0], // dark cherry
[220, 25, 21, 1.0], // medium cherry 
[232, 39, 24, 1.0], // cherry
[255, 54, 28, 1.0], // bright cherry
[255, 72, 24, 1.0], // salmon
[255, 105, 16, 1.0], // dark orange
[255, 166, 36, 1.0], // orange
[255, 246, 79, 1.0], // lemon
[255, 253, 148, 1.0], // light yellow
[254, 254, 200, 1.0], // white
[254, 254, 254, 1.0]].reverse();

document.querySelector('button').addEventListener('click', function (e) {
  t.addEmitter({
    position: { x: e.clientX, y: e.clientY },
    emitEvery: 100,
    maxEmissions: 1,
    particleOptions: {
      get position() {
        return { x: 0, y: 0 };
      },
      text: '>',
      style: {
        width: '16px',
        height: '16px',
        borderRadius: '16px',
        color: '#fff',
        fontWeight: 'bold',
        textShadow: '1px 1px 1px #f00',
        scale: [1, 2],
        translateX: [0, 10],
        translateY: [0, 10]
      },
      velocity: { x: 0, y: -50 }
    }
  });
  // t.from(document.querySelector('p'), /\w+/g);
});

// t.createEmitter({
//   position: { x: document.body.clientWidth / 2 - 50, y: document.body.clientHeight / 2},
//   emitEvery: 2,
//   particleOptions: {
//     grid: 16,
//     get ttl () { return 1500 },
//     get text () { return ['#', '!', '$', '%', '?'][Math.floor(5 * Math.random())]},
//     /* particle position getter is relative to emitter position */
//     get position () { return { x: 100 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
//     get velocity () { return { x: 0, y: -50 } },
//     style: { color: HEAT_COLOURS.map(c => colourToCSSString(c)), fontSize: ['24px', '12px'] },
//     onUpdate: (p) => {
//       if (p.frameNumber % 30 === 0){
//         p.setText(['#', '!', '$', '%', '?'][Math.floor(5 * Math.random())]);
//       }
//     }
//   },
// });

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _text_particle = __webpack_require__(1);

var _text_particle2 = _interopRequireDefault(_text_particle);

var _text_particle_emitter = __webpack_require__(4);

var _text_particle_emitter2 = _interopRequireDefault(_text_particle_emitter);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_TPM_OPTIONS = {
  max: 100,
  preallocate: 10,
  tagName: 'span',
  autoStart: true
};

var TextParticleManager = function () {
  function TextParticleManager(options) {
    _classCallCheck(this, TextParticleManager);

    Object.assign(this, _extends({}, DEFAULT_TPM_OPTIONS, options));

    this._pool = [];
    this.particles = [];
    this.emitters = [];

    this.foldElement = document.createElement('div');
    this.foldElement.className = 'text-particle-manager-reservoir';
    Object.assign(this.foldElement.style, { width: 0, height: 0, position: 'absolute', top: 0, left: 0 });

    this.allocate(this.preallocate);
    document.body.appendChild(this.foldElement);

    this.frameStart = null;
  }

  _createClass(TextParticleManager, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.raf = requestAnimationFrame(function (t) {
        return _this.update(t);
      });
    }
  }, {
    key: 'update',
    value: function update(timestamp) {
      var _this2 = this;

      if (!this.frameStart) this.frameStart = timestamp;
      var dt = timestamp - this.frameStart;
      this.frameStart = timestamp;
      var f = dt / 1000;

      this.particles = this.particles.filter(function (p) {
        p.update(f);
        if (p.alive) {
          return true;
        }

        // disappear and return to pool
        p.element.style.opacity = 0;
        _this2.push(p.element);
        return false;
      });

      this.emitters = this.emitters.filter(function (e) {
        e.update(f);
        return e.alive;
      });

      if (this.emitters.length === 0 && this.particles.length === 0) {
        cancelAnimationFrame(this.raf);
        this.raf = false;
      } else {
        requestAnimationFrame(function (t) {
          return _this2.update(t);
        });
      }
    }
  }, {
    key: 'addParticle',
    value: function addParticle(options) {
      if (this.particles.length < this.max) {
        var p = this.particles.push(new _text_particle2.default(_extends({}, options, { element: this.pop() })));
        if (!this.raf && this.autoStart) {
          this.start();
        }
        return p;
      }
    }
  }, {
    key: 'addEmitter',
    value: function addEmitter(options) {
      var e = this.emitters.push(new _text_particle_emitter2.default(_extends({}, options, { manager: this })));
      if (!this.raf && this.autoStart) {
        this.start();
      }
      return e;
    }
  }, {
    key: 'from',
    value: function from(element, pattern, options) {
      var offsets = (0, _utilities.buildOffsets)(element.innerText, pattern);
      // at this point, range.setStart() and setEnd() will give you your wrapped object, then we can start playing with it.
    }
  }, {
    key: 'push',
    value: function push(el) {
      this._pool.push(el);
    }
  }, {
    key: 'pop',
    value: function pop(el) {
      if (this._pool.length > 0) {
        return this._pool.pop();
      } else {
        return this.create();
      }
    }
  }, {
    key: 'create',
    value: function create() {
      var el = document.createElement(this.tagName);

      Object.assign(el.style, {
        display: 'block',
        position: 'absolute',
        pointerEvents: 'none',
        transform: 'translate3d(0,0,0)',
        opacity: 0
      });

      this.foldElement.appendChild(el);
      return el;
    }
  }, {
    key: 'allocate',
    value: function allocate(n) {
      if (this._pool.length < n) {
        for (var i = this._pool.length; i < n; i++) {
          this.push(this.create());
        }
      }
    }
  }]);

  return TextParticleManager;
}();

exports.default = TextParticleManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _text_particle = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_EMITTER_OPTIONS = {
  emitEvery: 500,
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  onCreate: function onCreate() {},
  onUpdate: function onUpdate() {},
  particleOptions: _text_particle.DEFAULT_PARTICLE_OPTIONS,
  MAX_EMIT_PER_STEP: 10 /* Prevent thundering herds on tab switch */
};

var TextParticleEmitter = function () {
  function TextParticleEmitter(options) {
    _classCallCheck(this, TextParticleEmitter);

    Object.assign(this, _extends({}, DEFAULT_EMITTER_OPTIONS, options));

    this.manager = options.manager;
    this.totalElapsed = 0;
    this.elapsed = this.emitEvery;
    this.emitted = 0;

    this.onCreate(this);
  }

  _createClass(TextParticleEmitter, [{
    key: 'update',
    value: function update(f) {
      // position update
      this.velocity.x += this.acceleration.x * f;
      this.velocity.y += this.acceleration.y * f;
      this.position.x += this.velocity.x * f;
      this.position.y += this.velocity.y * f;

      // emission update
      this.elapsed += f * 1000;
      this.totalElapsed += f * 1000;
      if (this.elapsed > this.emitEvery) {
        var toEmit = Math.floor(this.elapsed / this.emitEvery);
        toEmit = Math.min(toEmit, this.MAX_EMIT_PER_STEP);

        if (this.maxEmissions) {
          toEmit = Math.min(this.maxEmissions - this.emitted, toEmit);
        }
        this.elapsed = 0;

        for (var i = 0; i < toEmit; i++) {
          // emit particle
          this.emitted++;
          var p = this.particleOptions.position;
          var pp = { x: this.position.x + p.x, y: this.position.y + p.y };
          this.manager.addParticle(_extends({}, this.particleOptions, { position: pp }));
        }
      }

      // user-provided update
      this.onUpdate(this);
    }
  }, {
    key: 'alive',
    get: function get() {
      if (this.maxEmissions && this.emitted >= this.maxEmissions) {
        return false;
      }
      if (this.ttl && this.totalElapsed >= this.ttl) {
        return false;
      }
      return true;
    }
  }]);

  return TextParticleEmitter;
}();

exports.default = TextParticleEmitter;

/***/ })
/******/ ]);