"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectGeometry = detectGeometry;
exports.classifyGeometry = classifyGeometry;
exports.default = _default;

var _geometries = _interopRequireDefault(require("./geometries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function detectGeometry(sides) {
  return new Promise((resolve, reject) => {
    if (!sides || !sides.length || sides.length < 3) {
      reject("not enough sides for a valid geometry!");
    }

    if (sides.some(isNaN)) {
      reject("invalid integer/float provided");
    }

    for (var geometryLabel in _geometries.default) {
      if (_geometries.default.hasOwnProperty(geometryLabel)) {
        if (_geometries.default[geometryLabel].numSides === sides.length) {
          resolve({
            geometryLabel,
            sides
          });
        }
      }
    }

    reject(`classifier does not exist for a geometry with ${sides.length} sides`);
  });
}

function classifyGeometry({
  geometryLabel,
  sides
}) {
  const geom = _geometries.default[geometryLabel];
  return new Promise((resolve, reject) => {
    if (!geom.isValid(...sides)) {
      reject(`not a valid ${geometryLabel}`);
    }

    geom.types.map(type => {
      if (type.validate(...sides)) {
        resolve({
          geometryLabel,
          type: type.type,
          sides
        });
      }
    }); // if it doesn't validate against a type, but is still valid

    reject(`not a known ${geometryLabel} type`);
  });
}

function _default(sides) {
  return new Promise((resolve, reject) => {
    return detectGeometry(sides).catch(err => reject(err)).then((...args) => classifyGeometry(...args));
  });
}