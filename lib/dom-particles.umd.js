(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DomParticles = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /* Useful regexes */
  var RGB_PATTERN = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
  var RGBA_PATTERN = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([01](?:\.\d+)*)\s*\)/;
  var HEX_PATTERN = /#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})/;
  var NUMBER_AND_UNIT_PATTERN = /(\d+\.\d+|\d+)([a-z]+)?/;
  /* CSS to internal format import / export */

  var rgbToNumbers = function rgbToNumbers(string) {
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
      console.warn("Invalid RGB value: ".concat(string));
      return false;
    }
  };
  var rgbaToNumbers = function rgbaToNumbers(string) {
    try {
      var _RGBA_PATTERN$exec = RGBA_PATTERN.exec(string),
          _RGBA_PATTERN$exec2 = _slicedToArray(_RGBA_PATTERN$exec, 5),
          _ = _RGBA_PATTERN$exec2[0],
          r = _RGBA_PATTERN$exec2[1],
          g = _RGBA_PATTERN$exec2[2],
          b = _RGBA_PATTERN$exec2[3],
          a = _RGBA_PATTERN$exec2[4];

      return [].concat(_toConsumableArray([r, g, b].map(function (v) {
        return parseInt(v);
      })), [parseFloat(a)]);
    } catch (err) {
      console.warn("Invalid RGBA value: ".concat(string));
      return false;
    }
  };
  var hexToNumbers = function hexToNumbers(string) {
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
      console.warn("Invalid hex value: ".concat(string));
      return false;
    }
  };
  var valueToNumberAndUnit = function valueToNumberAndUnit(string) {
    try {
      var _NUMBER_AND_UNIT_PATT = NUMBER_AND_UNIT_PATTERN.exec(string),
          _NUMBER_AND_UNIT_PATT2 = _slicedToArray(_NUMBER_AND_UNIT_PATT, 3),
          _ = _NUMBER_AND_UNIT_PATT2[0],
          num = _NUMBER_AND_UNIT_PATT2[1],
          unit = _NUMBER_AND_UNIT_PATT2[2];

      return [parseFloat(num), unit || ""];
    } catch (err) {
      console.warn("Invalid CSS unit string: ".concat(string));
      return false;
    }
  };
  var tryGetValue = function tryGetValue(string) {
    switch (string[0]) {
      case "#":
        return hexToNumbers(string);

      case "r":
        return (string[3] === "a" ? rgbaToNumbers : rgbToNumbers)(string);

      default:
        return valueToNumberAndUnit(string);
    }
  };
  var colourToCSSString = function colourToCSSString(_ref) {
    var _ref2 = _slicedToArray(_ref, 4),
        r = _ref2[0],
        g = _ref2[1],
        b = _ref2[2],
        a = _ref2[3];

    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
  };
  var valueToCSSString = function valueToCSSString(val, unit) {
    return "".concat(val).concat(unit);
  };
  /* Easing functions */

  var lerp = function lerp(a, b, frac) {
    return a + (b - a) * frac;
  };
  var easeArray = function easeArray(array, easeFn, frac) {
    var total = frac * (array.length - 1);
    var start = Math.min(Math.floor(total), array.length - 1);
    var end = Math.min(start + 1, array.length - 1);
    return easeFn(array[start], array[end], total % 1);
  };
  /* Property calculation function-generation functions */

  var transpose = function transpose(array) {
    return array[0].map(function (_, i) {
      return array.map(function (r) {
        return r[i];
      });
    });
  };
  var propValueToFunction = function propValueToFunction(propValue) {
    var k = propValue.map(function (s) {
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

  var utilities = /*#__PURE__*/Object.freeze({
    __proto__: null,
    rgbToNumbers: rgbToNumbers,
    rgbaToNumbers: rgbaToNumbers,
    hexToNumbers: hexToNumbers,
    valueToNumberAndUnit: valueToNumberAndUnit,
    tryGetValue: tryGetValue,
    colourToCSSString: colourToCSSString,
    valueToCSSString: valueToCSSString,
    lerp: lerp,
    easeArray: easeArray,
    transpose: transpose,
    propValueToFunction: propValueToFunction
  });

  var DEFAULT_PARTICLE_OPTIONS = {
    ttl: 1000,
    contents: ".",
    style: {
      display: "inline-block",
      zIndex: 1
    },
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    onDestroy: function onDestroy() {},
    heading: false,
    grid: false
  };

  var TextParticle = /*#__PURE__*/function () {
    function TextParticle(options) {
      _classCallCheck(this, TextParticle);

      Object.assign(this, _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_PARTICLE_OPTIONS), options), {}, {
        velocity: _objectSpread2(_objectSpread2({}, {
          x: 0,
          y: 0
        }), options.velocity),
        position: _objectSpread2(_objectSpread2({}, {
          x: 0,
          y: 0
        }), options.position),
        acceleration: _objectSpread2(_objectSpread2({}, {
          x: 0,
          y: 0
        }), options.acceleration),
        style: _objectSpread2(_objectSpread2({}, DEFAULT_PARTICLE_OPTIONS.style), options.style)
      }));
      this.elapsed = 0;
      this.frameNumber = 0;
      this.getTransform = this.grid ? this.getGridTransform : this.getTransform;
      this.setContents(this.contents);
      this.updateStyle(this.style);
      this.nextProps = this.getSnapshot();
      this.onCreate(this); // scale is a valid property, but only in Firefox 😬
      // https://developer.mozilla.org/en-US/docs/Web/CSS/scale CSS2!
      // we don't want to assign it directly (it's used as part of transform),
      // so we delete it from nextProps

      delete this.nextProps.scale;
      Object.assign(this.element.style, this.nextProps);
    }

    _createClass(TextParticle, [{
      key: "alive",
      get: function get() {
        return !this.ttl || this.elapsed < this.ttl;
      }
    }, {
      key: "lifeFrac",
      get: function get() {
        return this.elapsed / this.ttl;
      }
    }, {
      key: "buildProps",
      value: function buildProps(propObject) {
        var fixedProps = {};
        var dynamicProps = {};
        Object.keys(propObject).map(function (propKey) {
          var propValue = propObject[propKey];

          if (Array.isArray(propValue)) {
            if (propValue.length === 1) {
              // It's a one-element array, so it's still fixed
              fixedProps[propKey] = propValue;
            } else {
              // dynamic property; calculate function for it
              dynamicProps[propKey] = propValueToFunction(propValue);
            }
          } else if ((typeof styleValue === "undefined" ? "undefined" : _typeof(styleValue)) === "object") ; else {
            // Either a fixed value or a getter, either way, just assign it
            fixedProps[propKey] = propValue;
          }
        });
        this.dynamicProps = _objectSpread2(_objectSpread2({}, this.dynamicProps), dynamicProps);
        this.fixedProps = _objectSpread2(_objectSpread2({}, this.fixedProps), fixedProps);
      }
    }, {
      key: "setContents",
      value: function setContents(html) {
        this.element.innerHTML = html;
      }
    }, {
      key: "setText",
      value: function setText(text) {
        this.element.innerText = text;
      }
    }, {
      key: "setStyleText",
      value: function setStyleText(text) {
        this.element.style.cssText = text;
      }
    }, {
      key: "updateStyle",
      value: function updateStyle(obj) {
        this.style = _objectSpread2(_objectSpread2({}, this.style), obj);
        this.buildProps(obj);
      }
    }, {
      key: "getSnapshot",
      value: function getSnapshot() {
        var _this = this;

        var snapshot = Object.keys(this.dynamicProps).reduce(function (a, b) {
          return _objectSpread2(_objectSpread2({}, a), {}, _defineProperty({}, b, _this.dynamicProps[b](_this.lifeFrac)));
        }, _objectSpread2({}, this.fixedProps));
        return _objectSpread2(_objectSpread2({}, snapshot), {}, {
          transform: this.getScaledTransform(snapshot)
        });
      }
    }, {
      key: "getScaledTransform",
      value: function getScaledTransform(snapshot) {
        var rotation = snapshot.rotation,
            scale = snapshot.scale,
            scaleX = snapshot.scaleX,
            scaleY = snapshot.scaleY,
            skew = snapshot.skew,
            skewX = snapshot.skewX,
            skewY = snapshot.skewY;
        rotation = this.heading && "".concat(this.heading, "rad") || rotation || 0;
        scale = scale || 1.0;
        scaleX = scaleX || scale;
        scaleY = scaleY || scale;
        skew = skew || 0;
        skewX = skewX || skew;
        skewY = skewY || skew;
        return this.getTransform(scaleX, scaleY, rotation, skewX, skewY);
      }
    }, {
      key: "getTransform",
      value: function getTransform(scaleX, scaleY, rotation, skewX, skewY) {
        return "translate3d(".concat(this.position.x, "px, ").concat(this.position.y, "px, 0px) rotateZ(").concat(rotation, ") scale(").concat(scaleX, ", ").concat(scaleY, ") skew(").concat(skewX, ", ").concat(skewY, ")");
      }
    }, {
      key: "getGridTransform",
      value: function getGridTransform(scaleX, scaleY, rotation, skewX, skewY) {
        var x = this.position.x - this.position.x % this.grid;
        var y = this.position.y - this.position.y % this.grid;
        return "translate3d(".concat(x, "px, ").concat(y, "px, 0px) rotateZ(").concat(rotation, ") scale(").concat(scaleX, ", ").concat(scaleY, ") skew(").concat(skewX, ", ").concat(skewY, ")");
      }
    }, {
      key: "update",
      value: function update(f) {
        // Housekeeping
        this.elapsed += f * 1000; // Standard motion update

        this.velocity.x += this.acceleration.x * f;
        this.velocity.y += this.acceleration.y * f;
        this.position.x += this.velocity.x * f;
        this.position.y += this.velocity.y * f; // Get current props, call user onUpdate(), assign them

        this.nextProps = this.getSnapshot();
        this.onUpdate(this, f);
        delete this.nextProps.scale;
        Object.assign(this.element.style, this.nextProps); // Next frame

        this.frameNumber++;
      }
    }]);

    return TextParticle;
  }();

  var DEFAULT_EMITTER_OPTIONS = {
    maxEmissions: false,
    ttl: false,
    emitEvery: 500,
    heading: 0,
    particleOptions: _objectSpread2({}, DEFAULT_PARTICLE_OPTIONS),
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    onDestroy: function onDestroy() {},
    MAX_EMIT_PER_STEP: 16
    /* Prevent thundering herds on tab switch */

  };

  var TextParticleEmitter = /*#__PURE__*/function () {
    function TextParticleEmitter(options) {
      _classCallCheck(this, TextParticleEmitter);

      options = options || {};
      Object.assign(this, _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_EMITTER_OPTIONS), options), {}, {
        position: _objectSpread2(_objectSpread2({}, {
          x: 0,
          y: 0
        }), options.position),
        velocity: _objectSpread2(_objectSpread2({}, {
          x: 0,
          y: 0
        }), options.velocity),
        acceleration: _objectSpread2(_objectSpread2({}, {
          x: 0,
          y: 0
        }), options.acceleration)
      }));
      this.manager = options.manager;
      this.elapsed = 0;
      this.emitted = 0;
      this.frameNumber = 0;
      this.onCreate(this);
    }

    _createClass(TextParticleEmitter, [{
      key: "alive",
      get: function get() {
        if (this.maxEmissions && this.emitted >= this.maxEmissions) {
          return false;
        }

        if (this.ttl && this.totalElapsed >= this.ttl) {
          return false;
        }

        return true;
      }
    }, {
      key: "update",
      value: function update(f) {
        // position update
        this.velocity.x += this.acceleration.x * f;
        this.velocity.y += this.acceleration.y * f;
        this.position.x += this.velocity.x * f;
        this.position.y += this.velocity.y * f; // emission update

        this.elapsed += 1000 * f;
        this.totalElapsed += 1000 * f;

        if (this.elapsed >= this.emitEvery) {
          var toEmit = Math.floor(this.elapsed / this.emitEvery);
          toEmit = Math.min(toEmit, this.MAX_EMIT_PER_STEP);

          if (this.maxEmissions) {
            toEmit = Math.min(this.maxEmissions - this.emitted, toEmit);
          }

          this.elapsed = 0;

          for (var i = 0; i < toEmit; i++) {
            var p = _objectSpread2(_objectSpread2({}, {
              x: 0,
              y: 0
            }), this.particleOptions.position);

            var pp = {
              x: this.position.x + p.x,
              y: this.position.y + p.y
            };

            var v = _objectSpread2(_objectSpread2({}, {
              x: 0,
              y: 0
            }), this.particleOptions.velocity);

            var v_angle = Math.atan2(v.y, v.x);
            var v_magna = Math.sqrt(v.x * v.x + v.y * v.y);
            var vv = {
              x: v_magna * Math.cos(v_angle + this.heading),
              y: v_magna * Math.sin(v_angle + this.heading)
            };
            this.manager.addParticle(_objectSpread2(_objectSpread2({}, this.particleOptions), {}, {
              position: pp,
              velocity: vv
            })); // emit particle

            this.emitted += 1;
          }

          this.frameNumber += 1;
        } // user-provided update


        this.onUpdate(this, f);
      }
    }]);

    return TextParticleEmitter;
  }();

  var DEFAULT_TPM_OPTIONS = {
    max: 100,
    preallocate: 10,
    tagName: "span",
    autostart: true
  };

  var TextParticleManager = /*#__PURE__*/function () {
    function TextParticleManager(options) {
      _classCallCheck(this, TextParticleManager);

      Object.assign(this, _objectSpread2(_objectSpread2({}, DEFAULT_TPM_OPTIONS), options));
      this.container = this.container || document.querySelector("body");
      this.container.style.position = "relative";
      this._pool = [];
      this._particles = [];
      this._emitters = [];
      this.foldElement = document.createElement("div");
      this.foldElement.className = "text-particle-manager-reservoir";
      this.foldElement.style.cssText = "position: absolute; width: 0; height: 0; top: 0; left: 0";
      this.reservoirCSS = "position: absolute; display: none; pointer-events: none; white-space: pre-wrap; transform: translate3d(0px, 0px, 0px); box-sizing: border-box;";

      this._allocate(this.preallocate);

      this.container.appendChild(this.foldElement);
      this.frameStart = null;
    }

    _createClass(TextParticleManager, [{
      key: "addParticle",
      value: function addParticle(options) {
        if (this._particles.length < this.max) {
          var p = new TextParticle(_objectSpread2(_objectSpread2({}, options), {}, {
            element: this._pop()
          }));

          this._particles.push(p);

          if (!this.raf && this.autostart) {
            this.start();
          }

          return p;
        }
      }
    }, {
      key: "addEmitter",
      value: function addEmitter(options) {
        var e = new TextParticleEmitter(_objectSpread2(_objectSpread2({}, options), {}, {
          manager: this
        }));

        this._emitters.push(e);

        if (!this.raf && this.autostart) {
          this.start();
        }

        return e;
      }
    }, {
      key: "start",
      value: function start() {
        var _this = this;

        this.frameStart = performance.now();
        this.raf = requestAnimationFrame(function () {
          return _this._update(_this.frameStart);
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        var _this2 = this;

        if (this.raf) {
          cancelAnimationFrame(this.raf);
        }

        this._particles.map(function (p) {
          p.setContents("");
          p.setStyleText(_this2.reservoirCSS);

          _this2._push(p.element);
        });

        this._particles = [];

        this._emitters.map(function (e) {
          return e.onDestroy(e);
        });

        this._emitters = [];
      }
    }, {
      key: "clearEmitters",
      value: function clearEmitters() {
        this._emitters.map(function (e) {
          return e.onDestroy(e);
        });

        this._emitters = [];
      }
    }, {
      key: "_update",
      value: function _update(timestamp) {
        var _this3 = this;

        var dt = timestamp - this.frameStart;
        this.frameStart = timestamp;
        var f = dt / 1000;
        var particlesToDestroy = [];
        this._particles = this._particles.filter(function (p) {
          p.update(f);

          if (!p.alive) {
            particlesToDestroy.push(p);
          }

          return p.alive;
        });
        particlesToDestroy.map(function (p) {
          // reset styles and return to pool
          p.onDestroy(p);
          p.setContents("");
          p.setStyleText(_this3.reservoirCSS);

          _this3._push(p.element);
        });
        var emittersToDestroy = [];
        this._emitters = this._emitters.filter(function (e) {
          e.update(f);

          if (!e.alive) {
            emittersToDestroy.push(e);
          }

          return e.alive;
        });
        emittersToDestroy.map(function (e) {
          return e.onDestroy(e);
        });

        if (this._emitters.length === 0 && this._particles.length === 0) {
          cancelAnimationFrame(this.raf);
          this.raf = false;
        } else {
          requestAnimationFrame(function (t) {
            return _this3._update(t);
          });
        }
      }
    }, {
      key: "_push",
      value: function _push(el) {
        this._pool.push(el);
      }
    }, {
      key: "_pop",
      value: function _pop(el) {
        if (this._pool.length > 0) {
          return this._pool.pop();
        } else {
          return this._create();
        }
      }
    }, {
      key: "_create",
      value: function _create() {
        var element = document.createElement(this.tagName);
        element.style.cssText = this.reservoirCSS;
        this.foldElement.appendChild(element);
        return element;
      }
    }, {
      key: "_allocate",
      value: function _allocate(n) {
        if (this._pool.length < n) {
          for (var i = this._pool.length; i < n; i++) {
            this._push(this._create());
          }
        }
      }
    }]);

    return TextParticleManager;
  }();

  TextParticleManager.utilities = utilities;

  return TextParticleManager;

})));
