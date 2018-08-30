webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var qs = exports.qs = function qs(selector) {
    return document.querySelector(selector);
};

/*
* HTML templating without tears (TM). Takes a template string with data-hook attributes on everything you want available on the object,
* and rehydrates it. After you call super() anything with a data-hook is available for function calls, etc.
*/

var Hookable = exports.Hookable = function Hookable(options) {
    var _this = this;

    _classCallCheck(this, Hookable);

    this.parent = options.parent;
    var container = document.createElement('div');
    this.parent.appendChild(container);

    container.innerHTML = options.template;
    var oldContainer = container;
    container = container.children[0];

    this.parent.replaceChild(container, oldContainer);

    [container].concat(_toConsumableArray(Array.prototype.slice.call(container.querySelectorAll('*[data-hook]'), 0))).map(function (el) {
        var hook = el.getAttribute('data-hook');
        _this[hook] = el;
    });
};

var shuffle = exports.shuffle = function shuffle(array) {
    var m = array.length,
        t = void 0,
        i = void 0;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bus = __webpack_require__(3);

var _bus2 = _interopRequireDefault(_bus);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _choice = __webpack_require__(16);

var _choice2 = _interopRequireDefault(_choice);

var _tile = __webpack_require__(17);

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Base card class (duh.)
// A card has two views into it (contents and tile)
// Plus functions that are called when it is entered / exited
var Card = function () {
  function Card(options) {
    _classCallCheck(this, Card);

    options = options || {};
    this.flavour = options.flavour || "An empty card";
  }

  _createClass(Card, [{
    key: 'buildContents',
    value: function buildContents(loop, container) {
      var _this = this;

      // Gets the expanded view
      // Default contents implementation is some flavour text plus a number of choices. 

      var _enter = this.enter(loop),
          flavour = _enter.flavour,
          options = _enter.options;

      var flavourEl = document.createElement('div');
      flavourEl.className = "flavour";
      flavourEl.innerText = flavour;

      var choiceList = document.createElement('div');
      choiceList.className = "choices-inner";

      options.map(function (_ref) {
        var callback = _ref.callback,
            label = _ref.label,
            effect = _ref.effect;

        new _choice2.default({
          parent: choiceList,
          handleClick: function handleClick() {
            callback();_this.exit(loop);
          },
          label: label,
          effect: effect
        });
      });

      container.innerHTML = '';
      container.appendChild(flavourEl);
      container.appendChild(choiceList);
    }
  }, {
    key: 'buildTile',
    value: function buildTile() {
      // Get the "small" representation of this card, for putting in the queue
      if (!this.tile) {
        this.tile = new _tile2.default({ card: this, position: -1 });
      }
      return this.tile;
    }
  }, {
    key: 'reposition',
    value: function reposition(rank, pointer, size) {
      this.tile.reposition(rank, pointer, size);
    }
  }, {
    key: 'enter',
    value: function enter(loop) {
      // method called on this card becoming the current one.
      var options = [];

      return {
        flavour: this.flavour,
        options: options
      };
    }
  }, {
    key: 'exit',
    value: function exit(loop) {
      // method called on card leaving stack. 
      _bus2.default.pub('tile-seen');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // clean up tile from DOM
      this.tile.destroy();
    }
  }]);

  return Card;
}();

exports.default = Card;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bus = __webpack_require__(3);

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Big dumb player object
var Player = {
  name: "",
  health: 15,
  max_health: 15,
  mana: 15,
  max_mana: 15,
  exp: 0,
  next_level: 1000,
  gold: 0,

  items: {
    "Potion of Healing": { "count": 1, "effect": "Heal", "callback": function callback(c) {
        c.changeResource("health", 5);
      }, "range": 0 }
  },

  changeResource: function changeResource(name, amount) {
    this[name] += amount;
    _bus2.default.pub(name + "-amount", this[name]);
  },

  attack: function attack(creature) {
    creature.health -= 1 + Math.floor(5 * Math.random());
  }
};

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Bus = {
	PRELOAD: 0,
	RUNNING: 1,
	PAUSED: 2,
	/* Overall state (see enum above) */
	state: 0,

	/* Events Pub/Sub stuff (for game logic) */
	topics: {},

	// returns a token that can be used to unsubscribe
	sub: function sub(topic, listener) {
		if (!this.topics[topic]) this.topics[topic] = [];
		var new_token = this.token();
		this.topics[topic].push({ func: listener, token: new_token });

		return new_token;
	},

	pub: function pub(topic, data) {
		if (!this.topics[topic] || this.topics[topic].length < 1) return;
		this.topics[topic].forEach(function (listener) {
			listener.func(data);
		});
	},

	token: function token() {
		return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2); // remove `0.`
	},

	unsub: function unsub(topic, token) {
		if (this.topics[topic]) {
			this.topics[topic] = this.topics[topic].filter(function (item) {
				return item.token !== token;
			});
		}
	},

	/* overall delta measurement */
	uptime: 0,

	update: function update(dt) {
		this.uptime += dt;
	},

	getTimestamp: function getTimestamp() {
		/* returns HH:MM:SS timestamp since game began */
		var hours = Math.floor(this.uptime / 36e5),
		    mins = Math.floor(this.uptime % 36e5 / 6e4),
		    secs = Math.floor(this.uptime % 6e4 / 1000);
		return ('0' + hours).slice(-2) + ':' + ('0' + mins).slice(-2) + ':' + ('0' + secs).slice(-2);
	},

	log: function log(content) {
		console.log("[" + this.getTimestamp() + "] " + content.entity + ": " + content.message);
	}
};

Bus.start = function () {
	Bus.state = Bus.RUNNING;
	Bus.busLog("starting game...");
	Bus.pub('game-start');
	Bus.onFrame();
};

var time = new Date().getTime();

Bus.onFrame = function () {
	// get immediate delta
	var now = new Date().getTime(),
	    dt = now - (time || now);
	time = now;

	switch (this.state) {
		case Bus.PRELOAD:
			break;
		case Bus.RUNNING:
			this.pub("update", dt);
			break;
		case Bus.PAUSED:
			break;
	}
	// load next frame
	requestAnimationFrame(this.onFrame);
};

Bus.onFrame = Bus.onFrame.bind(Bus);

Bus.busLog = function (msg) {
	Bus.log({
		entity: "Bus",
		message: msg
	});
};

// subscribe to updates to keep track of delta
Bus.sub("update", function (dt) {
	Bus.update(dt);
});

exports.default = Bus;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelOption = exports.retreatOption = exports.forwardOption = exports.backpackOption = undefined;

var _itemSelect = __webpack_require__(19);

