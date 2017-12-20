"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triangle = void 0;
// just for an easier shorthand
const triangle = {
  numSides: 3,
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
}; // export const quadrilateral = {
//   numSides: 4,
//   ...
// };

exports.triangle = triangle;