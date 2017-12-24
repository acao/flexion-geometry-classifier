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

var _ = require("./");

var _utils = require("./lib/utils");

var _geometries = _interopRequireDefault(require("./geometries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageContainer = document.getElementById("output-message");
const messageBody = document.getElementById("output-message--body");
const polygonContainer = document.getElementById("output-polygon");

const init = () => {
  addSide();
  addSide();
  addSide();
  document.querySelector("#numerical-input input:first-child").focus(); // firstField.focus();
};

init();

function classifyGeometryWeb() {
  console.time("completed in");
  let sides = document.querySelectorAll("#numerical-input input");
  sides = [].map.call(sides, el => parseFloat(el.value && el.value.trim()));
  return (0, _.detectGeometry)(sides).then(args => (0, _.classifyGeometry)(args)).then(args => handleSuccess(args)).catch(message => handleError(message));
}

function addSide() {
  const newSide = document.createElement("input");
  newSide.type = "number";
  newSide.step = "0.01";
  newSide.min = "0";
  newSide.max = "10";
  newSide.value = "1.0";
  newSide.classList.add("input");
  newSide.onkeyup = classifyGeometryWeb;
  const fieldControl = document.createElement("div");
  fieldControl.classList.add("control");
  fieldControl.appendChild(newSide);
  const fieldWrapper = document.createElement("div");
  fieldWrapper.classList.add("field");
  fieldWrapper.appendChild(fieldControl);
  document.getElementById("numerical-input").appendChild(fieldWrapper);
  newSide.focus();
  classifyGeometryWeb();
}

function removeSide() {
  let input = document.getElementById("numerical-input");
  input.removeChild(document.querySelector("#numerical-input div.field:last-child"));
  document.querySelector("#numerical-input div.field:last-child input").focus();
  classifyGeometryWeb();
}

function handleSuccess({
  geometryLabel,
  type,
  sides
}) {
  const geom = _geometries.default[geometryLabel];
  const message = `This ${geometryLabel} is ${type}`;
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