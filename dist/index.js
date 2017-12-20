"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectGeometry = detectGeometry;
exports.classifyGeometry = classifyGeometry;
exports.default = _default;

var geometries = _interopRequireWildcard(require("./lib/geometries"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function detectGeometry(sides) {
  return new Promise((resolve, reject) => {
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
  const geom = geometries[geometryLabel];
  return new Promise((resolve, reject) => {
    if (!geom.isValid(...sides)) {
      reject(`not a valid ${geometryLabel}`);
    }

    geom.types.map(type => {
      if (type.validate(...sides)) {
        resolve({
          geometryLabel,
          type: type.type
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