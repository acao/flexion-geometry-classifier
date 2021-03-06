import { detectGeometry, classifyGeometry } from "./";
import { logger } from "./lib/utils";
import geometries from "./geometries";

import typeof { ClassificationResult } from "./";

const messageContainer = document.getElementById("output-message");
const messageBody = document.getElementById("output-message--body");
const polygonContainer = document.getElementById("output-polygon");

const init = () => {
  addSide();
  addSide();
  addSide();
  document.querySelector("#numerical-input input:first-child").focus();
  // firstField.focus();
};

init();

export function classifyGeometryWeb(): Promise<ClassificationResult> {
  console.time("completed in");
  let sides = document.querySelectorAll("#numerical-input input");
  sides = [].map.call(sides, el => parseFloat(el.value && el.value.trim()));
  return detectGeometry(sides)
    .then(args => classifyGeometry(args))
    .then(args => handleSuccess(args))
    .catch(message => handleError(message));
}

export function addSide() {
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

export function removeSide() {
  let input = document.getElementById("numerical-input");
  input.removeChild(document.querySelector("#numerical-input div.field:last-child"));
  document.querySelector("#numerical-input div.field:last-child input").focus();
  classifyGeometryWeb();
}

type ToggleClass = "error" | "success";

export function handleSuccess({ geometryLabel, type, sides }: ClassificationResult) {
  const geom = geometries[geometryLabel];
  const message = `This ${geometryLabel} is ${type}`;
  logger(message);
  setMessage(message, ["is-danger", "is-success"]);
  if (geom.draw) {
    polygonContainer.innerHTML = geom.draw(sides);
  }
}

export function handleError(message: string) {
  logger(message);
  setMessage(message, ["is-success", "is-danger"]);
  polygonContainer.innerHTML = "<div></div>";
}

export function setMessage(message: string, toggle: Array<ToggleClass>) {
  messageBody.innerText = message;
  messageContainer.classList.remove(toggle[0]);
  messageContainer.classList.add(toggle[1]);
  console.timeEnd("completed in");
}
