import { validateGeometry, classifyGeometry } from "./";
import { logger } from "./lib/utils";

const resultsWrapper = document.getElementById("output-wrapper");

export function classifyGeometryWeb() {
  console.time("completed in");
  let sides = document.querySelectorAll("#numerical-input input");
  sides = [].map.call(sides, el => parseFloat(el.value && el.value.trim()));
  return validateGeometry(sides)
    .then(args => classifyGeometry(args))
    .then(args => handleSuccess(args))
    .catch(message => handleError(message));
}

export function addSide() {
  const newSide = document.createElement("input");
  newSide.type = "number";
  const fieldWrapper = document.createElement("div");
  fieldWrapper.appendChild(newSide);
  document.getElementById("numerical-input").appendChild(fieldWrapper);
  newSide.focus();
}

export function removeSide() {
  const input = document.getElementById("numerical-input");
  if (input.lastChild.nodeName == "#text") {
    input.removeChild(input.lastChild);
    input.removeChild(input.lastChild);
    return;
  }
  input.removeChild(input.lastChild);
  return;
}

export function handleSuccess({ geometryLabel, type }) {
  logger(`This ${geometryLabel} is an ${type}`);
  resultsWrapper.innerText = `This ${geometryLabel} is ${type}`;
  resultsWrapper.classList.remove("error");
  resultsWrapper.classList.add("success");
  console.timeEnd("completed in");
}
export function handleError(message) {
  logger(message);
  resultsWrapper.innerText = message;
  resultsWrapper.classList.add("error");
  resultsWrapper.classList.remove("success");
  console.timeEnd("completed in");
}
