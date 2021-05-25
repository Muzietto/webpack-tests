# 01-plain-webpacking

## Usage

- npm install
- copy /public/index.html in /dist

## Available task

- `npm run build`: will create the build inside `/dist` folder.

- `npm run watch`: will watch user files and build automatically inside `/dist` folder at each file change.

- `npm start`: serves files from the `/dist` folder (http://localhost:3100).

## Experiments in webpack.config.js

- observe main.js - our code is at the end of the file

- shift mode to 'production' (smaller main.js file, but still no minification)

- set devtools: 'inline-source-maps'; observe main.js & check index.js in Chrome devtools
