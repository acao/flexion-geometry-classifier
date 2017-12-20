#! /usr/bin node
"use strict";

var _utils = require("./lib/utils");

var _ = require("./");

console.time("completed in");
let sides = process.argv.slice(2).length > 2 ? process.argv.slice(2).map(side => parseFloat(side)) : false;

const onSuccessExit = ({
  geometryLabel,
  type
}) => {
  (0, _utils.logger)(`this ${geometryLabel} is ${type}`, "success");
  console.timeEnd("completed in");
  process.exit(0);
};

const onErrorExit = message => {
  (0, _utils.logger)(message, "error");
  console.timeEnd("completed in");
  process.exit(1);
};

(0, _.detectGeometry)(sides).then((...args) => (0, _.classifyGeometry)(...args)).then(onSuccessExit).catch(onErrorExit);