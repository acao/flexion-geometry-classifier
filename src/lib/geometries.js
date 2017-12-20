// @flow

// just for an easier shorthand
type N = number;

export const triangle = {
  numSides: 3,
  isValid: (a: N, b: N, c: N): boolean => a + b > c && a + c > b && b + c > a,
  types: [
    {
      type: "equilateral",
      validate: (a: N, b: N, c: N): boolean => a === b && a === c
    },
    {
      type: "isosceles",
      validate: (a: N, b: N, c: N): boolean =>
        (a === b && b !== c) || (c === b && b !== a)
    },
    {
      type: "scalene",
      validate: (a: N, b: N, c: N): boolean => a !== b && a !== c && b !== c
    }
  ]
};

// export const quadrilateral = {
//   numSides: 4,
//   ...
// };
