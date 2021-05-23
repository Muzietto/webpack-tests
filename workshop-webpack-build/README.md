# 04-enter-babel

## Usage

- npm install

## Available tasks

- `npm run build-local`: will create the build inside `/dist` folder, featuring local runtime constants

- `npm run build-production`: will create the build inside `/dist` folder, featuring production runtime constants

- `npm start`: serves files from the `/dist` folder (http://localhost:3100).

# Observations

- new file .babelrc; it is also possible to put a field 'babel' in package.json
- rule for .js + resolve .js extension + @src alias added to webpack.config.js
- imported.js included in bundle
- recent ECMAScript operators transpiled into ES5 syntax
- Array.prototype.flatMap NOT transpiled -->  must polyfill it yourself

## Experiments in webpack.config.js

- put devtool: 'inline-source-map' in webpack.config.js to have sourcemaps
