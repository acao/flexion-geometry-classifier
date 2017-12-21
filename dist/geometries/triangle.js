"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.drawTriangle = exports.getTrianglePeaks = void 0;

var _ = require("./");

const getTrianglePeaks = (scale, sides) => {
  const peakX = (scale * sides[1] * Math.sin(Math.PI / 2 - Math.acos((Math.pow(sides[0], 2) + Math.pow(sides[1], 2) - Math.pow(sides[2], 2)) / (2 * sides[0] * sides[1])))).toFixed(1);
  const peakY = (scale * Math.sqrt(Math.pow(sides[1], 2) - Math.pow(peakX / scale, 2))).toFixed(1);
  return {
    peakX,
    peakY
  };
};

exports.getTrianglePeaks = getTrianglePeaks;

const drawTriangle = function (sides) {
  var scale = 50 / sides[0];
  const {
    peakX,
    peakY
  } = getTrianglePeaks(scale, sides);
  return `<div>
            <svg
              height="${peakY * 4}"
              width="300"
            >
              <polygon
                points="0,0 200,0 ${peakX * 4},${peakY * 4}"
                style="fill:${_.POLYGON_COLOR}; stroke:${_.POLYGON_COLOR}; stroke-width:1"
              />
            </svg>
            </div>
          `.trim();
};

exports.drawTriangle = drawTriangle;
var _default = {
  numSides: 3,
  draw: drawTriangle,
  isValid: (a, b, c) => a + b > c && a + c > b && b + c > a,
  types: [{
    type: "equilateral",
    validate: (a, b, c) => a === b && a === c
  }, {
    type: "isosceles",
    validate: (a, b, c) => a === b && b !== c || c === b && b !== a
  }, {
    type: "scalene",
    validate: (a, b, c) => a !== b && a !== c && b !== c
  }]
};
exports.default = _default;