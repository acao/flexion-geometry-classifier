// @flow
import * as geometries from "./lib/geometries";

type Geometry = {
  isValid: Function,
  numSides: number,
  types: Array<GeomType>
};

type GeomType = {
  type: string,
  validate: Function
};

type DetectionResult = {
  geometryLabel: string,
  sides: Array<number>
};

type ClassificationResult = {
  geometryLabel: string,
  type: string
};

export function detectGeometry(sides: Array<number>): Promise<DetectionResult> {
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
          resolve({ geometryLabel: geometry, sides });
        }
      }
    }
    reject(
      `classifier does not exist for a geometry with ${sides.length} sides`
    );
  });
}

export function classifyGeometry({
  geometryLabel,
  sides
}: DetectionResult): Promise<ClassificationResult> {
  const geom: Geometry = geometries[geometryLabel];
  return new Promise((resolve, reject) => {
    if (!geom.isValid(...sides)) {
      reject(`not a valid ${geometryLabel}`);
    }

    geom.types.map((type: GeomType) => {
      if (type.validate(...sides)) {
        resolve({ geometryLabel, type: type.type });
      }
    });
    // if it doesn't validate against a type, but is still valid
    reject(`not a known ${geometryLabel} type`);
  });
}

export default function(sides: Array<number>): Promise<ClassificationResult> {
  return new Promise((resolve, reject: Function) => {
    return detectGeometry(sides)
      .catch(err => reject(err))
      .then((...args) => classifyGeometry(...args));
  });
}
