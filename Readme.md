## Installation

### CLI

`npm i -g flexion-geometry-classifier`

or

`yarn add global flexion-geometry-classifier`

### Library

`npm i -S flexion-geometry-classifier`

## Usage

### CLI

`geometry-cli 2.3 2.3 2.3`
`this triangle is an equilateral`

### Library

The library returns a promise.

```js
import classifier from "flexion-geometry-classifier";
classifier(sides)
  .then(success =>
    console.log(
      `you have returned a ${success.geometryLabel} of type ${success.type}`
    )
  )
  .catch(message => console.error(message));
```

## Development

`npm run build` builds the library output.

`npm run build-web` runs webpack

`npm run dev` runs webpack with `--watch`

`npm run flow` runs flow

`npm run eslint` runs eslint
