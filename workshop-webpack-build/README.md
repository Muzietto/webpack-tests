# 02-asset-management

## Usage

- npm install

## Available task

- `npm run build`: will create the build inside `/dist` folder.

- `npm run watch`: will watch user files and build automatically inside `/dist` folder at each file change.

- `npm start`: serves files from the `/dist` folder (http://localhost:3100).

# Observations

- tag <style> in head
- png copying/renaming in /dist
- all assets required by index.js are placed in its source directory
- index.html must be present in dist before build - UNACCEPTABLE!

## Experiments in webpack.config.js

- shift mode to 'production' (smaller file, but still no minification)

- set devtools: 'inline-source-map'; observe main.js & check index.js in Chrome devtools

- switch to url-loader in webpack.config.js & observe files in devtools

- [optional] add loading fonts (https://webpack.js.org/guides/asset-management/#loading-fonts)

- [optional] add loading XML/CSV/JSON data (https://webpack.js.org/guides/asset-management/#loading-data)
