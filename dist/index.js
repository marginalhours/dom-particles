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
      return 1000;
    },
    getText: function getText(emitter) {
      return '▓';
    },
    getPosition: function getPosition() {
      return { x: 125, y: 80 };
    },
    getVelocity: function getVelocity() {
      return { x: 0, y: -10 };
    },
    onCreate: function onCreate(p) {
      p.setStyle({ fontSize: 14 });
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pool = __webpack_require__(2);

var _pool2 = _interopRequireDefault(_pool);

var _text_particle = __webpack_require__(3);

var _text_particle2 = _interopRequireDefault(_text_particle);

var _text_particle_emitter = __webpack_require__(4);

var _text_particle_emitter2 = _interopRequireDefault(_text_particle_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextParticleManager = function () {
  function TextParticleManager(options) {
    _classCallCheck(this, TextParticleManager);

    var _ref = options || { max: 100, preallocate: 100 },
        max = _ref.max,
        preallocate = _ref.preallocate;

    this.max = max;
    this.foldElement = document.createElement('div');
    this.foldElement.className = 'text-particle-manager-reservoir';
    Object.assign(this.foldElement.style, { width: 0, height: 0 });
    document.body.appendChild(this.foldElement);
    this.pool = new _pool2.default({ tagName: 'span', preallocate: preallocate, container: this.foldElement });
    this.particles = [];
    this.emitters = [];
  }

  _createClass(TextParticleManager, [{
    key: 'createParticle',
    value: function createParticle(options) {
      if (this.particles.length < this.max) {
        this.particles.push(new _text_particle2.default(_extends({}, options, { el: this.pool.pop() })));
      }
    }
  }, {
    key: 'createEmitter',
    value: function createEmitter(options) {
      this.emitters.push(new _text_particle_emitter2.default(_extends({}, options, { manager: this })));
    }
  }, {
    key: 'update',
    value: function update(dt) {
      var _this = this;

      var f = dt / 1000;
      this.particles = this.particles.filter(function (p) {
        p.update(f);
        if (p.alive) {
          return true;
        }

        // disappear and return to pool
        p.el.style.opacity = 0;
        _this.pool.push(p.el);
        return false;
      });

      this.emitters = this.emitters.filter(function (e) {
        e.update(f);
        if (e.alive) {
          return true;
        }
        return false;
      });
    }
  }]);

  return TextParticleManager;
}();

exports.default = TextParticleManager;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pool = function () {
  function Pool(options) {
    _classCallCheck(this, Pool);

    var tagName = options.tagName,
        preallocate = options.preallocate,
        container = options.container;


    this.tagName = tagName.toLowerCase();
    this.container = container;

    this._pool = [];
    this.allocate(preallocate || 10);
  }

  _createClass(Pool, [{
    key: 'push',
    value: function push(el) {
      if (el.tagName.toLowerCase() === this.tagName) {
        this._pool.push(el);
      } else {
        throw el.tagName + ' is not of type ' + this.tagName + '!';
      }
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

      this.container.appendChild(el);
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

  return Pool;
}();

exports.default = Pool;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PARTICLE_OPTIONS = {
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  ttl: 1000,
  text: '.',
  onCreate: function onCreate() {},
  onUpdate: function onUpdate() {},
  heading: 0,
  scale: { x: 1, y: 1 }
};

var TextParticle = function () {
  function TextParticle(options) {
    _classCallCheck(this, TextParticle);

    Object.defineProperties(this, _extends({}, DEFAULT_PARTICLE_OPTIONS, options));

    this.elapsed = 0;
    this.setText(this.text);
    this.updateTransform();
    this.el.style.opacity = 1;
    this.onCreate(this);
  }

  _createClass(TextParticle, [{
    key: 'setStyle',
    value: function setStyle(styleObject) {
      Object.assign(this.el.style, styleObject);
    }
  }, {
    key: 'setText',
    value: function setText(text) {
      this.el.innerText = text;
    }
  }, {
    key: 'lerp',
    value: function lerp(a, b) {
      return a + (b - a) * this.lifeFrac;
    }
  }, {
    key: 'updateTransform',
    value: function updateTransform() {
      this.el.style.transform = 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0) rotateZ(' + this.heading + 'rad) scale(' + this.scale.x + ', ' + this.scale.y + ')';
    }
  }, {
    key: 'update',
    value: function update(f) {
      this.elapsed += f * 1000;
      this.velocity.x += this.acceleration.x * f;
      this.velocity.y += this.acceleration.y * f;
      this.position.x += this.velocity.x * f;
      this.position.y += this.velocity.y * f;

      this.onUpdate(this);

      this.updateTransform();
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_EMITTER_OPTIONS = {
  emitEvery: 500,
  getParticleTTL: function getParticleTTL() {
    return 1000;
  },
  getText: function getText() {
    return '.';
  },
  getVelocity: function getVelocity() {
    return { x: 0, y: -10 };
  },
  getAcceleration: function getAcceleration() {
    return { x: 0, y: 0 };
  },
  onCreate: function onCreate() {},
  onUpdate: function onUpdate() {}

};

var TextParticleEmitter = function () {
  function TextParticleEmitter(options) {
    _classCallCheck(this, TextParticleEmitter);

    Object.defineProperties(this, _extends({}, DEFAULT_EMITTER_OPTIONS, { options: options }));
    this.manager = options.manager;
    this.totalElapsed = 0;
    this.elapsed = this.emitEvery;
    this.emitted = 0;
  }

  _createClass(TextParticleEmitter, [{
    key: 'update',
    value: function update(f) {
      this.elapsed += f * 1000;
      this.totalElapsed += f * 1000;
      if (this.elapsed > this.emitEvery) {
        this.elapsed = 0;
        this.emitted++;
        // emit particle
        this.manager.createParticle({
          position: this.getPosition(this),
          velocity: this.getVelocity(this),
          acceleration: this.getAcceleration(this),
          ttl: this.getParticleTTL(this),
          text: this.getText(this),
          onCreate: this.onCreate,
          onUpdate: this.onUpdate
        });
      }
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