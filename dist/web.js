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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

var _ = __webpack_require__(1);

var _utils = __webpack_require__(3);

var resultsWrapper = document.getElementById("output-wrapper");

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
  var fieldWrapper = document.createElement("div");
  fieldWrapper.appendChild(newSide);
  document.getElementById("numerical-input").appendChild(fieldWrapper);
  newSide.focus();
}

function removeSide() {
  var input = document.getElementById("numerical-input");

  if (input.lastChild.nodeName == "#text") {
    input.removeChild(input.lastChild);
    input.removeChild(input.lastChild);
    return;
  }

  input.removeChild(input.lastChild);
  return;
}

function handleSuccess(_ref) {
  var geometryLabel = _ref.geometryLabel,
      type = _ref.type;
  (0, _utils.logger)("This ".concat(geometryLabel, " is an ").concat(type));
  resultsWrapper.innerText = "This ".concat(geometryLabel, " is ").concat(type);
  resultsWrapper.classList.remove("error");
  resultsWrapper.classList.add("success");
  console.timeEnd("completed in");
}

function handleError(message) {
  (0, _utils.logger)(message);
  resultsWrapper.innerText = message;
  resultsWrapper.classList.add("error");
  resultsWrapper.classList.remove("success");
  console.timeEnd("completed in");
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectGeometry = detectGeometry;
exports.classifyGeometry = classifyGeometry;
exports.default = _default;

var geometries = _interopRequireWildcard(__webpack_require__(2));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function detectGeometry(sides) {
  return new Promise(function (resolve, reject) {
    if (!sides || !sides.length || sides.length < 2) {
      reject("not enough sides for a valid geometry!");
    }

    if (sides.includes(NaN)) {
      reject("invalid integer/float provided");
    }

    for (var geometry in geometries) {
      if (geometries.hasOwnProperty(geometry)) {
        if (geometries[geometry].numSides === sides.length) {
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
  var geom = geometries[geometryLabel];
  return new Promise(function (resolve, reject) {
    if (!geom.isValid.apply(geom, _toConsumableArray(sides))) {
      reject("not a valid ".concat(geometryLabel));
    }

    geom.types.map(function (type) {
      if (type.validate.apply(type, _toConsumableArray(sides))) {
        resolve({
          geometryLabel: geometryLabel,
          type: type.type
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triangle = void 0;
// just for an easier shorthand
var triangle = {
  numSides: 3,
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
}; // export const quadrilateral = {
//   numSides: 4,
//   ...
// };

exports.triangle = triangle;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var logger = function logger(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "success";
  return type === "error" ? console.error(message) : console.log(message);
};

module.exports = {
  logger: logger
};

/***/ })
/******/ ]);