var main =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.POLYGON_COLOR = void 0;

var _triangle = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POLYGON_COLOR = "#3273dc";
exports.POLYGON_COLOR = POLYGON_COLOR;
var _default = {
  triangle: _triangle.default
};
exports.default = _default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classifyGeometryWeb = classifyGeometryWeb;
exports.addSide = addSide;
exports.removeSide = removeSide;
exports.handleSuccess = handleSuccess;
exports.handleError = handleError;
exports.setMessage = setMessage;

var _ = __webpack_require__(2);

var _utils = __webpack_require__(4);

var _geometries = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageContainer = document.getElementById("output-message");
var messageBody = document.getElementById("output-message--body");
var polygonContainer = document.getElementById("output-polygon");

var init = function init() {
  addSide();
  addSide();
  addSide();
  document.querySelector("#numerical-input input:first-child").focus(); // firstField.focus();
};

init();

function classifyGeometryWeb() {
  console.time("completed in");
  var sides = document.querySelectorAll("#numerical-input input");
  sides = [].map.call(sides, function (el) {
    return parseFloat(el.value && el.value.trim());
  });
  return (0, _.detectGeometry)(sides).then(function (args) {
    return (0, _.classifyGeometry)(args);
  }).then(function (args) {
    return handleSuccess(args);
  }).catch(function (message) {
    return handleError(message);
  });
}

function addSide() {
  var newSide = document.createElement("input");
  newSide.type = "number";
  newSide.step = "0.01";
  newSide.min = "0";
  newSide.max = "10";
  newSide.value = "1.0";
  newSide.classList.add("input");
  newSide.onkeyup = classifyGeometryWeb;
  var fieldControl = document.createElement("div");
  fieldControl.classList.add("control");
  fieldControl.appendChild(newSide);
  var fieldWrapper = document.createElement("div");
  fieldWrapper.classList.add("field");
  fieldWrapper.appendChild(fieldControl);
  document.getElementById("numerical-input").appendChild(fieldWrapper);
  newSide.focus();
  classifyGeometryWeb();
}

function removeSide() {
  var input = document.getElementById("numerical-input");
  input.removeChild(document.querySelector("#numerical-input div:last-child"));
  document.querySelector("#numerical-input div:last-child input").focus();
  classifyGeometryWeb();
}

function handleSuccess(_ref) {
  var geometryLabel = _ref.geometryLabel,
      type = _ref.type,
      sides = _ref.sides;
  var geom = _geometries.default[geometryLabel];
  var message = "This ".concat(geometryLabel, " is ").concat(type);
  (0, _utils.logger)(message);
  setMessage(message, ["is-danger", "is-success"]);

  if (geom.draw) {
    polygonContainer.innerHTML = geom.draw(sides);
  }
}

function handleError(message) {
  (0, _utils.logger)(message);
  setMessage(message, ["is-success", "is-danger"]);
  polygonContainer.innerHTML = "<div></div>";
}

function setMessage(message, toggle) {
  messageBody.innerText = message;
  messageContainer.classList.remove(toggle[0]);
  messageContainer.classList.add(toggle[1]);
  console.timeEnd("completed in");
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectGeometry = detectGeometry;
exports.classifyGeometry = classifyGeometry;
exports.default = _default;

var _geometries = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function detectGeometry(sides) {
  return new Promise(function (resolve, reject) {
    if (!sides || !sides.length || sides.length < 2) {
      reject("not enough sides for a valid geometry!");
    }

    if (sides.includes(NaN)) {
      reject("invalid integer/float provided");
    }

    for (var geometry in _geometries.default) {
      if (_geometries.default.hasOwnProperty(geometry)) {
        if (_geometries.default[geometry].numSides === sides.length) {
          resolve({
            geometryLabel: geometry,
            sides: sides
          });
        }
      }
    }

    reject("classifier does not exist for a geometry with ".concat(sides.length, " sides"));
  });
}

function classifyGeometry(_ref) {
  var geometryLabel = _ref.geometryLabel,
      sides = _ref.sides;
  var geom = _geometries.default[geometryLabel];
  return new Promise(function (resolve, reject) {
    if (!geom.isValid.apply(geom, _toConsumableArray(sides))) {
      reject("not a valid ".concat(geometryLabel));
    }

    geom.types.map(function (type) {
      if (type.validate.apply(type, _toConsumableArray(sides))) {
        resolve({
          geometryLabel: geometryLabel,
          type: type.type,
          sides: sides
        });
      }
    }); // if it doesn't validate against a type, but is still valid

    reject("not a known ".concat(geometryLabel, " type"));
  });
}

function _default(sides) {
  return new Promise(function (resolve, reject) {
    return detectGeometry(sides).catch(function (err) {
      return reject(err);
    }).then(function () {
      return classifyGeometry.apply(void 0, arguments);
    });
  });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.drawTriangle = exports.getTrianglePeaks = void 0;

var _ = __webpack_require__(0);

var getTrianglePeaks = function getTrianglePeaks(scale, sides) {
  var peakX = (scale * sides[1] * Math.sin(Math.PI / 2 - Math.acos((Math.pow(sides[0], 2) + Math.pow(sides[1], 2) - Math.pow(sides[2], 2)) / (2 * sides[0] * sides[1])))).toFixed(1);
  var peakY = (scale * Math.sqrt(Math.pow(sides[1], 2) - Math.pow(peakX / scale, 2))).toFixed(1);
  return {
    peakX: peakX,
    peakY: peakY
  };
};

exports.getTrianglePeaks = getTrianglePeaks;

var drawTriangle = function drawTriangle(sides) {
  var scale = 50 / sides[0];

  var _getTrianglePeaks = getTrianglePeaks(scale, sides),
      peakX = _getTrianglePeaks.peakX,
      peakY = _getTrianglePeaks.peakY;

  return "<div>\n            <svg\n              height=\"".concat(peakY * 4, "\"\n              width=\"300\"\n            >\n              <polygon\n                points=\"0,0 200,0 ").concat(peakX * 4, ",").concat(peakY * 4, "\"\n                style=\"fill:").concat(_.POLYGON_COLOR, "; stroke:").concat(_.POLYGON_COLOR, "; stroke-width:1\"\n              />\n            </svg>\n            </div>\n          ").trim();
};

exports.drawTriangle = drawTriangle;
var _default = {
  numSides: 3,
  draw: drawTriangle,
  isValid: function isValid(a, b, c) {
    return a + b > c && a + c > b && b + c > a;
  },
  types: [{
    type: "equilateral",
    validate: function validate(a, b, c) {
      return a === b && a === c;
    }
  }, {
    type: "isosceles",
    validate: function validate(a, b, c) {
      return a === b && b !== c || c === b && b !== a;
    }
  }, {
    type: "scalene",
    validate: function validate(a, b, c) {
      return a !== b && a !== c && b !== c;
    }
  }]
};
exports.default = _default;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var logger = function logger(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "success";
  return console.log(message);
};

module.exports = {
  logger: logger
};

/***/ })
/******/ ]);