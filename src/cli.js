#! /usr/bin node

import { logger } from "./lib/utils";

import { detectGeometry, classifyGeometry } from "./";

console.time("completed in");

let sides =
  process.argv.slice(2).length > 2 ? process.argv.slice(2).map(side => parseFloat(side)) : false;

const onSuccessExit = ({ geometryLabel, type }) => {
  logger(`this ${geometryLabel} is ${type}`, "success");
  console.timeEnd("completed in");
  process.exit(0);
};

const onErrorExit = message => {
  logger(message, "error");
  console.timeEnd("completed in");
  process.exit(1);
};

detectGeometry(sides)
  .then((...args) => classifyGeometry(...args))
  .then(onSuccessExit)
  .catch(onErrorExit);
