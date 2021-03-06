// @flow
import geometries from "./geometries";

type Sides = Array<number>;

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
  sides: Sides
};

type ClassificationResult = {
  geometryLabel: string,
  type: string,
  sides: Sides
};

export function detectGeometry(sides: Sides): Promise<DetectionResult> {
  return new Promise((resolve, reject) => {
    if (!sides || !sides.length || sides.length < 3) {
      reject("not enough sides for a valid geometry!");
    }

    if (sides.some(isNaN)) {
      reject("invalid integer/float provided");
    }

    for (var geometryLabel in geometries) {
      if (geometries.hasOwnProperty(geometryLabel)) {
        if (geometries[geometryLabel].numSides === sides.length) {
          resolve({ geometryLabel, sides });
        }
      }
    }
    reject(`classifier does not exist for a geometry with ${sides.length} sides`);
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
        resolve({ geometryLabel, type: type.type, sides });
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
