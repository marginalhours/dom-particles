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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _helpers = __webpack_require__(0);

var _bar = __webpack_require__(7);

var _eventList = __webpack_require__(8);

var h = new _bar.Bar({ parent: (0, _helpers.qs)('body'), name: "health" });
var k = new _bar.Bar({ parent: (0, _helpers.qs)('body'), name: "mana" });
var e = new _bar.Bar({ parent: (0, _helpers.qs)('body'), name: "experience" });

var s = new _eventList.EventList({ parent: (0, _helpers.qs)('body') });

s.add();
s.add();
s.add();
s.add();

h.setText("15/30 HP");
k.setText("10/30 MP");
e.setText("100 EXP");

h.setPercentage(80);
k.setPercentage(90);
e.setPercentage(50);

setInterval(function () {
  h.setPercentage(100 * Math.random());
  k.setPercentage(100 * Math.random());
  e.setPercentage(100 * Math.random());
}, 5000);

(0, _helpers.qs)(".add").addEventListener("click", function () {
  return s.add();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(true);
// imports


// module
exports.push([module.i, ".bar-outer {\n  height: 18px;\n  width: 100%;\n  position: relative;\n  margin-bottom: 2px; }\n  .bar-outer .progress-shadow {\n    background: #eee;\n    height: 100%;\n    position: absolute;\n    z-index: -1;\n    transition: width 500ms ease-in-out;\n    width: 100%; }\n  .bar-outer .progress {\n    height: 100%;\n    position: absolute;\n    transition: width 500ms ease-in-out;\n    z-index: -1; }\n  .bar-outer .readout {\n    font-weight: bold;\n    color: #fff;\n    font-size: 12px;\n    line-height: 1.5;\n    padding-left: 5px;\n    font-family: sans-serif;\n    z-index: 1; }\n  .bar-outer.health .readout {\n    text-shadow: 1px 1px #a00; }\n  .bar-outer.health .progress {\n    background: #d00; }\n  .bar-outer.mana .readout {\n    text-shadow: 1px 1px #00a; }\n  .bar-outer.mana .progress {\n    background: #00d; }\n  .bar-outer.experience .readout {\n    text-shadow: 1px 1px #aaa; }\n  .bar-outer.experience .progress {\n    background: #ddd; }\n\n.big-card {\n  display: grid;\n  margin-top: 10px;\n  grid-template-columns: 256px 1fr;\n  width: 100%;\n  height: 256px; }\n  .big-card .card-image {\n    border: 1px solid #333; }\n  .big-card .card-image-inner {\n    transition: background-image 0.5s ease-in-out;\n    width: 100%;\n    height: 100%; }\n  .big-card .choices {\n    border: 1px solid #333; }\n  .big-card .flavour {\n    background: #eee;\n    width: 100%;\n    height: 80px;\n    font-style: italic;\n    box-sizing: border-box;\n    padding: 10px 10px;\n    text-align: center; }\n\n.event-list {\n  display: block;\n  margin-top: 100px;\n  height: 0px;\n  border: 2px solid #333;\n  border-radius: 5px;\n  list-style: none;\n  position: relative; }\n  .event-list li {\n    width: 34px;\n    display: block;\n    position: absolute;\n    top: -17px;\n    transition: transform 750ms ease-in-out; }\n    .event-list li inner {\n      border: 1px solid #aaa; }\n    .event-list li div {\n      width: 34px;\n      height: 34px;\n      box-sizing: border-box;\n      text-align: center;\n      background-color: #fff; }\n\n.downbounce {\n  animation-name: bounce;\n  animation-duration: 750ms;\n  animation-timing-function: ease-in-out; }\n\n.upbounce {\n  animation-name: bounce2;\n  animation-duration: 750ms;\n  animation-timing-function: ease-in-out; }\n\n.spin1 {\n  animation-name: spin;\n  animation-duration: 500ms;\n  animation-timing-function: ease-in-out; }\n\n.grow1 {\n  animation-name: grow;\n  animation-duration: 500ms;\n  animation-timing-function: ease-in-out; }\n\n@keyframes spin {\n  0% {\n    transform: rotateZ(-90deg);\n    opacity: 0; }\n  100% {\n    transform: rotateZ(0deg);\n    opacity: 1; } }\n\n@keyframes bounce {\n  0% {\n    transform: translateY(0px); }\n  50% {\n    transform: translateY(48px); }\n  100% {\n    transform: translateY(0px); } }\n\n@keyframes bounce2 {\n  0% {\n    transform: translateY(0px); }\n  50% {\n    transform: translateY(-48px); }\n  100% {\n    transform: translateY(0px); } }\n\n@keyframes grow {\n  0% {\n    width: 34px;\n    height: 34px;\n    transform: translateX(0px) translateY(0px); }\n  100% {\n    width: 258px;\n    height: 256px;\n    transform: translateX(-42px) translateY(-340px); } }\n", "", {"version":3,"sources":["/app/src/scss/style.scss"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,mBAAmB,EAAE;EACrB;IACE,iBAAiB;IACjB,aAAa;IACb,mBAAmB;IACnB,YAAY;IACZ,oCAAoC;IACpC,YAAY,EAAE;EAChB;IACE,aAAa;IACb,mBAAmB;IACnB,oCAAoC;IACpC,YAAY,EAAE;EAChB;IACE,kBAAkB;IAClB,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;IACjB,kBAAkB;IAClB,wBAAwB;IACxB,WAAW,EAAE;EACf;IACE,0BAA0B,EAAE;EAC9B;IACE,iBAAiB,EAAE;EACrB;IACE,0BAA0B,EAAE;EAC9B;IACE,iBAAiB,EAAE;EACrB;IACE,0BAA0B,EAAE;EAC9B;IACE,iBAAiB,EAAE;;AAEvB;EACE,cAAc;EACd,iBAAiB;EACjB,iCAAiC;EACjC,YAAY;EACZ,cAAc,EAAE;EAChB;IACE,uBAAuB,EAAE;EAC3B;IACE,8CAA8C;IAC9C,YAAY;IACZ,aAAa,EAAE;EACjB;IACE,uBAAuB,EAAE;EAC3B;IACE,iBAAiB;IACjB,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB,EAAE;;AAEzB;EACE,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,uBAAuB;EACvB,mBAAmB;EACnB,iBAAiB;EACjB,mBAAmB,EAAE;EACrB;IACE,YAAY;IACZ,eAAe;IACf,mBAAmB;IACnB,WAAW;IACX,wCAAwC,EAAE;IAC1C;MACE,uBAAuB,EAAE;IAC3B;MACE,YAAY;MACZ,aAAa;MACb,uBAAuB;MACvB,mBAAmB;MACnB,uBAAuB,EAAE;;AAE/B;EACE,uBAAuB;EACvB,0BAA0B;EAC1B,uCAAuC,EAAE;;AAE3C;EACE,wBAAwB;EACxB,0BAA0B;EAC1B,uCAAuC,EAAE;;AAE3C;EACE,qBAAqB;EACrB,0BAA0B;EAC1B,uCAAuC,EAAE;;AAE3C;EACE,qBAAqB;EACrB,0BAA0B;EAC1B,uCAAuC,EAAE;;AAE3C;EACE;IACE,2BAA2B;IAC3B,WAAW,EAAE;EACf;IACE,yBAAyB;IACzB,WAAW,EAAE,EAAE;;AAEnB;EACE;IACE,2BAA2B,EAAE;EAC/B;IACE,4BAA4B,EAAE;EAChC;IACE,2BAA2B,EAAE,EAAE;;AAEnC;EACE;IACE,2BAA2B,EAAE;EAC/B;IACE,6BAA6B,EAAE;EACjC;IACE,2BAA2B,EAAE,EAAE;;AAEnC;EACE;IACE,YAAY;IACZ,aAAa;IACb,2CAA2C,EAAE;EAC/C;IACE,aAAa;IACb,cAAc;IACd,gDAAgD,EAAE,EAAE","file":"style.scss","sourcesContent":[".bar-outer {\n  height: 18px;\n  width: 100%;\n  position: relative;\n  margin-bottom: 2px; }\n  .bar-outer .progress-shadow {\n    background: #eee;\n    height: 100%;\n    position: absolute;\n    z-index: -1;\n    transition: width 500ms ease-in-out;\n    width: 100%; }\n  .bar-outer .progress {\n    height: 100%;\n    position: absolute;\n    transition: width 500ms ease-in-out;\n    z-index: -1; }\n  .bar-outer .readout {\n    font-weight: bold;\n    color: #fff;\n    font-size: 12px;\n    line-height: 1.5;\n    padding-left: 5px;\n    font-family: sans-serif;\n    z-index: 1; }\n  .bar-outer.health .readout {\n    text-shadow: 1px 1px #a00; }\n  .bar-outer.health .progress {\n    background: #d00; }\n  .bar-outer.mana .readout {\n    text-shadow: 1px 1px #00a; }\n  .bar-outer.mana .progress {\n    background: #00d; }\n  .bar-outer.experience .readout {\n    text-shadow: 1px 1px #aaa; }\n  .bar-outer.experience .progress {\n    background: #ddd; }\n\n.big-card {\n  display: grid;\n  margin-top: 10px;\n  grid-template-columns: 256px 1fr;\n  width: 100%;\n  height: 256px; }\n  .big-card .card-image {\n    border: 1px solid #333; }\n  .big-card .card-image-inner {\n    transition: background-image 0.5s ease-in-out;\n    width: 100%;\n    height: 100%; }\n  .big-card .choices {\n    border: 1px solid #333; }\n  .big-card .flavour {\n    background: #eee;\n    width: 100%;\n    height: 80px;\n    font-style: italic;\n    box-sizing: border-box;\n    padding: 10px 10px;\n    text-align: center; }\n\n.event-list {\n  display: block;\n  margin-top: 100px;\n  height: 0px;\n  border: 2px solid #333;\n  border-radius: 5px;\n  list-style: none;\n  position: relative; }\n  .event-list li {\n    width: 34px;\n    display: block;\n    position: absolute;\n    top: -17px;\n    transition: transform 750ms ease-in-out; }\n    .event-list li inner {\n      border: 1px solid #aaa; }\n    .event-list li div {\n      width: 34px;\n      height: 34px;\n      box-sizing: border-box;\n      text-align: center;\n      background-color: #fff; }\n\n.downbounce {\n  animation-name: bounce;\n  animation-duration: 750ms;\n  animation-timing-function: ease-in-out; }\n\n.upbounce {\n  animation-name: bounce2;\n  animation-duration: 750ms;\n  animation-timing-function: ease-in-out; }\n\n.spin1 {\n  animation-name: spin;\n  animation-duration: 500ms;\n  animation-timing-function: ease-in-out; }\n\n.grow1 {\n  animation-name: grow;\n  animation-duration: 500ms;\n  animation-timing-function: ease-in-out; }\n\n@keyframes spin {\n  0% {\n    transform: rotateZ(-90deg);\n    opacity: 0; }\n  100% {\n    transform: rotateZ(0deg);\n    opacity: 1; } }\n\n@keyframes bounce {\n  0% {\n    transform: translateY(0px); }\n  50% {\n    transform: translateY(48px); }\n  100% {\n    transform: translateY(0px); } }\n\n@keyframes bounce2 {\n  0% {\n    transform: translateY(0px); }\n  50% {\n    transform: translateY(-48px); }\n  100% {\n    transform: translateY(0px); } }\n\n@keyframes grow {\n  0% {\n    width: 34px;\n    height: 34px;\n    transform: translateX(0px) translateY(0px); }\n  100% {\n    width: 258px;\n    height: 256px;\n    transform: translateX(-42px) translateY(-340px); } }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 4 */
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
/* 5 */
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

var	fixUrls = __webpack_require__(6);

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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = exports.EventList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventList = exports.EventList = function (_Hookable) {
  _inherits(EventList, _Hookable);

  function EventList(options) {
    _classCallCheck(this, EventList);

    var parent = options.parent;

    var _this = _possibleConstructorReturn(this, (EventList.__proto__ || Object.getPrototypeOf(EventList)).call(this, {
      parent: parent,
      template: '<ul data-hook=\'container\' class=\'event-list\'>\n                      <li><div></div></li>\n                    </ul>'
    }));

    _this._events = [];
    return _this;
  }

  _createClass(EventList, [{
    key: 'add',
    value: function add() {
      var e = new Event({ parent: this.container });
      e.inner.classList.add('spin1');
      this._events.push(e);
      this.reposition();
    }
  }, {
    key: 'reposition',
    value: function reposition() {
      // call this to resync 
      this._events.map(function (e, idx) {
        return e.reposition(idx);
      });
    }
  }]);

  return EventList;
}(_helpers.Hookable);

var event_types = ['crossroads', 'creature', 'treasure', 'hallway', 'trap'];

var Event = exports.Event = function (_Hookable2) {
  _inherits(Event, _Hookable2);

  function Event(options) {
    _classCallCheck(this, Event);

    var parent = options.parent;

    var _this2 = _possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).call(this, {
      parent: parent,
      template: '<li data-hook=\'outer\'>\n                      <div data-hook=\'inner\' class=\'inner\'> \n                        <div data-hook=\'contents\' class=\'contents\'>\n                        </div>\n                      </div>\n                     </li>'
    }));

    _this2.position = -1;
    return _this2;
  }

  _createClass(Event, [{
    key: 'reposition',
    value: function reposition(rank) {
      this.outer.style.transform = "translateX(" + rank * 48 + "px)";
      if (this.position !== null && Math.abs(this.position - rank) > 1) {
        this.inner.className = 'inner';

        var anim = this.position < rank ? 'upbounce' : 'downbounce';
        this.inner.classList.add(anim);
      }
      this.position = rank;
    }
  }]);

  return Event;
}(_helpers.Hookable);

/***/ })
],[1]);