var _itemSelect2 = _interopRequireDefault(_itemSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var backpackOption = exports.backpackOption = function backpackOption(loop) {
  return {
    label: "Item",
    effect: "Open backpack",
    callback: function callback() {
      loop.unshift(new _itemSelect2.default());
    }
  };
};

var forwardOption = exports.forwardOption = function forwardOption(loop) {
  return {
    label: "Forward!",
    effect: "",
    callback: function callback() {
      loop.next();
    }
  };
};

var retreatOption = exports.retreatOption = function retreatOption(loop) {
  return {
    label: "Retreat",
    effect: "",
    callback: function callback() {
      loop.previous();
    }
  };
};

var cancelOption = exports.cancelOption = function cancelOption(loop) {
  return {
    label: "Cancel",
    effect: "",
    callback: function callback() {
      loop.pop();
    }
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _ = __webpack_require__(1);

var _2 = _interopRequireDefault(_);

var _corpse = __webpack_require__(18);

var _corpse2 = _interopRequireDefault(_corpse);

var _optionsHelper = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// For combat and such.
var CreatureCard = function (_Card) {
  _inherits(CreatureCard, _Card);

  function CreatureCard(options) {
    _classCallCheck(this, CreatureCard);

    var _this = _possibleConstructorReturn(this, (CreatureCard.__proto__ || Object.getPrototypeOf(CreatureCard)).call(this, options));

    _this.creature = options.creature;
    _this.type = 'creature';
    return _this;
  }

  _createClass(CreatureCard, [{
    key: 'enter',
    value: function enter(loop) {
      var _this2 = this;

      // Combat! But there should be a penalty for using an item (creature gets free hit?)
      // Worth bearing in mind for after the item targeting thing is cleared.
      var options = [];

      options.push({
        label: "Attack",
        effect: "Deal damage to creature",
        callback: function callback() {
          loop.pop();
          _player2.default.attack(_this2.creature);

          if (_this2.creature.dead) {
            loop.unshift(new _corpse2.default());
          } else {
            loop.unshift(_this2);
          }
        }
      });

      options.push({
        label: "Rush past",
        effect: "Attempt to rush past the creature",
        callback: function callback() {
          loop.next();
        }
      });
      options.push((0, _optionsHelper.backpackOption)(loop));
      options.push((0, _optionsHelper.retreatOption)(loop));

      return {
        flavour: this.creature.description,
        options: options
      };
    }
  }, {
    key: 'exit',
    value: function exit(loop) {
      if (!this.creature.dead) {
        this.creature.attack(_player2.default);
      }
      // Call super.exit() to make sure we push the right cards...
      _get(CreatureCard.prototype.__proto__ || Object.getPrototypeOf(CreatureCard.prototype), 'exit', this).call(this, loop);
    }
  }]);

  return CreatureCard;
}(_2.default);

exports.default = CreatureCard;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(1);

var _2 = _interopRequireDefault(_);

var _optionsHelper = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CorridorCard = function (_Card) {
  _inherits(CorridorCard, _Card);

  function CorridorCard() {
    _classCallCheck(this, CorridorCard);

    var _this = _possibleConstructorReturn(this, (CorridorCard.__proto__ || Object.getPrototypeOf(CorridorCard)).call(this));

    _this.type = "corridor";
    return _this;
  }

  _createClass(CorridorCard, [{
    key: 'enter',
    value: function enter(loop) {
      return {
        flavour: "An empty corridor.",
        options: [(0, _optionsHelper.forwardOption)(loop), (0, _optionsHelper.backpackOption)(loop), (0, _optionsHelper.retreatOption)(loop)]
      };
    }
  }]);

  return CorridorCard;
}(_2.default);

exports.default = CorridorCard;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Creature = function () {
  function Creature() {
    _classCallCheck(this, Creature);

    this.health = 20;
    this.maxhealth = 20;
    this.name = 'Goblin';
  }

  _createClass(Creature, [{
    key: "changeResource",
    value: function changeResource(res, val) {
      this[res] += val;
    }
  }, {
    key: "attack",
    value: function attack(player) {
      player.changeResource("health", -1 - Math.floor(3 * Math.random()));
    }
  }, {
    key: "description",
    get: function get() {
      return this.health < this.maxhealth ? "A Wounded " + this.name + " (" + this.health + "/" + this.maxhealth + " HP)" : "A " + this.name;
    }
  }, {
    key: "dead",
    get: function get() {
      return this.health <= 0;
    }
  }]);

  return Creature;
}();

var getCreature = exports.getCreature = function getCreature() {
  return new Creature();
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _helpers = __webpack_require__(0);

var _bus = __webpack_require__(3);

var _bus2 = _interopRequireDefault(_bus);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _bar = __webpack_require__(14);

var _cardLoop = __webpack_require__(15);

var _dialogue = __webpack_require__(21);

var _cards = __webpack_require__(1);

var _level = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var h = new _bar.Bar({ parent: (0, _helpers.qs)('.status-wrappers'), name: "health" });
var k = new _bar.Bar({ parent: (0, _helpers.qs)('.status-wrappers'), name: "mana" });
var e = new _bar.Bar({ parent: (0, _helpers.qs)('.status-wrappers'), name: "experience" });

var a = new _cardLoop.CardLoop({ parent: (0, _helpers.qs)('.game') });
var s = new _cardLoop.CardLoop({ parent: (0, _helpers.qs)('.game') });
var d = new _dialogue.Dialogue({ parent: (0, _helpers.qs)('.game') });

(0, _helpers.qs)('.player-image').addEventListener('click', function () {
  if (!(s.peek().card instanceof _cards.CharacterSheet)) {
    s.unshift(new _cards.CharacterSheet());
    d.hydrate(s.peek());
  }
});

// create level
(0, _level.makeLevel0)().map(function (c) {
  return s.push(c);
});

d.setLoop(s);
d.hydrate(s.peek());

_bus2.default.sub('exp-amount', function (amount) {
  e.setText(amount + ' EXP');
  e.setPercentage(100 * _player2.default.exp / _player2.default.next_level);
});

_bus2.default.sub('health-amount', function (amount) {
  h.setText(_player2.default.health + '/' + _player2.default.max_health + ' HP');
  h.setPercentage(100 * _player2.default.health / _player2.default.max_health);
});

_bus2.default.sub('mana-amount', function (amount) {
  k.setText(_player2.default.mana + '/' + _player2.default.max_mana + ' MP');
  k.setPercentage(100 * _player2.default.mana / _player2.default.max_mana);
});

_bus2.default.pub('exp-amount', 0);
_bus2.default.pub('health-amount', 0);
_bus2.default.pub('mana-amount', 0);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap=true!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap=true!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)(true);
// imports


// module
exports.push([module.i, ".game {\n  width: 50%; }\n\n.header {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 100px 1fr; }\n\n.player-image {\n  height: 100px;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTI1MC44ODIgMjIuODAyYy0yMy4zNjYgMy4wMzUtNDQuNTUzIDMwLjQ0NC00NC41NTMgNjUuOTM1IDAgMTkuNTU4IDYuNzcxIDM2Ljg1NiAxNi42OTUgNDguODE1bDExLjg0IDE0LjI2My0xOC4yMTcgMy40MjRjLTEyLjkgMi40MjUtMjIuMzU4IDkuMjQtMzAuNDQzIDIwLjMzNi04LjA4NSAxMS4wOTctMTQuMjY2IDI2LjU1OC0xOC41OTggNDQuMzc1LTcuODQzIDMyLjI4LTkuNTY4IDcxLjY5My05Ljg0MiAxMDYuNDM2aDQyLjg2OGwxMS43NzEgMTU3LjgzNmMyOS44OTQgNi43NDggNjEuODExIDYuNTEgOTAuNjAyLjAyNWwxMC40MTQtMTU3Ljg2aDQwLjgxNmMtLjAyNy0zNS4xNjktLjQ3Ny03NS4xMjYtNy41ODQtMTA3LjY1LTMuOTE4LTE3LjkzNC05Ljg1OC0zMy4zNzItMTguMDQtNDQuMzQzLTguMTg1LTEwLjk3LTE4LjA4LTE3Ljc0NS0zMi41NjMtMTkuOTg5bC0xOC41OTItMi44OCAxMS43MzYtMTQuNzA0YzkuNDk1LTExLjg5NyAxNS45MzItMjguOTk3IDE1LjkzMi00OC4wODIgMC0zNy44MzgtMjMuNjU1LTY1Ljg0NC00OS4zOTktNjUuODQ0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==);\n  cursor: pointer; }\n\n.bar-outer {\n  height: 18px;\n  width: 100%;\n  position: relative;\n  margin-bottom: 2px; }\n  .bar-outer .progress-shadow {\n    background: #eee;\n    height: 100%;\n    position: absolute;\n    z-index: -1;\n    transition: width 500ms ease-in-out;\n    width: 100%; }\n  .bar-outer .progress {\n    height: 100%;\n    position: absolute;\n    transition: width 500ms ease-in-out;\n    z-index: -1; }\n  .bar-outer .readout {\n    font-weight: bold;\n    color: #fff;\n    font-size: 12px;\n    line-height: 1.5;\n    padding-left: 5px;\n    font-family: sans-serif;\n    z-index: 1; }\n  .bar-outer.health .readout {\n    text-shadow: 1px 1px #a00; }\n  .bar-outer.health .progress {\n    background: #d00; }\n  .bar-outer.mana .readout {\n    text-shadow: 1px 1px #00a; }\n  .bar-outer.mana .progress {\n    background: #00d; }\n  .bar-outer.experience .readout {\n    text-shadow: 1px 1px #aaa; }\n  .bar-outer.experience .progress {\n    background: #ddd; }\n\n.big-card {\n  display: grid;\n  margin-top: 10px;\n  grid-template-columns: 256px 1fr;\n  width: 100%;\n  height: 256px; }\n  .big-card .card-image {\n    border: 1px solid #333; }\n  .big-card .card-image-inner {\n    transition: background-image 0.5s ease-in-out;\n    width: 100%;\n    height: 100%; }\n  .big-card .content {\n    border: 1px solid #333; }\n  .big-card .choices-inner {\n    display: grid;\n    grid-row-gap: 5px;\n    padding: 5px; }\n    .big-card .choices-inner .choice-button {\n      cursor: pointer;\n      background: #fff;\n      border: 1px solid #333; }\n      .big-card .choices-inner .choice-button:hover {\n        color: #fff;\n        background: #000; }\n  .big-card .flavour {\n    background: #eee;\n    width: 100%;\n    font-style: italic;\n    box-sizing: border-box;\n    padding: 10px 10px;\n    text-align: center; }\n\n.creature-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTI1NiAzM2MtOC41IDAtMjEuMzE4IDUuNzQ1LTM1LjA2IDE2LjE3LTEzLjc0MyAxMC40MjUtMjguNDI5IDI1LjA1NS00Mi4xNjcgNDAuNzU2LTE5LjU5NyAyMi4zOTctMzcuMjYgNDcuMDUzLTQ4LjQxIDY0LjU5N2w0OS41ODIgMzcuMTg4IDQ5LjIzIDEyLjMwNyAyLjI4OC02Ljg2NCAxNy4wNzQgNS42OTItMTQuOTU3IDQ0Ljg3MyAyMi40MiA1Ni4wNSAyMi40Mi01Ni4wNS0xNC45NTctNDQuODczIDE3LjA3NC01LjY5MiAyLjI4NyA2Ljg2NCA0OS4yMy0xMi4zMDcgNDkuNTgzLTM3LjE4OGMtMTEuMTUtMTcuNTQ0LTI4LjgxMy00Mi4yLTQ4LjQxLTY0LjU5Ny0xMy43MzgtMTUuNy0yOC40MjQtMzAuMzMtNDIuMTY2LTQwLjc1NkMyNzcuMzE4IDM4Ljc0NSAyNjQuNSAzMyAyNTYgMzN6bS05MS40OSA5NS4yMTNsNzYgNDQtOS4wMiAxNS41NzQtNzYtNDR6bTE4Mi45OCAwbDkuMDIgMTUuNTc0LTc2IDQ0LTkuMDItMTUuNTc0ek0xNy4yMSAxNDYuNjI1YzMxLjgwNCAzMi45NzMgNjMuMjEzIDczLjQwOCA3Ni4zIDExMS44NTcgMS41OS0yLjcwOCAzLjM4LTUuMzMzIDUuMjkyLTcuODgyIDUuMDA5LTYuNjggMTEuMDM2LTEyLjk3MiAxNy4xNC0xOS4xNTMtOC45NS0xMi44ODQtMTEuNzUyLTI5LjA4OC0xMi42MDUtNDIuODg2LTI5LjMwOC0yNC4xNDItNTMuOTE2LTM3LjY5My04Ni4xMjctNDEuOTM2em00NzcuNTgyIDBjLTMyLjIxIDQuMjQzLTU2LjgxOSAxNy43OTQtODYuMTI3IDQxLjkzNi0uODUzIDEzLjc5OC0zLjY1NCAzMC4wMDItMTIuNjA1IDQyLjg4NiA2LjEwNCA2LjE4MSAxMi4xMzEgMTIuNDc0IDE3LjE0IDE5LjE1MyAxLjkxMiAyLjU1IDMuNzAzIDUuMTc0IDUuMjkxIDcuODgyIDEzLjA4OC0zOC40NDkgNDQuNDk3LTc4Ljg4NCA3Ni4zMDEtMTExLjg1N3ptLTM3My42NDUgMjMuNDg0Yy0uMDIzLjA0NS0uMDU0LjEtLjA3OC4xNDUuMTM3IDE2LjM3NiAyLjAwNyA0NC4wOTUgMTMuMjk1IDU1LjM4M2w2LjM2NCA2LjM2My02LjM2NCA2LjM2M2MtOCA4LTE1Ljc0IDE1LjgwNS0yMS4xNjQgMjMuMDM3LTQuNjg4IDYuMjUxLTcuMzI3IDExLjgyMy03Ljk2NSAxNi40NTJsODEuMTE4IDMwLjQxOGM0LjctNi44NDcgOS45MDQtMTMuMjUzIDE1LjI4NS0xOC42MzNsMTYuMDI5LTE2LjAzLS42NyAyMi42NTljLS4yNSA4LjQzMS0uMzgzIDE2LjEzMS0uMjMyIDIzLjQxbDMwLjg0IDExLjU2NEwyMTQuNzA3IDI0OWgtNTAuOThsLTEzLjM2NCAxMy4zNjMtMTIuNzI2LTEyLjcyNiAxMS4zMTItMTEuMzEzLTEzLjUzMS01Ny41MTJ6bTI2OS43MDggMGwtMTQuMjcyIDEwLjcwMy0xMy41MzEgNTcuNTEyIDExLjMxMiAxMS4zMTMtMTIuNzI2IDEyLjcyNkwzNDguMjczIDI0OWgtNTAuOThsLTMyLjg5NyA4Mi4yNCAzMC44NDItMTEuNTY2Yy4xNS03LjI3OC4wMTgtMTQuOTc4LS4yMzItMjMuNDA4bC0uNjcyLTIyLjY1OSAxNi4wMyAxNi4wM2M1LjM4IDUuMzggMTAuNTg0IDExLjc4OCAxNS4yODQgMTguNjM0bDU1LjE5Mi0yMC42OTcgMjUuOTI2LTkuNzIyYy0uNjM4LTQuNjMtMy4yNzctMTAuMi03Ljk2NS0xNi40NTItNS40MjQtNy4yMzItMTMuMTY0LTE1LjAzNy0yMS4xNjQtMjMuMDM3TDM3MS4yNzMgMjMybDYuMzY0LTYuMzYzYzExLjI4OC0xMS4yODggMTMuMTU4LTM5LjAwNyAxMy4yOTUtNTUuMzgzLS4wMjQtLjA0NS0uMDU1LS4xLS4wNzgtLjE0NXpNMTU3Ljg2NyAxOTcuNjVsNy44NDggMzMuMzVIMTgzdi0xOS45NzVsLTEwLjk0NS0yLjczNnptMTk2LjI2NiAwbC0xNC4xODggMTAuNjRMMzI5IDIxMS4wMjRWMjMxaDE3LjI4NXpNMjAxIDIxNS41MjVWMjMxaDE5LjE4bDMuMjg3LTkuODU3em0xMTAgMGwtMjIuNDY3IDUuNjE4TDI5MS44MiAyMzFIMzExem0tMjA1Ljc5MSA2Mi41MWExNi4yNSAxNi4yNSAwIDAgMC0uMTE3IDEuMjU2YzcuNzkgMzcuNDI0IDM0Ljk4NSA4OC40NjEgNjYuMDY2IDEyOS4yNTYgMTUuNjgyIDIwLjU4MiAzMi4zNCAzOC42NDkgNDcuNTgyIDUxLjI3MUMyMzMuOTgzIDQ3Mi40NDEgMjQ4IDQ3OSAyNTYgNDc5YzggMCAyMi4wMTctNi41NTkgMzcuMjYtMTkuMTgyIDE1LjI0Mi0xMi42MjIgMzEuOS0zMC42ODkgNDcuNTgyLTUxLjI3MSAzMS4wODEtNDAuNzk1IDU4LjI3Ny05MS44MzIgNjYuMDY2LTEyOS4yNTYtLjAyLS40MS0uMDYzLS44My0uMTE3LTEuMjU2bC00OC4wMjcgNzIuMDQzTDI1NiA0MzUuNzE1bC0xMDIuNzY0LTg1LjYzN3ptNDUuNzU2IDM2LjE4OGwxNS43OTkgMjMuNjk5IDIuOTY4IDIuNDc0YzEuNzUzLTUuNDA5IDQuMjU5LTEwLjkwNiA3LjE3Ni0xNi40NDV6bTIxMC4wNyAwbC0yNS45NDMgOS43MjhjMi45MTcgNS41MzkgNS40MjMgMTEuMDM2IDcuMTc2IDE2LjQ0NWwyLjk2OC0yLjQ3NHptLTE2Mi4xMjkgNy43M2MtMS43ODIgMi43Ni0zLjQ4IDUuNTU4LTUuMDA2IDguMzU2LTQuMjcgNy44My03LjE3NiAxNS43MTctOC4zMjggMjEuMjU1bDE5LjY3IDEzLjExNGMtNC4xMTYtMTQuMjMyLTUuODY0LTI4LjA0OC02LjMzNi00Mi43MjV6bTExNC4xODggMGMtLjQ3MiAxNC42NzctMi4yMiAyOC40OTMtNi4zMzYgNDIuNzI1bDE5LjY3LTEzLjExNGMtMS4xNTItNS41MzgtNC4wNTctMTMuNDI1LTguMzI4LTIxLjI1NS0xLjUyNy0yLjc5OC0zLjIyNC01LjU5Ni01LjAwNi04LjM1NnptLTE5LjIyNyAxNy40NTdMMjY1IDM1MC4yMzZ2NTQuNTVsNy43OTMtNi40OTUgNy4xNTgtMTQuMzE2YzguMDQtMTYuMDgxIDEyLjA1MS0yOS45NSAxMy45MTYtNDQuNTY1em0tNzUuNzM0LjAwMmMxLjg2NCAxNC42MTQgNS44NzYgMjguNDgzIDEzLjkxNiA0NC41NjNsNy4xNTggMTQuMzE2IDcuNzkzIDYuNDk0di01NC41NDl6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48L2c+PC9zdmc+\"); }\n\n.money-card {\n  background-image: url('data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\"%20viewBox%3D\"0%200%20512%20512\"%20style%3D\"height%3A%20512px%3B%20width%3A%20512px%3B\"><path%20d%3D\"M0%200h512v512H0z\"%20fill%3D\"%23000\"%20fill-opacity%3D\"1\"><%2Fpath><g%20class%3D\"\"%20transform%3D\"translate(0%2C0)\"%20style%3D\"touch-action%3A%20none%3B\"><path%20d%3D\"M136%2025c-16.457%200-31.287%203.45-41.23%208.422C84.826%2038.394%2081%2044.027%2081%2048c0%203.973%203.826%209.606%2013.77%2014.578C104.713%2067.55%20119.543%2071%20136%2071c16.457%200%2031.287-3.45%2041.23-8.422C187.174%2057.606%20191%2051.973%20191%2048c0-3.973-3.826-9.606-13.77-14.578C167.287%2028.45%20152.457%2025%20136%2025zm160%2032c-16.457%200-31.287%203.45-41.23%208.422C244.826%2070.394%20241%2076.027%20241%2080c0%203.973%203.826%209.606%2013.77%2014.578C264.713%2099.55%20279.543%20103%20296%20103c4.55%200%208.967-.27%2013.2-.758%204.32-5.534%2010.53-10.092%2017.52-13.588%207.064-3.53%2015.262-6.227%2024.24-7.98.025-.23.04-.455.04-.674%200-3.973-3.826-9.606-13.77-14.578C327.287%2060.45%20312.457%2057%20296%2057zM81%2075.445V80c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87C189.716%2085.574%20191%2082.515%20191%2080v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C172.06%2085.288%20154.89%2089%20136%2089s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zM376%2096.33c-16.457%200-31.287%203.452-41.23%208.424-9.944%204.972-13.77%2010.603-13.77%2014.576%200%203.973%203.826%209.606%2013.77%2014.578%209.943%204.972%2024.773%208.422%2041.23%208.422%2016.457%200%2031.287-3.45%2041.23-8.422%209.944-4.972%2013.77-10.605%2013.77-14.578%200-3.973-3.826-9.604-13.77-14.576-9.943-4.972-24.773-8.424-41.23-8.424zm-135%2011.115v2.313c2.9%201.073%205.67%202.26%208.28%203.564%209.037%204.52%2016.8%2010.794%2020.81%2018.69%2010.174%202.46%2021.72%203.366%2032.91%202.718v-13.917c-2.305.116-4.636.187-7%20.187-18.89%200-36.06-3.712-49.28-10.322-1.98-.99-3.888-2.075-5.72-3.233zm-160%20.024V112c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%206.83%201.972%2014.433%203.186%2022.216%203.654%201.988-5.227%205.6-9.806%2010.19-13.712-12.785.277-25.663-1.26-37.4-4.65-7.796-2.25-14.69-5.2-20.503-8.89zM200%20121c-16.457%200-31.287%203.45-41.23%208.422C148.826%20134.394%20145%20140.027%20145%20144c0%203.973%203.826%209.606%2013.77%2014.578C168.713%20163.55%20183.543%20167%20200%20167c16.457%200%2031.287-3.45%2041.23-8.422C251.174%20153.606%20255%20147.973%20255%20144c0-3.973-3.826-9.606-13.77-14.578C231.287%20124.45%20216.457%20121%20200%20121zM81%20139.47V144c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%206.328%201.826%2013.32%202.993%2020.503%203.53V152.75c-8.772-.594-17.406-2.057-25.496-4.393-7.797-2.25-14.69-5.203-20.504-8.89zm240%207.305v4.555c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.285%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.585%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233-13.22%206.61-30.39%2010.322-49.28%2010.322s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zm-48%204.246v13.65c9.435%201.962%2019.865%202.647%2030%202.06v-13.878c-10.064.53-20.263-.08-30-1.83zm-128%2020.425V176c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C236.06%20181.288%20218.89%20185%20200%20185s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zm-64%20.024V176c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%206.328%201.826%2013.32%202.993%2020.503%203.53V184.75c-8.772-.594-17.406-2.057-25.496-4.393-7.797-2.25-14.69-5.203-20.504-8.89zm240%207.33v4.53c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.285%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.585%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.688-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.202-20.504-8.89zm-48%204.22v13.65c9.435%201.962%2019.865%202.647%2030%202.06v-13.878c-10.064.53-20.263-.08-30-1.83zM81%20203.47V208c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%206.328%201.826%2013.32%202.993%2020.503%203.53V216.75c-8.772-.594-17.406-2.057-25.496-4.393-7.797-2.25-14.69-5.203-20.504-8.89zm64%200V208c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm176%207.33v4.53c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.285%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.585%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.688-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.202-20.504-8.89zm-48%204.22v13.65c9.435%201.962%2019.865%202.647%2030%202.06v-13.878c-10.064.53-20.263-.08-30-1.83zm-128%2020.45v2.288c2.9%201.073%205.67%202.26%208.28%203.564%209.038%204.52%2016.802%2010.795%2020.812%2018.692%2017.338%204.196%2038.678%203.883%2055.412-.948%208.954-2.585%2015.845-6.245%2020.03-9.87%204.183-3.622%205.466-6.68%205.466-9.196v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm176%207.33v4.53c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.285%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.585%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.688-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.202-20.504-8.89zm-48%204.22v13.65c9.435%201.962%2019.865%202.647%2030%202.06v-13.878c-10.064.53-20.263-.08-30-1.83zM104%20249c-16.457%200-31.287%203.45-41.23%208.422C52.826%20262.394%2049%20268.027%2049%20272c0%203.973%203.826%209.606%2013.77%2014.578C72.713%20291.55%2087.543%20295%20104%20295c16.457%200%2031.287-3.45%2041.23-8.422C155.174%20281.606%20159%20275.973%20159%20272c0-3.973-3.826-9.606-13.77-14.578C135.287%20252.45%20120.457%20249%20104%20249zm151%2018.47c-5.813%203.687-12.707%206.64-20.504%208.89-17.97%205.187-38.608%206.05-57.496%202.642v13.664c16.775%203.494%2036.694%202.964%2052.504-1.6%208.954-2.585%2015.845-6.245%2020.03-9.87%204.183-3.622%205.466-6.68%205.466-9.196v-4.53zm66%207.33v4.53c0%202.515%201.283%205.574%205.467%209.197%204.045%203.503%2010.64%207.03%2019.162%209.598%203.74-3.428%208.228-6.37%2013.09-8.803%201.152-.575%202.344-1.12%203.553-1.652-7.14-.744-14.137-2.066-20.77-3.98-7.796-2.25-14.69-5.202-20.503-8.89zm110%200c-2.84%201.8-5.938%203.422-9.27%204.876%203.1.31%206.13.734%209.082%201.252.12-.553.188-1.09.188-1.598v-4.53zm-158%204.22v13.62c6.997%201.482%2014.783%202.36%2023%202.36%202.374%200%204.705-.087%207-.227v-13.92c-10.064.53-20.263-.082-30-1.832zM408%20297c-16.457%200-31.287%203.45-41.23%208.422C356.826%20310.394%20353%20316.027%20353%20320c0%203.973%203.826%209.606%2013.77%2014.578C376.713%20339.55%20391.543%20343%20408%20343c16.457%200%2031.287-3.45%2041.23-8.422C459.174%20329.606%20463%20323.973%20463%20320c0-3.973-3.826-9.606-13.77-14.578C439.287%20300.45%20424.457%20297%20408%20297zm-359%202.445V304c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C140.06%20309.288%20122.89%20313%20104%20313s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zm206%20.024c-5.813%203.687-12.707%206.64-20.504%208.89-17.97%205.187-38.608%206.05-57.496%202.642v13.664c16.775%203.494%2036.694%202.964%2052.504-1.6%208.954-2.585%2015.845-6.245%2020.03-9.87%204.183-3.622%205.466-6.68%205.466-9.196v-4.53zm66%207.33v4.53c0%203.973%203.826%209.606%2013.77%2014.578.074.037.155.073.23.11V313.56c-5.168-1.89-9.862-4.135-14-6.76zM49%20331.47V336c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zM177%20343v13.648c4.885%201.032%2010.16%201.767%2015.697%202.114%201.985-5.246%205.602-9.84%2010.207-13.756-8.726.19-17.487-.487-25.904-2.006zM264%20345c-16.457%200-31.287%203.45-41.23%208.422C212.826%20358.394%20209%20364.027%20209%20368c0%203.973%203.826%209.606%2013.77%2014.578C232.713%20387.55%20247.543%20391%20264%20391c16.457%200%2031.287-3.45%2041.23-8.422C315.174%20377.606%20319%20371.973%20319%20368c0-3.973-3.826-9.606-13.77-14.578C295.287%20348.45%20280.457%20345%20264%20345zm89%202.445V352c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C444.06%20357.288%20426.89%20361%20408%20361s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zM49%20363.47V368c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm304%2016V384c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm-144%2015.975V400c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C300.06%20405.288%20282.89%20409%20264%20409s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zm-160%20.024V400c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm304%2016V416c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm-304%2016V432c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm160%200V432c0%203.973%203.826%209.606%2013.77%2014.578C232.713%20451.55%20247.543%20455%20264%20455c16.457%200%2031.287-3.45%2041.23-8.422C315.174%20441.606%20319%20435.973%20319%20432v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm144%2016V448c0%203.973%203.826%209.606%2013.77%2014.578C376.713%20467.55%20391.543%20471%20408%20471c16.457%200%2031.287-3.45%2041.23-8.422C459.174%20457.606%20463%20451.973%20463%20448v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm-304%2016V464c0%203.973%203.826%209.606%2013.77%2014.578C72.713%20483.55%2087.543%20487%20104%20487c16.457%200%2031.287-3.45%2041.23-8.422C155.174%20473.606%20159%20467.973%20159%20464v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89z\"%20fill%3D\"%23fff\"%20fill-opacity%3D\"1\"><%2Fpath><%2Fg><%2Fsvg>'); }\n\n.directions-card {\n  background-image: url('data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\"%20viewBox%3D\"0%200%20512%20512\"%20style%3D\"height%3A%20512px%3B%20width%3A%20512px%3B\"><path%20d%3D\"M0%200h512v512H0z\"%20fill%3D\"%23000\"%20fill-opacity%3D\"1\"><%2Fpath><g%20class%3D\"\"%20transform%3D\"translate(0%2C0)\"%20style%3D\"touch-action%3A%20none%3B\"><path%20d%3D\"M277.3%2035.11l-32.1%202.12-1%2032.93%2033.6.05-.5-35.1zM151.7%2088.04L67.96%20118.9%20152%20169.2l188-6.2%202.4-74.72-190.7-.24zM279.2%20183l-38.3%201.3-.8%2027.8%2039.5%201.2-.4-30.3zm-93.1%2045.6l.8%2064.2%20200.4.9%2051.7-29.2-55.8-30.2-197.1-5.7zm51.1%2082.5l-5%20175.3%2050.9.6-2.3-175.7-43.6-.2z\"%20fill%3D\"%23fff\"%20fill-opacity%3D\"1\"><%2Fpath><%2Fg><%2Fsvg>'); }\n\n.itemselect-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTIzMC4xMjUgMTguMTU2VjI0N2g0OS4zMTNWMTguMTU2aC00OS4zMTN6TTc4LjgxMiAyMS40MzhsLTE2IDEzNi45MDZjNDguNzA3IDMwLjExMiA5Ny42MzcgNDcuODQzIDE0OC42MjUgNTMuMDk0VjMzLjEyNWMtNDQuMjQ0LTEuODIyLTg4LjQ2LTUuODktMTMyLjYyNS0xMS42ODh6bTM0OS40MzguMjhjLTQzLjM5OCA2LjgxNC04Ni43ODQgMTAuNjQ3LTEzMC4xMjUgMTEuOTd2MTc1YzQ2LjczMi03LjQ1OCA5NS44MTYtMjQuMzc1IDE0OC40MzgtNTAuODQ0TDQyOC4yNSAyMS43MnptLTEuOTM4IDE2Ni41MzJjLTQ0LjQ3NCAxOS44NDctODcuMDYgMzIuODM2LTEyOC4xODcgMzguOTdWMjQ3aDM3LjAzMXYxNDMuMTg4aC0zNy4wMzF2OC43MThjMCAzNC40MS0yMC41MTYgNTYuMDg0LTQzLjI1IDU2LjI4LTIyLjczNC4yLTQzLjQzOC0yMS4zNC00My40MzgtNTYuMjh2LTguNzJsLTI3LjY1Ni4wMDJoLTkuMzQzVjI0N2gzNy4wMDF2LTE3LjE4OGMtNDMuNzc0LTQuMTY0LTg2LjE0LTE2Ljg1Ny0xMjcuNjg3LTM4LjA2MiA1LjA0IDkyLjY5IDMuNjYgMTg1LjM3LTUuMDYzIDI3OC4wNjMgMTE3LjQwMiAzMi4wNDcgMjM0Ljc4OCAzMS4wMDIgMzUyLjE4OCAwLTYuODUzLTkzLjg1OC05LjIyMy0xODcuNzA2LTQuNTYzLTI4MS41NjN6bS0yMzMuMTg3IDc3LjQzOFYzNzEuNUgzMTYuNDdWMjY1LjY4N0gxOTMuMTI0em0yMC40NyAxOC4xNTZIMjk2djY3LjVIMjEzLjU5NHYtNjcuNXptMTguNjg2IDE4LjY4N3YzMC4xMjZoNDUuMDMyVjMwMi41M2gtNDUuMDN6bS0yLjE1NSA4Ny42NTh2OC43MThjMCAyOC4yMyAxMy4zMiAzNy42OTIgMjQuNTk0IDM3LjU5NCAxMS4yNy0uMDk4IDI0LjcxOC0xMC4wMTggMjQuNzE4LTM3LjU5NHYtOC43MmwtNDkuMzEzLjAwMnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PC9wYXRoPjwvZz48L3N2Zz4=\"); }\n\n.target-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTIyNi4wNjMgMjQuMjJsLTkuNzgyIDMyLjYyNGMxMi45OTItMi42NTIgMjYuNDIzLTQuMDMyIDQwLjE5LTQuMDMyIDEwLjQ3NSAwIDIwLjc2Ni44MiAzMC44MSAyLjM3NmwtOS40MDUtMzAuOTdoLTUxLjgxM3ptMzAuNDA2IDQ4Ljg0M2MtOTkuNjI3IDAtMTgwLjE5IDgwLjUzLTE4MC4xOSAxODAuMTU2IDAgOTkuNjI0IDgwLjU2MyAxODAuMTU1IDE4MC4xOSAxODAuMTU1IDk5LjYyNCAwIDE4MC4xNTUtODAuNTMgMTgwLjE1NS0xODAuMTU2IDAtOTkuNjI3LTgwLjUzLTE4MC4xNTctMTgwLjE1Ni0xODAuMTU3em0wIDQxLjY4N2M3Ni40ODIgMCAxMzguNDY3IDYxLjk4NSAxMzguNDY3IDEzOC40NyAwIDc2LjQ4Mi02MS45ODUgMTM4LjUtMTM4LjQ2OCAxMzguNS03Ni40ODUgMC0xMzguNS02Mi4wMTgtMTM4LjUtMTM4LjUgMC03Ni40ODUgNjIuMDE1LTEzOC40NyAxMzguNS0xMzguNDd6bS0uMDMzIDM4LjkzOGMtNTQuOTYgMC05OS41MyA0NC41NC05OS41MyA5OS41czQ0LjU3IDk5LjUgOTkuNTMgOTkuNSA5OS41LTQ0LjU0IDk5LjUtOTkuNS00NC41NC05OS41LTk5LjUtOTkuNXptLjAzMiAzOS42ODdjMzMuMDUyIDAgNTkuODQyIDI2Ljc5IDU5Ljg0MiA1OS44NDQgMCAzMy4wNTItMjYuNzkgNTkuODQzLTU5Ljg0MyA1OS44NDMtMzMuMDU1IDAtNTkuODQ1LTI2Ljc5LTU5Ljg0NS01OS44NDQgMC0zMy4wNTUgMjYuNzktNTkuODQ1IDU5Ljg0NC01OS44NDV6bTAgMzAuOTA2Yy0xNS45OTMgMC0yOC45NyAxMi45NDctMjguOTcgMjguOTQgMCAxNS45OSAxMi45NzcgMjguOTY4IDI4Ljk3IDI4Ljk2OCAxNS45OSAwIDI4LjkzNi0xMi45NzcgMjguOTM2LTI4Ljk3IDAtMTUuOTktMTIuOTQ1LTI4LjkzNy0yOC45MzctMjguOTM3ek0xMTQuOTA1IDM5NWwtMjcuODQ0IDkyLjg3NWg0Ni44NzZsMjAuMjgtNjIuMzEzYy0xNC4zNS04LjU0LTI3LjU2LTE4LjgzMy0zOS4zMTItMzAuNTYyem0yNzcuMTg4IDUuNjg4Yy0xMS45ODIgMTEuMDI2LTI1LjMyNCAyMC41OTUtMzkuNzIgMjguNDY4bDE5LjI1IDU4LjcyaDQ2LjkwN2wtMjYuNDM2LTg3LjE4OHptLTE2NS4wMyA1MC43OHYzNi40MDdoNTIuMDkydi0zNS41M2MtNy40NS44NC0xNS4wMTUgMS4yOC0yMi42ODcgMS4yOC05Ljk5IDAtMTkuODEtLjc0LTI5LjQwOC0yLjE1NnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PC9wYXRoPjwvZz48L3N2Zz4=\"); }\n\n.corridor-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTE4LjA4IDIzbC4xIDE4SDQ5NFYyM0gxOC4wOHpNMjU0LjMgNTQuOTNMMTMzIDYxLjZsMzAuMSA2OC41IDk4LjEtMy42LTYuOS03MS41N3ptMTE1LjkuMjhsLTkyLjkuNTMgMyA3MS45NiA5Ni44LS45LTYuOS03MS41OXpNMTguMjMgNTYuNDNsLjM1IDc0LjY3IDcyLjI3LTIuNCAyNC4zNS03Mi4yN0gxOC4yM3pNMzkzIDY0LjI0bC0uNSA0Ny4xNiAxNS43IDIxLjUgODUuOC02LjNWNjQuOTNsLTEwMS0uNjl6TTEyMC44IDg0LjY4bC0xNy42IDQ5LjgyIDQxLjEtMS04LjItMzQuMDItMTUuMy0xNC44em0zNTQuNyA1Ni4wMmwtNCA3NS41IDIyLjUtLjZ2LTc0LjloLTE4LjV6bS0yNS43IDMuNWwtOTcuMyAxMC43TDM0NiAyMTlsMTEwLjctMy4yLTYuOS03MS42em0tMjQzLjguN2wtNCA3NS41IDEyNi4xLTMuOSA3LTcxLjEtMTI5LjEtLjV6bS0xNDUuMzMgMi43bC0zLjkgNzUuNSAxMjYuMTMtMy45LTYuOS03MS42SDYwLjY3em0tNDIgMS41bC4zMyA3Mi40IDI0Ljc3LS44LTYuOS03MS42aC0xOC4yem0yNzguOTMgODQuM0wyNzYgMjc3LjJsMi4xIDQyIDEyOC43LTEuOS03LjYtNzkuNy0xMDEuNi00LjJ6bS00MC4yIDEuNGwtMTI3LjIgNiA4IDY5LjUgMTI0LjcgNi42LTUuNS04Mi4xem0yMzYuNiAzLjFsLTY2LjUgMi45LTcuNSA3NS44IDc0LTUuMnYtNzMuNXptLTQ3NC44OSA3bC4zMSA2NS44IDEwMC43OC0zLjEtNi45LTYyLjdIMTkuMTF6bTQ3MC4yOSA4MS4ybC0xMTUuOSAxMC41LTMuMyA2NSAxMjEuNS0zLjUtMi4zLTcyem0tNDIyLjM2IDQuMWwtNDcuNTIgMiAuMzQgNzIuOSA1MS4xLTEuMy0zLjkyLTczLjZ6bTE3Ljg0IDBsMy45OCA2OC41IDEzOC42NCA5LjYtMy03OC4xSDg0Ljg4em0xNjEuMjIgNC4zbC01LjUgNjkgMTA3LjUgNS40LTEtNzMuNS0xMDEtLjl6bTE4NS40IDgxLjFsLTQgNzUuNSA2Ni41LS42di03My44bC02Mi41LTEuMXptLTkuOCAxLjJsLTM5IDMuNiAyNy40IDI4IDExLjYtMzEuNnptLTM5OS40NiAxLjhsLTIuMTMgNDAuNi4xNiAzNC44SDE0NS40di02OC45bC00Ni41Ni0yLjUtMTguNCAxNEw2OC41NiA0MjFsLTQ2LjMyLTIuNHptMjQ3Ljk2LjNsLTExMS4zIDEuNSAzLjUgNzIuNSAxMTQuNy0yLjQtNi45LTcxLjZ6bTEwMS4yIDQuM2wtNzIuMiA1LjktOC45IDYyLjEgMTI1LjYuNi02LjItMjctMzguMy00MS42eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==\"); }\n\n.corpse-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTQwMy40MjUgMTkuMjk5TDI4MS4yMzIgOTkuMzU0bDQ1LjE2NiA4MC42ODUtNzAuNTMxIDc0Ljc2NC05Ni4wMjIgMzIuOTQ3LTIwLjI0OCAxMDEuNDI2LTM4LjA5NSAzIDEuMDgzIDU4LjU2OCA4Ni4yMTMtNi4yNDggMjQuMzk3LTEwNi42MzcgNTUuMDcyLTEzLjM2IDIxLjM4NSA3NC44MDQgNTUuMTMgMzQuMjEzLTE5Ljg1MyAzMS41OTMgNTIuMDA0IDI3LjU5MiA1MC44NjUtNzUuNTcyLTgxLjEwMy01Mi4zMzItMTIuNTY3LTQ5LjEzNyA0Ni41MTgtNTQuODU1IDEzLjIwMSAzMS45NzYtNDAuNzYzIDQxLjgwMSAzMy43ODMgNDEuMDIyIDc4LjExMS02Ni4yMTMtMzEuNDE4LTg4LjY0NWMxNi40ODUtNS45NzYgMzAuNjkyLTE5LjgwOCAzOS41NzYtMzIuNyAxNC41OTctMjMuMDYgMTguOTM1LTQ5Ljg3OSAyLjk1Ny03MC4yOTItMTguOTYyLTE5LjgzLTM5Ljg4Ni0xOS43MDYtNjEuMDctNy4yNDQtMTMuMjIgNy45MTgtMjQuNjA2IDE5LjU2NS0zMi4yMjMgMzIuMDhsLTE1LjkxLTI1LjYzOSA2Ni44OTktNDUuNDA4em0tMTc4LjEyIDE2LjU4NGMtLjM3LS4wMS0uNzM1LS4wMS0xLjA5OC4wMDQtMjguMTEgMS4wMDItNDAuMzA4IDcxLjQzNi03My4xNCA4My42NzctMzAuMzE0IDExLjMwNC02OS42MS0yMy45NDEtOTYuODQ1LTYuNDc2LTIwLjM3NSAxMy4wNjUtMzQuNTkgNDUuMzAzLTI1LjgyNiA2Ny44NjUgMTMuNDc4IDM0LjcgNjMuNDQxIDU4LjM4IDk5Ljc1OCA1MC4yMDMgMjguNDM5LTYuNDAzIDI4LjE3Ny01NC45NjkgNTMuNzI4LTY5LjAwMiAyMC4wNS0xMS4wMTEgNTkuMDAyIDE0LjM2NCA2OC4zMTMtNi41MjkgNS4zMzYtMTEuOTczLTE4Ljc5Ni0xOS4zMzUtMjMuMzktMzEuNjExLTE0LjI0LTM4LjA0NSA0My4zNTctODYuNDY4LTEuNS04OC4xMzF6bS02NC4yNyA3LjM3M2MtMTcuOTUxLS4yMjMtNTAuNTgxIDQyLjgzNy0yOS42OTggNTEuMDQgMTcuMTQ5LjAzNyA1NS42NzMtNTAuNzE4IDI5LjY5OC01MS4wNHptMjM2LjM2OSAxLjUwOGwxMi4zODcgMjEuMzEyLTY3LjMwNyA0NS42ODYgNDQuMTIzIDcxLjFjNS45NzMtMjMuMzIgMTkuMTE4LTQ1LjM2NSAzNy42NjYtNTYuOTEgMTQuOTU5LTguMTY5IDI3Ljk3NC04Ljc2MiAzNy44MjYgMy4xMjIgMTcuMTE0IDIzLjcyLTYuMTUxIDU2LjQ2LTIzLjU5OCA2OS4wOTItMTEuNDY2IDcuOTIyLTE3LjUyMiA2LjE1NS0zMC4zNDEgNC43OTlsMzUuNyAxMDAuNzI4LTU0LjcwNiA0Ni4zNzMtMTEuOTE2LTE0LjQ3IDM3Ljc3LTM4LjczLTI4Ljk5NS03MC4yMjMtNzEuNjI3IDg0LjQ2OCAxNi42MiA2NC45ODMgNzEuNjEzIDQ2LjIwOS0zMS41NjcgNDYuOS0yMC41NzYtMTAuOTE2IDE5LjE4LTMwLjUyMS02NC42MDgtNDAuMDkyLTI0LjIyNC04NC43NDQtODIuNjk0IDIwLjA2Mi0yMy45MSAxMDQuNTEyLTUzLjk5IDMuOTE0LS40MTgtMjIuNjI5IDM0Ljc3Mi0yLjczNiAyMC44ODYtMTA0LjYzNSA5MC40NC0zMS4wMzEgODIuNjUyLTg3LjYwOGMtMTQuNDc2LTI1Ljg1NS0yOC45NS01MS43MTItNDMuNDI0LTc3LjU2OHpNMjUxLjc1NSAxODIuMTU4Yy41MDUgMTYuMDQgMjkuNDEzIDEzLjcxOCAyNy4wNDEgMS4yNC0yLjAxNy0xMC42MTQtMjcuMzE3LTEwLjAxNy0yNy4wNC0xLjI0em0tNDkuNzE0LTQuMTljLTEwLjI2My4xMTEtMTkuMjI5IDMuNjg0LTE4Ljg0NiAxMS45NDggMS4zMSAyOC4zMDUgNDguNjk0IDI0LjU5NyA0Ny43NDYgMi4xOTEtLjM2OC04LjY5OC0xNS43MDYtMTQuMjgtMjguOS0xNC4xMzh6bTI4LjE5MyA0OS4wNDhjOS42OTIgMTEuNTQxIDI4LjUyNi01LjMyNCAyMC44OS0xNC40ODktOS4zNC00LjkxOS0yNC45MzcgOC44MzctMjAuODkgMTQuNDg5eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==\"); }\n\n.event-list {\n  margin-top: 50px;\n  margin-bottom: 23px;\n  display: block;\n  height: 0px;\n  border: 2px solid #333;\n  border-radius: 5px;\n  list-style: none;\n  position: relative; }\n  .event-list::after {\n    content: '';\n    display: block;\n    position: absolute;\n    top: -25px;\n    left: 56px;\n    z-index: -1;\n    width: 4px;\n    height: 50px;\n    background: #333; }\n  .event-list li {\n    width: 46px;\n    height: 46px;\n    display: block;\n    position: absolute;\n    top: -23px;\n    transition: transform 750ms ease-in-out; }\n    .event-list li .inner {\n      width: 40px;\n      height: 40px;\n      box-sizing: border-box;\n      text-align: center;\n      border: 3px solid rgba(255, 255, 255, 0);\n      border-radius: 8px; }\n    .event-list li .contents {\n      width: 34px;\n      height: 34px;\n      border-radius: 5px; }\n\n.downbounce {\n  animation-name: bounce;\n  animation-duration: 750ms;\n  animation-timing-function: ease-in-out; }\n\n.upbounce {\n  animation-name: bounce2;\n  animation-duration: 750ms;\n  animation-timing-function: ease-in-out; }\n\n.spin1 {\n  animation-name: spin;\n  animation-duration: 500ms;\n  animation-timing-function: ease-in-out; }\n\n.grow1 {\n  animation-name: grow;\n  animation-duration: 500ms;\n  animation-timing-function: ease-in-out; }\n\n@keyframes spin {\n  0% {\n    transform: rotateZ(-90deg);\n    opacity: 0; }\n  100% {\n    transform: rotateZ(0deg);\n    opacity: 1; } }\n\n@keyframes bounce {\n  0% {\n    transform: translateY(0px); }\n  50% {\n    transform: translateY(48px); }\n  100% {\n    transform: translateY(0px); } }\n\n@keyframes bounce2 {\n  0% {\n    transform: translateY(0px); }\n  50% {\n    transform: translateY(-48px); }\n  100% {\n    transform: translateY(0px); } }\n\n@keyframes grow {\n  0% {\n    width: 34px;\n    height: 34px;\n    transform: translateX(0px) translateY(0px); }\n  100% {\n    width: 258px;\n    height: 256px;\n    transform: translateX(-42px) translateY(-340px); } }\n", "", {"version":3,"sources":["/app/src/scss/style.scss"],"names":[],"mappings":"AAAA;EACE,WAAW,EAAE;;AAEf;EACE,YAAY;EACZ,cAAc;EACd,iCAAiC,EAAE;;AAErC;EACE,cAAc;EACd,8nCAA8nC;EAC9nC,gBAAgB,EAAE;;AAEpB;EACE,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,mBAAmB,EAAE;EACrB;IACE,iBAAiB;IACjB,aAAa;IACb,mBAAmB;IACnB,YAAY;IACZ,oCAAoC;IACpC,YAAY,EAAE;EAChB;IACE,aAAa;IACb,mBAAmB;IACnB,oCAAoC;IACpC,YAAY,EAAE;EAChB;IACE,kBAAkB;IAClB,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;IACjB,kBAAkB;IAClB,wBAAwB;IACxB,WAAW,EAAE;EACf;IACE,0BAA0B,EAAE;EAC9B;IACE,iBAAiB,EAAE;EACrB;IACE,0BAA0B,EAAE;EAC9B;IACE,iBAAiB,EAAE;EACrB;IACE,0BAA0B,EAAE;EAC9B;IACE,iBAAiB,EAAE;;AAEvB;EACE,cAAc;EACd,iBAAiB;EACjB,iCAAiC;EACjC,YAAY;EACZ,cAAc,EAAE;EAChB;IACE,uBAAuB,EAAE;EAC3B;IACE,8CAA8C;IAC9C,YAAY;IACZ,aAAa,EAAE;EACjB;IACE,uBAAuB,EAAE;EAC3B;IACE,cAAc;IACd,kBAAkB;IAClB,aAAa,EAAE;IACf;MACE,gBAAgB;MAChB,iBAAiB;MACjB,uBAAuB,EAAE;MACzB;QACE,YAAY;QACZ,iBAAiB,EAAE;EACzB;IACE,iBAAiB;IACjB,YAAY;IACZ,mBAAmB;IACnB,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB,EAAE;;AAEzB;EACE,4jIAA4jI,EAAE;;AAEhkI;EACE,8sZAA8sZ,EAAE;;AAEltZ;EACE,0uBAA0uB,EAAE;;AAE9uB;EACE,gkDAAgkD,EAAE;;AAEpkD;EACE,g6DAAg6D,EAAE;;AAEp6D;EACE,w7DAAw7D,EAAE;;AAE57D;EACE,wyFAAwyF,EAAE;;AAE5yF;EACE,iBAAiB;EACjB,oBAAoB;EACpB,eAAe;EACf,YAAY;EACZ,uBAAuB;EACvB,mBAAmB;EACnB,iBAAiB;EACjB,mBAAmB,EAAE;EACrB;IACE,YAAY;IACZ,eAAe;IACf,mBAAmB;IACnB,WAAW;IACX,WAAW;IACX,YAAY;IACZ,WAAW;IACX,aAAa;IACb,iBAAiB,EAAE;EACrB;IACE,YAAY;IACZ,aAAa;IACb,eAAe;IACf,mBAAmB;IACnB,WAAW;IACX,wCAAwC,EAAE;IAC1C;MACE,YAAY;MACZ,aAAa;MACb,uBAAuB;MACvB,mBAAmB;MACnB,yCAAyC;MACzC,mBAAmB,EAAE;IACvB;MACE,YAAY;MACZ,aAAa;MACb,mBAAmB,EAAE;;AAE3B;EACE,uBAAuB;EACvB,0BAA0B;EAC1B,uCAAuC,EAAE;;AAE3C;EACE,wBAAwB;EACxB,0BAA0B;EAC1B,uCAAuC,EAAE;;AAE3C;EACE,qBAAqB;EACrB,0BAA0B;EAC1B,uCAAuC,EAAE;;AAE3C;EACE,qBAAqB;EACrB,0BAA0B;EAC1B,uCAAuC,EAAE;;AAE3C;EACE;IACE,2BAA2B;IAC3B,WAAW,EAAE;EACf;IACE,yBAAyB;IACzB,WAAW,EAAE,EAAE;;AAEnB;EACE;IACE,2BAA2B,EAAE;EAC/B;IACE,4BAA4B,EAAE;EAChC;IACE,2BAA2B,EAAE,EAAE;;AAEnC;EACE;IACE,2BAA2B,EAAE;EAC/B;IACE,6BAA6B,EAAE;EACjC;IACE,2BAA2B,EAAE,EAAE;;AAEnC;EACE;IACE,YAAY;IACZ,aAAa;IACb,2CAA2C,EAAE;EAC/C;IACE,aAAa;IACb,cAAc;IACd,gDAAgD,EAAE,EAAE","file":"style.scss","sourcesContent":[".game {\n  width: 50%; }\n\n.header {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 100px 1fr; }\n\n.player-image {\n  height: 100px;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTI1MC44ODIgMjIuODAyYy0yMy4zNjYgMy4wMzUtNDQuNTUzIDMwLjQ0NC00NC41NTMgNjUuOTM1IDAgMTkuNTU4IDYuNzcxIDM2Ljg1NiAxNi42OTUgNDguODE1bDExLjg0IDE0LjI2My0xOC4yMTcgMy40MjRjLTEyLjkgMi40MjUtMjIuMzU4IDkuMjQtMzAuNDQzIDIwLjMzNi04LjA4NSAxMS4wOTctMTQuMjY2IDI2LjU1OC0xOC41OTggNDQuMzc1LTcuODQzIDMyLjI4LTkuNTY4IDcxLjY5My05Ljg0MiAxMDYuNDM2aDQyLjg2OGwxMS43NzEgMTU3LjgzNmMyOS44OTQgNi43NDggNjEuODExIDYuNTEgOTAuNjAyLjAyNWwxMC40MTQtMTU3Ljg2aDQwLjgxNmMtLjAyNy0zNS4xNjktLjQ3Ny03NS4xMjYtNy41ODQtMTA3LjY1LTMuOTE4LTE3LjkzNC05Ljg1OC0zMy4zNzItMTguMDQtNDQuMzQzLTguMTg1LTEwLjk3LTE4LjA4LTE3Ljc0NS0zMi41NjMtMTkuOTg5bC0xOC41OTItMi44OCAxMS43MzYtMTQuNzA0YzkuNDk1LTExLjg5NyAxNS45MzItMjguOTk3IDE1LjkzMi00OC4wODIgMC0zNy44MzgtMjMuNjU1LTY1Ljg0NC00OS4zOTktNjUuODQ0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==);\n  cursor: pointer; }\n\n.bar-outer {\n  height: 18px;\n  width: 100%;\n  position: relative;\n  margin-bottom: 2px; }\n  .bar-outer .progress-shadow {\n    background: #eee;\n    height: 100%;\n    position: absolute;\n    z-index: -1;\n    transition: width 500ms ease-in-out;\n    width: 100%; }\n  .bar-outer .progress {\n    height: 100%;\n    position: absolute;\n    transition: width 500ms ease-in-out;\n    z-index: -1; }\n  .bar-outer .readout {\n    font-weight: bold;\n    color: #fff;\n    font-size: 12px;\n    line-height: 1.5;\n    padding-left: 5px;\n    font-family: sans-serif;\n    z-index: 1; }\n  .bar-outer.health .readout {\n    text-shadow: 1px 1px #a00; }\n  .bar-outer.health .progress {\n    background: #d00; }\n  .bar-outer.mana .readout {\n    text-shadow: 1px 1px #00a; }\n  .bar-outer.mana .progress {\n    background: #00d; }\n  .bar-outer.experience .readout {\n    text-shadow: 1px 1px #aaa; }\n  .bar-outer.experience .progress {\n    background: #ddd; }\n\n.big-card {\n  display: grid;\n  margin-top: 10px;\n  grid-template-columns: 256px 1fr;\n  width: 100%;\n  height: 256px; }\n  .big-card .card-image {\n    border: 1px solid #333; }\n  .big-card .card-image-inner {\n    transition: background-image 0.5s ease-in-out;\n    width: 100%;\n    height: 100%; }\n  .big-card .content {\n    border: 1px solid #333; }\n  .big-card .choices-inner {\n    display: grid;\n    grid-row-gap: 5px;\n    padding: 5px; }\n    .big-card .choices-inner .choice-button {\n      cursor: pointer;\n      background: #fff;\n      border: 1px solid #333; }\n      .big-card .choices-inner .choice-button:hover {\n        color: #fff;\n        background: #000; }\n  .big-card .flavour {\n    background: #eee;\n    width: 100%;\n    font-style: italic;\n    box-sizing: border-box;\n    padding: 10px 10px;\n    text-align: center; }\n\n.creature-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTI1NiAzM2MtOC41IDAtMjEuMzE4IDUuNzQ1LTM1LjA2IDE2LjE3LTEzLjc0MyAxMC40MjUtMjguNDI5IDI1LjA1NS00Mi4xNjcgNDAuNzU2LTE5LjU5NyAyMi4zOTctMzcuMjYgNDcuMDUzLTQ4LjQxIDY0LjU5N2w0OS41ODIgMzcuMTg4IDQ5LjIzIDEyLjMwNyAyLjI4OC02Ljg2NCAxNy4wNzQgNS42OTItMTQuOTU3IDQ0Ljg3MyAyMi40MiA1Ni4wNSAyMi40Mi01Ni4wNS0xNC45NTctNDQuODczIDE3LjA3NC01LjY5MiAyLjI4NyA2Ljg2NCA0OS4yMy0xMi4zMDcgNDkuNTgzLTM3LjE4OGMtMTEuMTUtMTcuNTQ0LTI4LjgxMy00Mi4yLTQ4LjQxLTY0LjU5Ny0xMy43MzgtMTUuNy0yOC40MjQtMzAuMzMtNDIuMTY2LTQwLjc1NkMyNzcuMzE4IDM4Ljc0NSAyNjQuNSAzMyAyNTYgMzN6bS05MS40OSA5NS4yMTNsNzYgNDQtOS4wMiAxNS41NzQtNzYtNDR6bTE4Mi45OCAwbDkuMDIgMTUuNTc0LTc2IDQ0LTkuMDItMTUuNTc0ek0xNy4yMSAxNDYuNjI1YzMxLjgwNCAzMi45NzMgNjMuMjEzIDczLjQwOCA3Ni4zIDExMS44NTcgMS41OS0yLjcwOCAzLjM4LTUuMzMzIDUuMjkyLTcuODgyIDUuMDA5LTYuNjggMTEuMDM2LTEyLjk3MiAxNy4xNC0xOS4xNTMtOC45NS0xMi44ODQtMTEuNzUyLTI5LjA4OC0xMi42MDUtNDIuODg2LTI5LjMwOC0yNC4xNDItNTMuOTE2LTM3LjY5My04Ni4xMjctNDEuOTM2em00NzcuNTgyIDBjLTMyLjIxIDQuMjQzLTU2LjgxOSAxNy43OTQtODYuMTI3IDQxLjkzNi0uODUzIDEzLjc5OC0zLjY1NCAzMC4wMDItMTIuNjA1IDQyLjg4NiA2LjEwNCA2LjE4MSAxMi4xMzEgMTIuNDc0IDE3LjE0IDE5LjE1MyAxLjkxMiAyLjU1IDMuNzAzIDUuMTc0IDUuMjkxIDcuODgyIDEzLjA4OC0zOC40NDkgNDQuNDk3LTc4Ljg4NCA3Ni4zMDEtMTExLjg1N3ptLTM3My42NDUgMjMuNDg0Yy0uMDIzLjA0NS0uMDU0LjEtLjA3OC4xNDUuMTM3IDE2LjM3NiAyLjAwNyA0NC4wOTUgMTMuMjk1IDU1LjM4M2w2LjM2NCA2LjM2My02LjM2NCA2LjM2M2MtOCA4LTE1Ljc0IDE1LjgwNS0yMS4xNjQgMjMuMDM3LTQuNjg4IDYuMjUxLTcuMzI3IDExLjgyMy03Ljk2NSAxNi40NTJsODEuMTE4IDMwLjQxOGM0LjctNi44NDcgOS45MDQtMTMuMjUzIDE1LjI4NS0xOC42MzNsMTYuMDI5LTE2LjAzLS42NyAyMi42NTljLS4yNSA4LjQzMS0uMzgzIDE2LjEzMS0uMjMyIDIzLjQxbDMwLjg0IDExLjU2NEwyMTQuNzA3IDI0OWgtNTAuOThsLTEzLjM2NCAxMy4zNjMtMTIuNzI2LTEyLjcyNiAxMS4zMTItMTEuMzEzLTEzLjUzMS01Ny41MTJ6bTI2OS43MDggMGwtMTQuMjcyIDEwLjcwMy0xMy41MzEgNTcuNTEyIDExLjMxMiAxMS4zMTMtMTIuNzI2IDEyLjcyNkwzNDguMjczIDI0OWgtNTAuOThsLTMyLjg5NyA4Mi4yNCAzMC44NDItMTEuNTY2Yy4xNS03LjI3OC4wMTgtMTQuOTc4LS4yMzItMjMuNDA4bC0uNjcyLTIyLjY1OSAxNi4wMyAxNi4wM2M1LjM4IDUuMzggMTAuNTg0IDExLjc4OCAxNS4yODQgMTguNjM0bDU1LjE5Mi0yMC42OTcgMjUuOTI2LTkuNzIyYy0uNjM4LTQuNjMtMy4yNzctMTAuMi03Ljk2NS0xNi40NTItNS40MjQtNy4yMzItMTMuMTY0LTE1LjAzNy0yMS4xNjQtMjMuMDM3TDM3MS4yNzMgMjMybDYuMzY0LTYuMzYzYzExLjI4OC0xMS4yODggMTMuMTU4LTM5LjAwNyAxMy4yOTUtNTUuMzgzLS4wMjQtLjA0NS0uMDU1LS4xLS4wNzgtLjE0NXpNMTU3Ljg2NyAxOTcuNjVsNy44NDggMzMuMzVIMTgzdi0xOS45NzVsLTEwLjk0NS0yLjczNnptMTk2LjI2NiAwbC0xNC4xODggMTAuNjRMMzI5IDIxMS4wMjRWMjMxaDE3LjI4NXpNMjAxIDIxNS41MjVWMjMxaDE5LjE4bDMuMjg3LTkuODU3em0xMTAgMGwtMjIuNDY3IDUuNjE4TDI5MS44MiAyMzFIMzExem0tMjA1Ljc5MSA2Mi41MWExNi4yNSAxNi4yNSAwIDAgMC0uMTE3IDEuMjU2YzcuNzkgMzcuNDI0IDM0Ljk4NSA4OC40NjEgNjYuMDY2IDEyOS4yNTYgMTUuNjgyIDIwLjU4MiAzMi4zNCAzOC42NDkgNDcuNTgyIDUxLjI3MUMyMzMuOTgzIDQ3Mi40NDEgMjQ4IDQ3OSAyNTYgNDc5YzggMCAyMi4wMTctNi41NTkgMzcuMjYtMTkuMTgyIDE1LjI0Mi0xMi42MjIgMzEuOS0zMC42ODkgNDcuNTgyLTUxLjI3MSAzMS4wODEtNDAuNzk1IDU4LjI3Ny05MS44MzIgNjYuMDY2LTEyOS4yNTYtLjAyLS40MS0uMDYzLS44My0uMTE3LTEuMjU2bC00OC4wMjcgNzIuMDQzTDI1NiA0MzUuNzE1bC0xMDIuNzY0LTg1LjYzN3ptNDUuNzU2IDM2LjE4OGwxNS43OTkgMjMuNjk5IDIuOTY4IDIuNDc0YzEuNzUzLTUuNDA5IDQuMjU5LTEwLjkwNiA3LjE3Ni0xNi40NDV6bTIxMC4wNyAwbC0yNS45NDMgOS43MjhjMi45MTcgNS41MzkgNS40MjMgMTEuMDM2IDcuMTc2IDE2LjQ0NWwyLjk2OC0yLjQ3NHptLTE2Mi4xMjkgNy43M2MtMS43ODIgMi43Ni0zLjQ4IDUuNTU4LTUuMDA2IDguMzU2LTQuMjcgNy44My03LjE3NiAxNS43MTctOC4zMjggMjEuMjU1bDE5LjY3IDEzLjExNGMtNC4xMTYtMTQuMjMyLTUuODY0LTI4LjA0OC02LjMzNi00Mi43MjV6bTExNC4xODggMGMtLjQ3MiAxNC42NzctMi4yMiAyOC40OTMtNi4zMzYgNDIuNzI1bDE5LjY3LTEzLjExNGMtMS4xNTItNS41MzgtNC4wNTctMTMuNDI1LTguMzI4LTIxLjI1NS0xLjUyNy0yLjc5OC0zLjIyNC01LjU5Ni01LjAwNi04LjM1NnptLTE5LjIyNyAxNy40NTdMMjY1IDM1MC4yMzZ2NTQuNTVsNy43OTMtNi40OTUgNy4xNTgtMTQuMzE2YzguMDQtMTYuMDgxIDEyLjA1MS0yOS45NSAxMy45MTYtNDQuNTY1em0tNzUuNzM0LjAwMmMxLjg2NCAxNC42MTQgNS44NzYgMjguNDgzIDEzLjkxNiA0NC41NjNsNy4xNTggMTQuMzE2IDcuNzkzIDYuNDk0di01NC41NDl6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48L2c+PC9zdmc+\"); }\n\n.money-card {\n  background-image: url('data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\"%20viewBox%3D\"0%200%20512%20512\"%20style%3D\"height%3A%20512px%3B%20width%3A%20512px%3B\"><path%20d%3D\"M0%200h512v512H0z\"%20fill%3D\"%23000\"%20fill-opacity%3D\"1\"><%2Fpath><g%20class%3D\"\"%20transform%3D\"translate(0%2C0)\"%20style%3D\"touch-action%3A%20none%3B\"><path%20d%3D\"M136%2025c-16.457%200-31.287%203.45-41.23%208.422C84.826%2038.394%2081%2044.027%2081%2048c0%203.973%203.826%209.606%2013.77%2014.578C104.713%2067.55%20119.543%2071%20136%2071c16.457%200%2031.287-3.45%2041.23-8.422C187.174%2057.606%20191%2051.973%20191%2048c0-3.973-3.826-9.606-13.77-14.578C167.287%2028.45%20152.457%2025%20136%2025zm160%2032c-16.457%200-31.287%203.45-41.23%208.422C244.826%2070.394%20241%2076.027%20241%2080c0%203.973%203.826%209.606%2013.77%2014.578C264.713%2099.55%20279.543%20103%20296%20103c4.55%200%208.967-.27%2013.2-.758%204.32-5.534%2010.53-10.092%2017.52-13.588%207.064-3.53%2015.262-6.227%2024.24-7.98.025-.23.04-.455.04-.674%200-3.973-3.826-9.606-13.77-14.578C327.287%2060.45%20312.457%2057%20296%2057zM81%2075.445V80c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87C189.716%2085.574%20191%2082.515%20191%2080v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C172.06%2085.288%20154.89%2089%20136%2089s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zM376%2096.33c-16.457%200-31.287%203.452-41.23%208.424-9.944%204.972-13.77%2010.603-13.77%2014.576%200%203.973%203.826%209.606%2013.77%2014.578%209.943%204.972%2024.773%208.422%2041.23%208.422%2016.457%200%2031.287-3.45%2041.23-8.422%209.944-4.972%2013.77-10.605%2013.77-14.578%200-3.973-3.826-9.604-13.77-14.576-9.943-4.972-24.773-8.424-41.23-8.424zm-135%2011.115v2.313c2.9%201.073%205.67%202.26%208.28%203.564%209.037%204.52%2016.8%2010.794%2020.81%2018.69%2010.174%202.46%2021.72%203.366%2032.91%202.718v-13.917c-2.305.116-4.636.187-7%20.187-18.89%200-36.06-3.712-49.28-10.322-1.98-.99-3.888-2.075-5.72-3.233zm-160%20.024V112c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%206.83%201.972%2014.433%203.186%2022.216%203.654%201.988-5.227%205.6-9.806%2010.19-13.712-12.785.277-25.663-1.26-37.4-4.65-7.796-2.25-14.69-5.2-20.503-8.89zM200%20121c-16.457%200-31.287%203.45-41.23%208.422C148.826%20134.394%20145%20140.027%20145%20144c0%203.973%203.826%209.606%2013.77%2014.578C168.713%20163.55%20183.543%20167%20200%20167c16.457%200%2031.287-3.45%2041.23-8.422C251.174%20153.606%20255%20147.973%20255%20144c0-3.973-3.826-9.606-13.77-14.578C231.287%20124.45%20216.457%20121%20200%20121zM81%20139.47V144c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%206.328%201.826%2013.32%202.993%2020.503%203.53V152.75c-8.772-.594-17.406-2.057-25.496-4.393-7.797-2.25-14.69-5.203-20.504-8.89zm240%207.305v4.555c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.285%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.585%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233-13.22%206.61-30.39%2010.322-49.28%2010.322s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zm-48%204.246v13.65c9.435%201.962%2019.865%202.647%2030%202.06v-13.878c-10.064.53-20.263-.08-30-1.83zm-128%2020.425V176c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C236.06%20181.288%20218.89%20185%20200%20185s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zm-64%20.024V176c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%206.328%201.826%2013.32%202.993%2020.503%203.53V184.75c-8.772-.594-17.406-2.057-25.496-4.393-7.797-2.25-14.69-5.203-20.504-8.89zm240%207.33v4.53c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.285%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.585%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.688-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.202-20.504-8.89zm-48%204.22v13.65c9.435%201.962%2019.865%202.647%2030%202.06v-13.878c-10.064.53-20.263-.08-30-1.83zM81%20203.47V208c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%206.328%201.826%2013.32%202.993%2020.503%203.53V216.75c-8.772-.594-17.406-2.057-25.496-4.393-7.797-2.25-14.69-5.203-20.504-8.89zm64%200V208c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm176%207.33v4.53c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.285%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.585%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.688-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.202-20.504-8.89zm-48%204.22v13.65c9.435%201.962%2019.865%202.647%2030%202.06v-13.878c-10.064.53-20.263-.08-30-1.83zm-128%2020.45v2.288c2.9%201.073%205.67%202.26%208.28%203.564%209.038%204.52%2016.802%2010.795%2020.812%2018.692%2017.338%204.196%2038.678%203.883%2055.412-.948%208.954-2.585%2015.845-6.245%2020.03-9.87%204.183-3.622%205.466-6.68%205.466-9.196v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm176%207.33v4.53c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.285%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.585%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.688-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.202-20.504-8.89zm-48%204.22v13.65c9.435%201.962%2019.865%202.647%2030%202.06v-13.878c-10.064.53-20.263-.08-30-1.83zM104%20249c-16.457%200-31.287%203.45-41.23%208.422C52.826%20262.394%2049%20268.027%2049%20272c0%203.973%203.826%209.606%2013.77%2014.578C72.713%20291.55%2087.543%20295%20104%20295c16.457%200%2031.287-3.45%2041.23-8.422C155.174%20281.606%20159%20275.973%20159%20272c0-3.973-3.826-9.606-13.77-14.578C135.287%20252.45%20120.457%20249%20104%20249zm151%2018.47c-5.813%203.687-12.707%206.64-20.504%208.89-17.97%205.187-38.608%206.05-57.496%202.642v13.664c16.775%203.494%2036.694%202.964%2052.504-1.6%208.954-2.585%2015.845-6.245%2020.03-9.87%204.183-3.622%205.466-6.68%205.466-9.196v-4.53zm66%207.33v4.53c0%202.515%201.283%205.574%205.467%209.197%204.045%203.503%2010.64%207.03%2019.162%209.598%203.74-3.428%208.228-6.37%2013.09-8.803%201.152-.575%202.344-1.12%203.553-1.652-7.14-.744-14.137-2.066-20.77-3.98-7.796-2.25-14.69-5.202-20.503-8.89zm110%200c-2.84%201.8-5.938%203.422-9.27%204.876%203.1.31%206.13.734%209.082%201.252.12-.553.188-1.09.188-1.598v-4.53zm-158%204.22v13.62c6.997%201.482%2014.783%202.36%2023%202.36%202.374%200%204.705-.087%207-.227v-13.92c-10.064.53-20.263-.082-30-1.832zM408%20297c-16.457%200-31.287%203.45-41.23%208.422C356.826%20310.394%20353%20316.027%20353%20320c0%203.973%203.826%209.606%2013.77%2014.578C376.713%20339.55%20391.543%20343%20408%20343c16.457%200%2031.287-3.45%2041.23-8.422C459.174%20329.606%20463%20323.973%20463%20320c0-3.973-3.826-9.606-13.77-14.578C439.287%20300.45%20424.457%20297%20408%20297zm-359%202.445V304c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C140.06%20309.288%20122.89%20313%20104%20313s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zm206%20.024c-5.813%203.687-12.707%206.64-20.504%208.89-17.97%205.187-38.608%206.05-57.496%202.642v13.664c16.775%203.494%2036.694%202.964%2052.504-1.6%208.954-2.585%2015.845-6.245%2020.03-9.87%204.183-3.622%205.466-6.68%205.466-9.196v-4.53zm66%207.33v4.53c0%203.973%203.826%209.606%2013.77%2014.578.074.037.155.073.23.11V313.56c-5.168-1.89-9.862-4.135-14-6.76zM49%20331.47V336c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zM177%20343v13.648c4.885%201.032%2010.16%201.767%2015.697%202.114%201.985-5.246%205.602-9.84%2010.207-13.756-8.726.19-17.487-.487-25.904-2.006zM264%20345c-16.457%200-31.287%203.45-41.23%208.422C212.826%20358.394%20209%20364.027%20209%20368c0%203.973%203.826%209.606%2013.77%2014.578C232.713%20387.55%20247.543%20391%20264%20391c16.457%200%2031.287-3.45%2041.23-8.422C315.174%20377.606%20319%20371.973%20319%20368c0-3.973-3.826-9.606-13.77-14.578C295.287%20348.45%20280.457%20345%20264%20345zm89%202.445V352c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C444.06%20357.288%20426.89%20361%20408%20361s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zM49%20363.47V368c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm304%2016V384c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm-144%2015.975V400c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.555c-1.832%201.158-3.74%202.243-5.72%203.233C300.06%20405.288%20282.89%20409%20264%20409s-36.06-3.712-49.28-10.322c-1.98-.99-3.888-2.075-5.72-3.233zm-160%20.024V400c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm304%2016V416c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm-304%2016V432c0%202.515%201.283%205.574%205.467%209.197%204.184%203.624%2011.075%207.284%2020.03%209.87%2017.908%205.17%2041.098%205.17%2059.007%200%208.954-2.586%2015.845-6.246%2020.03-9.87%204.183-3.623%205.466-6.682%205.466-9.197v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm160%200V432c0%203.973%203.826%209.606%2013.77%2014.578C232.713%20451.55%20247.543%20455%20264%20455c16.457%200%2031.287-3.45%2041.23-8.422C315.174%20441.606%20319%20435.973%20319%20432v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm144%2016V448c0%203.973%203.826%209.606%2013.77%2014.578C376.713%20467.55%20391.543%20471%20408%20471c16.457%200%2031.287-3.45%2041.23-8.422C459.174%20457.606%20463%20451.973%20463%20448v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89zm-304%2016V464c0%203.973%203.826%209.606%2013.77%2014.578C72.713%20483.55%2087.543%20487%20104%20487c16.457%200%2031.287-3.45%2041.23-8.422C155.174%20473.606%20159%20467.973%20159%20464v-4.53c-5.813%203.687-12.707%206.64-20.504%208.89-21.694%206.262-47.298%206.262-68.992%200-7.797-2.25-14.69-5.203-20.504-8.89z\"%20fill%3D\"%23fff\"%20fill-opacity%3D\"1\"><%2Fpath><%2Fg><%2Fsvg>'); }\n\n.directions-card {\n  background-image: url('data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D\"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\"%20viewBox%3D\"0%200%20512%20512\"%20style%3D\"height%3A%20512px%3B%20width%3A%20512px%3B\"><path%20d%3D\"M0%200h512v512H0z\"%20fill%3D\"%23000\"%20fill-opacity%3D\"1\"><%2Fpath><g%20class%3D\"\"%20transform%3D\"translate(0%2C0)\"%20style%3D\"touch-action%3A%20none%3B\"><path%20d%3D\"M277.3%2035.11l-32.1%202.12-1%2032.93%2033.6.05-.5-35.1zM151.7%2088.04L67.96%20118.9%20152%20169.2l188-6.2%202.4-74.72-190.7-.24zM279.2%20183l-38.3%201.3-.8%2027.8%2039.5%201.2-.4-30.3zm-93.1%2045.6l.8%2064.2%20200.4.9%2051.7-29.2-55.8-30.2-197.1-5.7zm51.1%2082.5l-5%20175.3%2050.9.6-2.3-175.7-43.6-.2z\"%20fill%3D\"%23fff\"%20fill-opacity%3D\"1\"><%2Fpath><%2Fg><%2Fsvg>'); }\n\n.itemselect-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTIzMC4xMjUgMTguMTU2VjI0N2g0OS4zMTNWMTguMTU2aC00OS4zMTN6TTc4LjgxMiAyMS40MzhsLTE2IDEzNi45MDZjNDguNzA3IDMwLjExMiA5Ny42MzcgNDcuODQzIDE0OC42MjUgNTMuMDk0VjMzLjEyNWMtNDQuMjQ0LTEuODIyLTg4LjQ2LTUuODktMTMyLjYyNS0xMS42ODh6bTM0OS40MzguMjhjLTQzLjM5OCA2LjgxNC04Ni43ODQgMTAuNjQ3LTEzMC4xMjUgMTEuOTd2MTc1YzQ2LjczMi03LjQ1OCA5NS44MTYtMjQuMzc1IDE0OC40MzgtNTAuODQ0TDQyOC4yNSAyMS43MnptLTEuOTM4IDE2Ni41MzJjLTQ0LjQ3NCAxOS44NDctODcuMDYgMzIuODM2LTEyOC4xODcgMzguOTdWMjQ3aDM3LjAzMXYxNDMuMTg4aC0zNy4wMzF2OC43MThjMCAzNC40MS0yMC41MTYgNTYuMDg0LTQzLjI1IDU2LjI4LTIyLjczNC4yLTQzLjQzOC0yMS4zNC00My40MzgtNTYuMjh2LTguNzJsLTI3LjY1Ni4wMDJoLTkuMzQzVjI0N2gzNy4wMDF2LTE3LjE4OGMtNDMuNzc0LTQuMTY0LTg2LjE0LTE2Ljg1Ny0xMjcuNjg3LTM4LjA2MiA1LjA0IDkyLjY5IDMuNjYgMTg1LjM3LTUuMDYzIDI3OC4wNjMgMTE3LjQwMiAzMi4wNDcgMjM0Ljc4OCAzMS4wMDIgMzUyLjE4OCAwLTYuODUzLTkzLjg1OC05LjIyMy0xODcuNzA2LTQuNTYzLTI4MS41NjN6bS0yMzMuMTg3IDc3LjQzOFYzNzEuNUgzMTYuNDdWMjY1LjY4N0gxOTMuMTI0em0yMC40NyAxOC4xNTZIMjk2djY3LjVIMjEzLjU5NHYtNjcuNXptMTguNjg2IDE4LjY4N3YzMC4xMjZoNDUuMDMyVjMwMi41M2gtNDUuMDN6bS0yLjE1NSA4Ny42NTh2OC43MThjMCAyOC4yMyAxMy4zMiAzNy42OTIgMjQuNTk0IDM3LjU5NCAxMS4yNy0uMDk4IDI0LjcxOC0xMC4wMTggMjQuNzE4LTM3LjU5NHYtOC43MmwtNDkuMzEzLjAwMnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PC9wYXRoPjwvZz48L3N2Zz4=\"); }\n\n.target-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTIyNi4wNjMgMjQuMjJsLTkuNzgyIDMyLjYyNGMxMi45OTItMi42NTIgMjYuNDIzLTQuMDMyIDQwLjE5LTQuMDMyIDEwLjQ3NSAwIDIwLjc2Ni44MiAzMC44MSAyLjM3NmwtOS40MDUtMzAuOTdoLTUxLjgxM3ptMzAuNDA2IDQ4Ljg0M2MtOTkuNjI3IDAtMTgwLjE5IDgwLjUzLTE4MC4xOSAxODAuMTU2IDAgOTkuNjI0IDgwLjU2MyAxODAuMTU1IDE4MC4xOSAxODAuMTU1IDk5LjYyNCAwIDE4MC4xNTUtODAuNTMgMTgwLjE1NS0xODAuMTU2IDAtOTkuNjI3LTgwLjUzLTE4MC4xNTctMTgwLjE1Ni0xODAuMTU3em0wIDQxLjY4N2M3Ni40ODIgMCAxMzguNDY3IDYxLjk4NSAxMzguNDY3IDEzOC40NyAwIDc2LjQ4Mi02MS45ODUgMTM4LjUtMTM4LjQ2OCAxMzguNS03Ni40ODUgMC0xMzguNS02Mi4wMTgtMTM4LjUtMTM4LjUgMC03Ni40ODUgNjIuMDE1LTEzOC40NyAxMzguNS0xMzguNDd6bS0uMDMzIDM4LjkzOGMtNTQuOTYgMC05OS41MyA0NC41NC05OS41MyA5OS41czQ0LjU3IDk5LjUgOTkuNTMgOTkuNSA5OS41LTQ0LjU0IDk5LjUtOTkuNS00NC41NC05OS41LTk5LjUtOTkuNXptLjAzMiAzOS42ODdjMzMuMDUyIDAgNTkuODQyIDI2Ljc5IDU5Ljg0MiA1OS44NDQgMCAzMy4wNTItMjYuNzkgNTkuODQzLTU5Ljg0MyA1OS44NDMtMzMuMDU1IDAtNTkuODQ1LTI2Ljc5LTU5Ljg0NS01OS44NDQgMC0zMy4wNTUgMjYuNzktNTkuODQ1IDU5Ljg0NC01OS44NDV6bTAgMzAuOTA2Yy0xNS45OTMgMC0yOC45NyAxMi45NDctMjguOTcgMjguOTQgMCAxNS45OSAxMi45NzcgMjguOTY4IDI4Ljk3IDI4Ljk2OCAxNS45OSAwIDI4LjkzNi0xMi45NzcgMjguOTM2LTI4Ljk3IDAtMTUuOTktMTIuOTQ1LTI4LjkzNy0yOC45MzctMjguOTM3ek0xMTQuOTA1IDM5NWwtMjcuODQ0IDkyLjg3NWg0Ni44NzZsMjAuMjgtNjIuMzEzYy0xNC4zNS04LjU0LTI3LjU2LTE4LjgzMy0zOS4zMTItMzAuNTYyem0yNzcuMTg4IDUuNjg4Yy0xMS45ODIgMTEuMDI2LTI1LjMyNCAyMC41OTUtMzkuNzIgMjguNDY4bDE5LjI1IDU4LjcyaDQ2LjkwN2wtMjYuNDM2LTg3LjE4OHptLTE2NS4wMyA1MC43OHYzNi40MDdoNTIuMDkydi0zNS41M2MtNy40NS44NC0xNS4wMTUgMS4yOC0yMi42ODcgMS4yOC05Ljk5IDAtMTkuODEtLjc0LTI5LjQwOC0yLjE1NnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PC9wYXRoPjwvZz48L3N2Zz4=\"); }\n\n.corridor-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTE4LjA4IDIzbC4xIDE4SDQ5NFYyM0gxOC4wOHpNMjU0LjMgNTQuOTNMMTMzIDYxLjZsMzAuMSA2OC41IDk4LjEtMy42LTYuOS03MS41N3ptMTE1LjkuMjhsLTkyLjkuNTMgMyA3MS45NiA5Ni44LS45LTYuOS03MS41OXpNMTguMjMgNTYuNDNsLjM1IDc0LjY3IDcyLjI3LTIuNCAyNC4zNS03Mi4yN0gxOC4yM3pNMzkzIDY0LjI0bC0uNSA0Ny4xNiAxNS43IDIxLjUgODUuOC02LjNWNjQuOTNsLTEwMS0uNjl6TTEyMC44IDg0LjY4bC0xNy42IDQ5LjgyIDQxLjEtMS04LjItMzQuMDItMTUuMy0xNC44em0zNTQuNyA1Ni4wMmwtNCA3NS41IDIyLjUtLjZ2LTc0LjloLTE4LjV6bS0yNS43IDMuNWwtOTcuMyAxMC43TDM0NiAyMTlsMTEwLjctMy4yLTYuOS03MS42em0tMjQzLjguN2wtNCA3NS41IDEyNi4xLTMuOSA3LTcxLjEtMTI5LjEtLjV6bS0xNDUuMzMgMi43bC0zLjkgNzUuNSAxMjYuMTMtMy45LTYuOS03MS42SDYwLjY3em0tNDIgMS41bC4zMyA3Mi40IDI0Ljc3LS44LTYuOS03MS42aC0xOC4yem0yNzguOTMgODQuM0wyNzYgMjc3LjJsMi4xIDQyIDEyOC43LTEuOS03LjYtNzkuNy0xMDEuNi00LjJ6bS00MC4yIDEuNGwtMTI3LjIgNiA4IDY5LjUgMTI0LjcgNi42LTUuNS04Mi4xem0yMzYuNiAzLjFsLTY2LjUgMi45LTcuNSA3NS44IDc0LTUuMnYtNzMuNXptLTQ3NC44OSA3bC4zMSA2NS44IDEwMC43OC0zLjEtNi45LTYyLjdIMTkuMTF6bTQ3MC4yOSA4MS4ybC0xMTUuOSAxMC41LTMuMyA2NSAxMjEuNS0zLjUtMi4zLTcyem0tNDIyLjM2IDQuMWwtNDcuNTIgMiAuMzQgNzIuOSA1MS4xLTEuMy0zLjkyLTczLjZ6bTE3Ljg0IDBsMy45OCA2OC41IDEzOC42NCA5LjYtMy03OC4xSDg0Ljg4em0xNjEuMjIgNC4zbC01LjUgNjkgMTA3LjUgNS40LTEtNzMuNS0xMDEtLjl6bTE4NS40IDgxLjFsLTQgNzUuNSA2Ni41LS42di03My44bC02Mi41LTEuMXptLTkuOCAxLjJsLTM5IDMuNiAyNy40IDI4IDExLjYtMzEuNnptLTM5OS40NiAxLjhsLTIuMTMgNDAuNi4xNiAzNC44SDE0NS40di02OC45bC00Ni41Ni0yLjUtMTguNCAxNEw2OC41NiA0MjFsLTQ2LjMyLTIuNHptMjQ3Ljk2LjNsLTExMS4zIDEuNSAzLjUgNzIuNSAxMTQuNy0yLjQtNi45LTcxLjZ6bTEwMS4yIDQuM2wtNzIuMiA1LjktOC45IDYyLjEgMTI1LjYuNi02LjItMjctMzguMy00MS42eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==\"); }\n\n.corpse-card {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iaGVpZ2h0OiA1MTJweDsgd2lkdGg6IDUxMnB4OyI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjEiPjwvcGF0aD48ZyBjbGFzcz0iIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDApIiBzdHlsZT0idG91Y2gtYWN0aW9uOiBub25lOyI+PHBhdGggZD0iTTQwMy40MjUgMTkuMjk5TDI4MS4yMzIgOTkuMzU0bDQ1LjE2NiA4MC42ODUtNzAuNTMxIDc0Ljc2NC05Ni4wMjIgMzIuOTQ3LTIwLjI0OCAxMDEuNDI2LTM4LjA5NSAzIDEuMDgzIDU4LjU2OCA4Ni4yMTMtNi4yNDggMjQuMzk3LTEwNi42MzcgNTUuMDcyLTEzLjM2IDIxLjM4NSA3NC44MDQgNTUuMTMgMzQuMjEzLTE5Ljg1MyAzMS41OTMgNTIuMDA0IDI3LjU5MiA1MC44NjUtNzUuNTcyLTgxLjEwMy01Mi4zMzItMTIuNTY3LTQ5LjEzNyA0Ni41MTgtNTQuODU1IDEzLjIwMSAzMS45NzYtNDAuNzYzIDQxLjgwMSAzMy43ODMgNDEuMDIyIDc4LjExMS02Ni4yMTMtMzEuNDE4LTg4LjY0NWMxNi40ODUtNS45NzYgMzAuNjkyLTE5LjgwOCAzOS41NzYtMzIuNyAxNC41OTctMjMuMDYgMTguOTM1LTQ5Ljg3OSAyLjk1Ny03MC4yOTItMTguOTYyLTE5LjgzLTM5Ljg4Ni0xOS43MDYtNjEuMDctNy4yNDQtMTMuMjIgNy45MTgtMjQuNjA2IDE5LjU2NS0zMi4yMjMgMzIuMDhsLTE1LjkxLTI1LjYzOSA2Ni44OTktNDUuNDA4em0tMTc4LjEyIDE2LjU4NGMtLjM3LS4wMS0uNzM1LS4wMS0xLjA5OC4wMDQtMjguMTEgMS4wMDItNDAuMzA4IDcxLjQzNi03My4xNCA4My42NzctMzAuMzE0IDExLjMwNC02OS42MS0yMy45NDEtOTYuODQ1LTYuNDc2LTIwLjM3NSAxMy4wNjUtMzQuNTkgNDUuMzAzLTI1LjgyNiA2Ny44NjUgMTMuNDc4IDM0LjcgNjMuNDQxIDU4LjM4IDk5Ljc1OCA1MC4yMDMgMjguNDM5LTYuNDAzIDI4LjE3Ny01NC45NjkgNTMuNzI4LTY5LjAwMiAyMC4wNS0xMS4wMTEgNTkuMDAyIDE0LjM2NCA2OC4zMTMtNi41MjkgNS4zMzYtMTEuOTczLTE4Ljc5Ni0xOS4zMzUtMjMuMzktMzEuNjExLTE0LjI0LTM4LjA0NSA0My4zNTctODYuNDY4LTEuNS04OC4xMzF6bS02NC4yNyA3LjM3M2MtMTcuOTUxLS4yMjMtNTAuNTgxIDQyLjgzNy0yOS42OTggNTEuMDQgMTcuMTQ5LjAzNyA1NS42NzMtNTAuNzE4IDI5LjY5OC01MS4wNHptMjM2LjM2OSAxLjUwOGwxMi4zODcgMjEuMzEyLTY3LjMwNyA0NS42ODYgNDQuMTIzIDcxLjFjNS45NzMtMjMuMzIgMTkuMTE4LTQ1LjM2NSAzNy42NjYtNTYuOTEgMTQuOTU5LTguMTY5IDI3Ljk3NC04Ljc2MiAzNy44MjYgMy4xMjIgMTcuMTE0IDIzLjcyLTYuMTUxIDU2LjQ2LTIzLjU5OCA2OS4wOTItMTEuNDY2IDcuOTIyLTE3LjUyMiA2LjE1NS0zMC4zNDEgNC43OTlsMzUuNyAxMDAuNzI4LTU0LjcwNiA0Ni4zNzMtMTEuOTE2LTE0LjQ3IDM3Ljc3LTM4LjczLTI4Ljk5NS03MC4yMjMtNzEuNjI3IDg0LjQ2OCAxNi42MiA2NC45ODMgNzEuNjEzIDQ2LjIwOS0zMS41NjcgNDYuOS0yMC41NzYtMTAuOTE2IDE5LjE4LTMwLjUyMS02NC42MDgtNDAuMDkyLTI0LjIyNC04NC43NDQtODIuNjk0IDIwLjA2Mi0yMy45MSAxMDQuNTEyLTUzLjk5IDMuOTE0LS40MTgtMjIuNjI5IDM0Ljc3Mi0yLjczNiAyMC44ODYtMTA0LjYzNSA5MC40NC0zMS4wMzEgODIuNjUyLTg3LjYwOGMtMTQuNDc2LTI1Ljg1NS0yOC45NS01MS43MTItNDMuNDI0LTc3LjU2OHpNMjUxLjc1NSAxODIuMTU4Yy41MDUgMTYuMDQgMjkuNDEzIDEzLjcxOCAyNy4wNDEgMS4yNC0yLjAxNy0xMC42MTQtMjcuMzE3LTEwLjAxNy0yNy4wNC0xLjI0em0tNDkuNzE0LTQuMTljLTEwLjI2My4xMTEtMTkuMjI5IDMuNjg0LTE4Ljg0NiAxMS45NDggMS4zMSAyOC4zMDUgNDguNjk0IDI0LjU5NyA0Ny43NDYgMi4xOTEtLjM2OC04LjY5OC0xNS43MDYtMTQuMjgtMjguOS0xNC4xMzh6bTI4LjE5MyA0OS4wNDhjOS42OTIgMTEuNTQxIDI4LjUyNi01LjMyNCAyMC44OS0xNC40ODktOS4zNC00LjkxOS0yNC45MzcgOC44MzctMjAuODkgMTQuNDg5eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==\"); }\n\n.event-list {\n  margin-top: 50px;\n  margin-bottom: 23px;\n  display: block;\n  height: 0px;\n  border: 2px solid #333;\n  border-radius: 5px;\n  list-style: none;\n  position: relative; }\n  .event-list::after {\n    content: '';\n    display: block;\n    position: absolute;\n    top: -25px;\n    left: 56px;\n    z-index: -1;\n    width: 4px;\n    height: 50px;\n    background: #333; }\n  .event-list li {\n    width: 46px;\n    height: 46px;\n    display: block;\n    position: absolute;\n    top: -23px;\n    transition: transform 750ms ease-in-out; }\n    .event-list li .inner {\n      width: 40px;\n      height: 40px;\n      box-sizing: border-box;\n      text-align: center;\n      border: 3px solid rgba(255, 255, 255, 0);\n      border-radius: 8px; }\n    .event-list li .contents {\n      width: 34px;\n      height: 34px;\n      border-radius: 5px; }\n\n.downbounce {\n  animation-name: bounce;\n  animation-duration: 750ms;\n  animation-timing-function: ease-in-out; }\n\n.upbounce {\n  animation-name: bounce2;\n  animation-duration: 750ms;\n  animation-timing-function: ease-in-out; }\n\n.spin1 {\n  animation-name: spin;\n  animation-duration: 500ms;\n  animation-timing-function: ease-in-out; }\n\n.grow1 {\n  animation-name: grow;\n  animation-duration: 500ms;\n  animation-timing-function: ease-in-out; }\n\n@keyframes spin {\n  0% {\n    transform: rotateZ(-90deg);\n    opacity: 0; }\n  100% {\n    transform: rotateZ(0deg);\n    opacity: 1; } }\n\n@keyframes bounce {\n  0% {\n    transform: translateY(0px); }\n  50% {\n    transform: translateY(48px); }\n  100% {\n    transform: translateY(0px); } }\n\n@keyframes bounce2 {\n  0% {\n    transform: translateY(0px); }\n  50% {\n    transform: translateY(-48px); }\n  100% {\n    transform: translateY(0px); } }\n\n@keyframes grow {\n  0% {\n    width: 34px;\n    height: 34px;\n    transform: translateX(0px) translateY(0px); }\n  100% {\n    width: 258px;\n    height: 256px;\n    transform: translateX(-42px) translateY(-340px); } }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bar = exports.Bar = function (_Hookable) {
  _inherits(Bar, _Hookable);

  function Bar(options) {
    _classCallCheck(this, Bar);

    var parent = options.parent,
        name = options.name;
    return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, {
      parent: parent,
      template: "<div class='bar-outer " + name + "' data-hook='container'>\n            <div class='progress-shadow' data-hook='shadow'></div>\n            <div class='progress' data-hook='progress'></div>\n            <div class='readout' data-hook='readout'></div>\n           </div>"
    }));
  }

  _createClass(Bar, [{
    key: "setText",
    value: function setText(text) {
      this.readout.innerText = text;
    }
  }, {
    key: "setPercentage",
    value: function setPercentage(percentage) {
      var _this2 = this;

      this.progress.style.width = percentage + "%";
      setTimeout(function () {
        return _this2.shadow.style.width = percentage + "%";
      }, 1500);
    }
  }]);

  return Bar;
}(_helpers.Hookable);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardLoop = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

var _cards = __webpack_require__(1);

var _cards2 = _interopRequireDefault(_cards);

var _creature = __webpack_require__(5);

var _creature2 = _interopRequireDefault(_creature);

var _creature3 = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Better to call it a card "loop", with a movable pointer to the current card.
// This changes what operations we need to support.

var CardLoop = exports.CardLoop = function (_Hookable) {
  _inherits(CardLoop, _Hookable);

  function CardLoop(options) {
    _classCallCheck(this, CardLoop);

    var parent = options.parent;

    var _this = _possibleConstructorReturn(this, (CardLoop.__proto__ || Object.getPrototypeOf(CardLoop)).call(this, {
      parent: parent,
      template: '<ul data-hook=\'container\' class=\'event-list\'></ul>'
    }));

    _this._cards = [];

    _this.pointer = 0; // current position in the stack
    _this.direction = 1; // which way we're moving
    _this.stride = 1; // how many steps we take per move
    return _this;
  }

  _createClass(CardLoop, [{
    key: 'next',
    value: function next() {
      this.pointer += this.direction * this.stride;
      this.pointer = (this._cards.length + this.pointer) % this._cards.length;
      this.reposition();
    }
  }, {
    key: 'previous',
    value: function previous() {
      this.pointer -= this.direction * this.stride;
      this.pointer = (this._cards.length + this.pointer) % this._cards.length;
      this.reposition();
    }
  }, {
    key: 'reverse',
    value: function reverse() {
      this.direction = -this.direction;
    }
  }, {
    key: 'push',
    value: function push(c) {
      this._cards.unshift(c);

      var t = c.buildTile();
      t.setPosition(this._cards.length);
      t.setParent(this.container);
      t.inner.classList.add('spin1');

      this.reposition();
    }
  }, {
    key: 'peek',
    value: function peek(idx) {
      // Gets card at index (relative to the current pointer)
      idx = idx || 0;
      return this._cards[this.pointer + idx];
    }
  }, {
    key: 'pop',
    value: function pop(idx) {
      // Removes card at index (relative to current pointer)
      idx = idx || 0;
      var m = this._cards.splice(this.pointer + idx, 1)[0];
      this.reposition();
      m.destroy();
      return m;
    }
  }, {
    key: 'unshift',
    value: function unshift(c) {
      // Adds a card under the current index
      this._cards.splice(this.pointer, 0, c);

      var t = c.buildTile();
      t.setPosition(0);
      t.setParent(this.container);
      t.inner.classList.add('spin1');

      this.reposition();
    }
  }, {
    key: 'reposition',
    value: function reposition() {
      var _this2 = this;

      // call this to resync 
      this._cards.map(function (e, idx) {
        return e.reposition(idx, _this2.pointer, _this2._cards.length);
      });
    }
  }]);

  return CardLoop;
}(_helpers.Hookable);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Choice = function (_Hookable) {
  _inherits(Choice, _Hookable);

  function Choice(options) {
    _classCallCheck(this, Choice);

    var parent = options.parent,
        handleClick = options.handleClick,
        label = options.label,
        effect = options.effect;

    var _this = _possibleConstructorReturn(this, (Choice.__proto__ || Object.getPrototypeOf(Choice)).call(this, {
      parent: parent,
      template: '<button class=\'choice-button\' data-hook=\'container\'>\n                   <div class=\'label\'>' + label + '</div>\n                   <div class=\'effect\'>' + effect + '</div>\n                 </button>'
    }));

    _this.container.addEventListener('click', function () {
      return handleClick();
    });
    return _this;
  }

  return Choice;
}(_helpers.Hookable);

exports.default = Choice;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// A tile is a small UI element corresponding to a single card.

var _class = function (_Hookable) {
  _inherits(_class, _Hookable);

  function _class(options) {
    _classCallCheck(this, _class);

    var position = options.position,
        type = options.type,
        card = options.card;

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, {
      parent: (0, _helpers.qs)('body'),
      template: '<li data-hook=\'outer\'>\n                      <div data-hook=\'inner\' class=\'inner\'> \n                        <div data-hook=\'contents\' class=\'contents ' + card.type + '-card\'>\n                        </div>\n                      </div>\n                     </li>'
    }));

    (0, _helpers.qs)('body').removeChild(_this.outer);
    _this.card = card;
    _this.position = position;
    return _this;
  }

  _createClass(_class, [{
    key: 'reposition',
    value: function reposition(rank, pointer, size) {
      var realIndex = rank - pointer;
      if (realIndex < 0) {
        realIndex += size;
      }
      this.outer.style.transform = "translateX(" + realIndex * 52 + "px)";
      if (this.position !== null && Math.abs(this.position - rank) > 1) {
        this.inner.className = 'inner';
        var anim = this.position < rank ? 'upbounce' : 'downbounce';
        this.inner.classList.add(anim);
      }
      this.position = rank;
    }
  }, {
    key: 'setParent',
    value: function setParent(p) {
      this.parent = p;
      this.parent.appendChild(this.outer);
    }
  }, {
    key: 'setPosition',
    value: function setPosition(p) {
      this.position = p;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.parent.removeChild(this.outer);
    }
  }]);

  return _class;
}(_helpers.Hookable);

exports.default = _class;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(1);

var _2 = _interopRequireDefault(_);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _corridor = __webpack_require__(6);

var _corridor2 = _interopRequireDefault(_corridor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CorpseCard = function (_Card) {
  _inherits(CorpseCard, _Card);

  function CorpseCard(options) {
    _classCallCheck(this, CorpseCard);

    var _this = _possibleConstructorReturn(this, (CorpseCard.__proto__ || Object.getPrototypeOf(CorpseCard)).call(this, options));

    _this.type = "corpse";
    return _this;
  }

  _createClass(CorpseCard, [{
    key: 'enter',
    value: function enter(loop) {
      var options = [];

      options.push({
        label: "Loot corpse",
        effect: "Chance of treasure",
        callback: function callback() {
          loop.pop();
          loop.unshift(new _corridor2.default());
          _player2.default.changeResource('gold', 5);
        }
      });

      options.push({
        label: "Respect the dead",
        effect: "---",
        callback: function callback() {
          loop.pop();
          loop.unshift(new _corridor2.default());
        }
      });

      return {
        flavour: "A fallen foe",
        options: options
      };
    }
  }]);

  return CorpseCard;
}(_2.default);

exports.default = CorpseCard;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _ = __webpack_require__(1);

var _2 = _interopRequireDefault(_);

var _target = __webpack_require__(20);

var _target2 = _interopRequireDefault(_target);

var _optionsHelper = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemSelect = function (_Card) {
  _inherits(ItemSelect, _Card);

  function ItemSelect() {
    _classCallCheck(this, ItemSelect);

    var _this = _possibleConstructorReturn(this, (ItemSelect.__proto__ || Object.getPrototypeOf(ItemSelect)).call(this));

    _this.type = "itemselect";
    return _this;
  }

  _createClass(ItemSelect, [{
    key: 'enter',
    value: function enter(loop) {
      var options = [];

      Object.keys(_player2.default.items).map(function (k) {
        if (_player2.default.items[k].count > 0) {
          if (_player2.default.items[k].range > 0) {
            // case where it's targetable
            options.push({
              label: k + (' (' + _player2.default.items[k].count + ')'),
              effect: _player2.default.items[k].effect,
              callback: function callback() {
                loop.pop();
                loop.unshift(new _target2.default({
                  item: k,
                  range: _player2.default.items[k].range,
                  effect: function effect(args) {
                    _player2.default.items[k].count--;_player2.default.items[k].callback(args);
                  }
                }));
              }
            });
          } else {
            // not a targetable item
            options.push({
              label: k + (' (' + _player2.default.items[k].count + ')'),
              effect: _player2.default.items[k].effect,
              callback: function callback() {
                loop.pop();
                _player2.default.items[k].count--;
                _player2.default.items[k].callback(_player2.default);
              }
            });
          }
        }
      });

      options.push((0, _optionsHelper.cancelOption)(loop));

      return {
        flavour: "Choose an item",
        options: options
      };
    }
  }]);

  return ItemSelect;
}(_2.default);

exports.default = ItemSelect;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(1);

var _2 = _interopRequireDefault(_);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Pick a target for an effect (or ranged weapon, or spell, at some point)
var TargetCard = function (_Card) {
  _inherits(TargetCard, _Card);

  function TargetCard(options) {
    _classCallCheck(this, TargetCard);

    var _this = _possibleConstructorReturn(this, (TargetCard.__proto__ || Object.getPrototypeOf(TargetCard)).call(this, options));

    _this.type = "target";

    _this.range = options.range;
    _this.effect = options.effect;
    _this.item = options.item;
    return _this;
  }

  _createClass(TargetCard, [{
    key: 'enter',
    value: function enter(loop) {
      var _this2 = this;

      var options = [];

      options.push({
        label: "You",
        effect: "",
        callback: function callback() {
          loop.pop();
          _this2.effect(_player2.default);
        }
      });

      var _loop = function _loop(i) {
        var c = loop.peek(i);
        if (c.type === "creature") {
          options.push({
            label: c.creature.name,
            effect: "",
            callback: function callback() {
              loop.pop();
              _this2.effect(c.creature);
            }
          });
        }
      };

      for (var i = 1; i <= this.range; i++) {
        _loop(i);
      }

      return {
        flavour: 'Choose a target for ' + this.item,
        options: options
      };
    }
  }]);

  return TargetCard;
}(_2.default);

exports.default = TargetCard;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialogue = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

var _bus = __webpack_require__(3);

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialogue = exports.Dialogue = function (_Hookable) {
  _inherits(Dialogue, _Hookable);

  function Dialogue(options) {
    _classCallCheck(this, Dialogue);

    var parent = options.parent;

    var _this = _possibleConstructorReturn(this, (Dialogue.__proto__ || Object.getPrototypeOf(Dialogue)).call(this, {
      parent: parent,
      template: '<div class=\'big-card\' data-hook=\'container\'>\n                  <div class=\'card-image\'>\n                    <div class=\'card-image-inner\'></div>\n                  </div>\n                  <div class=\'content\' data-hook=\'contents\'>\n                  </div>\n                 </div>\n                '
    }));

    _bus2.default.sub('tile-seen', function () {
      _this.hydrate(_this.loop.peek());
    });
    return _this;
  }

  _createClass(Dialogue, [{
    key: 'setLoop',
    value: function setLoop(q) {
      this.loop = q;
    }
  }, {
    key: 'hydrate',
    value: function hydrate(card) {
      card.buildContents(this.loop, this.contents);
    }
  }]);

  return Dialogue;
}(_helpers.Hookable);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeLevel0 = undefined;

var _helpers = __webpack_require__(0);

var _creature = __webpack_require__(5);

var _creature2 = _interopRequireDefault(_creature);

var _corridor = __webpack_require__(6);

var _corridor2 = _interopRequireDefault(_corridor);

var _creature3 = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeLevel0 = exports.makeLevel0 = function makeLevel0() {
  var cards = [];
  for (var i = 0; i < 7; i++) {
    cards.push(new _creature2.default({ creature: (0, _creature3.getCreature)() }));
  }

  for (var _i = 0; _i < 24; _i++) {
    cards.push(new _corridor2.default());
  }

  cards = (0, _helpers.shuffle)(cards);

  return cards;
};

/***/ })
],[8]);