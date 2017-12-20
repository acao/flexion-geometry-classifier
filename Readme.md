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
classifier([2.2, 2.2, 2.2])
  .then(success =>
    console.log(
      `you have returned a ${success.geometryLabel} of type ${success.type}`
    )
  )
  .catch(message => console.error(message));
```

## WebApp

The webapp was an afterthought last night, more a proof of concept for the universal library and is not to be evaluated as a progressive web app by any means

## Development

`npm run build` builds the library output.

`npm run build-web` runs webpack

`npm run dev` runs webpack with `--watch`

`npm run flow` runs flow

`npm run eslint` runs eslint

`npm run test` will run a suite of e2e tests for the cli i wrote when it was originally just a CLI. yes, no unit tests or e2e web tests. oh well!
